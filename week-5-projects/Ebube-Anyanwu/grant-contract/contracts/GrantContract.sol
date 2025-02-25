// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Ownable {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }
}

contract GrantContract is Ownable {
    struct Grant {
        uint amount;
        uint timeToElapse;
        bool isValid;
        bool isClaimed;
    }

     mapping(address => Grant) public grants;
     uint totalFunds;

     event GrantCreated(address beneficiary, uint amount, uint _releaseTime);
     event GrantWitdrawn(address beneficiary, uint amount);
     event GrantReverted(address beneficiary, uint amount);

     modifier onlyBeneficiary(){
        require(grants[msg.sender].isValid, "No available grants for this address");
        _;
     }
     
     function createGrant(address _beneficiary, uint256 _timeToElapse) external payable onlyOwner {
        require(msg.value > 0, "Grant amount must be greater than zero");
        require(_timeToElapse + block.timestamp > block.timestamp, "Must be set to a future date");
        require(!grants[_beneficiary].isValid, "Dem don already settle this guy na");
        grants[_beneficiary] = Grant({
            amount: msg.value,
            timeToElapse: block.timestamp + _timeToElapse,
            isValid: true,
            isClaimed: false
        });

        totalFunds += msg.value;

        emit GrantCreated(_beneficiary, msg.value, _timeToElapse);
    }

    function withdrawFunds() external onlyBeneficiary{
        if (grants[msg.sender].timeToElapse > block.timestamp) {
            revert("Grant is not yet available for withdrawal");
        } else {
            uint grant = grants[msg.sender].amount;
            totalFunds -= grant;
            payable(msg.sender).transfer(grant);
            grants[msg.sender].isClaimed = true;
            grants[msg.sender].isValid = false;

            emit GrantWitdrawn(msg.sender, grant);
        }
    }

    function revertGrant(address _beneficiary) external onlyOwner{
        require(grants[_beneficiary].isValid, "No available grants for this address");
        require(grants[_beneficiary].timeToElapse > block.timestamp, "Grant has already been alloted");
        uint grant = grants[_beneficiary].amount;
        totalFunds -= grant;
        payable(owner).transfer(grant);
        delete grants[_beneficiary];

        emit GrantReverted(_beneficiary, grant);
    }

    function getTotalFunds() external view returns (uint){
        return totalFunds;
    }

    function getRemainingTime(address _beneficiary) external view returns (uint){
        require(grants[_beneficiary].isValid, "No available grants for this address");
        require(grants[_beneficiary].timeToElapse > block.timestamp, "Grant time has elapsed");
        return grants[_beneficiary].timeToElapse - block.timestamp;
    }
}
