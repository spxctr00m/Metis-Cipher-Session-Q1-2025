// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract GrantContract {
    struct Grant {
        address beneficiary;
        uint256 amount;
        uint256 unlockTime;
        bool claimed;
    }

    address public owner;
    mapping(address => Grant) public grants;
    uint256 public totalFunds;

    event GrantCreated(address indexed beneficiary, uint256 amount, uint256 unlockTime);
    event GrantRevoked(address indexed beneficiary, uint256 amount);
    event GrantClaimed(address indexed beneficiary, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyBeneficiary() {
        require(grants[msg.sender].beneficiary == msg.sender, "Not a valid beneficiary");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createGrant(address _beneficiary, uint256 _unlockTime) external payable onlyOwner {
        require(msg.value > 0, "Grant amount must be greater than zero");
        require(_unlockTime > block.timestamp, "Unlock time must be in the future");
        require(grants[_beneficiary].amount == 0, "Grant already exists for this beneficiary");

        grants[_beneficiary] = Grant(_beneficiary, msg.value, _unlockTime, false);
        totalFunds += msg.value;

        emit GrantCreated(_beneficiary, msg.value, _unlockTime);
    }

    function revokeGrant(address _beneficiary) external onlyOwner {
        Grant memory grant = grants[_beneficiary];
        require(grant.amount > 0, "No grant found");
        require(!grant.claimed, "Grant already claimed");
        require(block.timestamp < grant.unlockTime, "Cannot revoke after unlock time");

        payable(owner).transfer(grant.amount);
        totalFunds -= grant.amount;
        delete grants[_beneficiary];

        emit GrantRevoked(_beneficiary, grant.amount);
    }

    function claimGrant() external onlyBeneficiary {
        Grant storage grant = grants[msg.sender];
        require(block.timestamp >= grant.unlockTime, "Grant is not yet unlocked");
        require(!grant.claimed, "Grant already claimed");

        uint256 amount = grant.amount;
        grant.claimed = true;
        totalFunds -= amount;
        payable(msg.sender).transfer(amount);

        emit GrantClaimed(msg.sender, amount);
    }

    function getGrantDetails(address _beneficiary) external view returns (address, uint256, uint256, bool) {
        Grant memory grant = grants[_beneficiary];
        return (grant.beneficiary, grant.amount, grant.unlockTime, grant.claimed);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function timeLeftToUnlock(address _beneficiary) external view returns (uint256) {
        require(grants[_beneficiary].amount > 0, "No grant found");
        if (block.timestamp >= grants[_beneficiary].unlockTime) {
            return 0;
        }
        return grants[_beneficiary].unlockTime - block.timestamp;
    }
}
