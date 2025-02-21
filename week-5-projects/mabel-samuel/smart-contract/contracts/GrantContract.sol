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
        bool withdrawn;
    }

    mapping (address => Grant[]) public grants;
    uint public grantReleasePeriod;

    event GrantCreated(address beneficiary, uint amount, uint releasePeriod);
    event GrantReverted(address beneficiary, uint amount);
    event GrantWithdrawn(address beneficiary, uint amount);

    modifier onlyAfterReleasePeriod(){
        require(block.timestamp >= grantReleasePeriod, "Grant can only be withdrawn after the release period");
        _;
    }

    function createGrant(address _beneficiary, uint _releasePeriod) external payable onlyOwner{
        require(msg.value > 0, "Grant amount must be greater than zero");
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(!grants[_beneficiary].exists, "Grant already exists for this beneficiary");

        grants[_beneficiary].push(Grant({
            amount: msg.value,
            releaseTime: _releasePeriod,
            withdrawn: false
        }));

        emit GrantCreated(_beneficiary, msg.value, _releasePeriod);
    }

    function revertGrant(address _beneficiary) external onlyOwner {
        require(grants[_beneficiary].exists, "No grant exists for this beneficiary");
        require(block.timestamp < grants[_beneficiary].releasePeriod, "Grant cannot be reverted after release time");

        uint256 amount = grants[_beneficiary].amount;
        delete grants[_beneficiary];
        payable(owner).transfer(amount);

        emit GrantReverted(_beneficiary, amount);
    }

    // function withdrawGrant(params) onlyAfterReleasePeriod {
    //     code
    // }

}