// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Ownable{
    address public owner;
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Permission denied");
        _;
    }
}

contract GrantContract is Ownable {
    struct Grant{
        uint amount;
        uint releasePeriod;
        bool isActive;
    }

    mapping (address => Grant) public grants;

    event GrantCreated(address beneficiary, uint amount, uint releasePeriod);
    event GrantReverted(address beneficiary, uint amount);
    event GrantWithdrawn(address beneficiary, uint amount);

    modifier onlyAfterReleasePeriod(address _beneficiary){
        require(block.timestamp >= grants[_beneficiary].releasePeriod, "Grant can only be withdrawn after the release period");
        require(grants[_beneficiary].isActive, "Grant withdrawn");
        require(grants[_beneficiary].amount > 0, "No grant funds");
        _;
    }

    function createGrant(address _beneficiary, uint _releasePeriod) external payable onlyOwner{
        require(msg.value > 0, "Grant amount must be greater than zero");
        require(!grants[_beneficiary].isActive, "Beneficiary already has a grant active");

        uint releasePeriod = block.timestamp + _releasePeriod;

        grants[_beneficiary] = Grant({
            amount: msg.value,
            releasePeriod: releasePeriod,
            isActive: true
        });

        emit GrantCreated(_beneficiary, msg.value, releasePeriod);
    }

    function revertGrant(address _beneficiary) external onlyOwner {
        require(grants[_beneficiary].isActive, "No active grant to revert");
        require(block.timestamp < grants[_beneficiary].releasePeriod, "Grant cannot be reverted after release time");

        uint256 amount = grants[_beneficiary].amount;
        delete grants[_beneficiary];
        payable(owner).transfer(amount);

        emit GrantReverted(_beneficiary, amount);
    }

    function withdrawGrant() external onlyAfterReleasePeriod(msg.sender) {
        Grant storage grant = grants[msg.sender];
        uint grantAmount = grant.amount;
        grant.isActive = false;
        grant.amount = 0;
        payable(msg.sender).transfer(grantAmount);

        emit GrantWithdrawn(msg.sender, grantAmount);
    }

    function retrieveBeneficiaryInfo(address _beneficiary) external view returns(Grant memory){
        require(grants[_beneficiary].amount > 0, "Beneficiary does not exist");

        return grants[_beneficiary]; 
    }

    function totalStoredEther() external view returns(uint) {
        return address(this).balance;
    }

    function grantReleaseTimeLeft(address _beneficiary) external view returns(uint) {
       require(grants[_beneficiary].isActive, "Beneficiary does not exist");
       
       if (block.timestamp >= grants[_beneficiary].releasePeriod) {
        return 0;
       }

       return grants[_beneficiary].releasePeriod - block.timestamp;
    }

    receive() external payable {}
    fallback() external payable {}
}