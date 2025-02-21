// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract GrantContract {
    struct Grant {
        uint256 amount;
        uint256 releaseTime;
        bool exists;
    }

    address public owner;
    mapping(address => Grant) public grants;

    event GrantCreated(address indexed beneficiary, uint256 amount, uint256 releaseTime);
    event GrantReverted(address indexed beneficiary, uint256 amount);
    event ClaimedGrant(address indexed beneficiary, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier grantExists(address beneficiary) {
        require(grants[beneficiary].exists, "Grant does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createGrant(address beneficiary, uint256 releaseTime) external payable onlyOwner {
        require(msg.value > 0, "Hello there, the Grant must have funds");
        require(releaseTime > block.timestamp, "Oops, the release time must be in the future, try again");
        require(!grants[beneficiary].exists, "Here we go, Grant already exists, try again");

        grants[beneficiary] = Grant(msg.value, releaseTime, true);
        emit GrantCreated(beneficiary, msg.value, releaseTime);
    }

    function revertGrant(address beneficiary) external onlyOwner grantExists(beneficiary) {
        require(block.timestamp < grants[beneficiary].releaseTime, "Ouch, Grant cannot be reverted after release time");

        uint256 amount = grants[beneficiary].amount;
        delete grants[beneficiary];

        payable(owner).transfer(amount);
        emit GrantReverted(beneficiary, amount);
    }

    function claimGrant() external grantExists(msg.sender) {
        Grant memory grant = grants[msg.sender];
        require(block.timestamp >= grant.releaseTime, "Ehya, Grant is not yet available, wait until it is");

        delete grants[msg.sender];
        payable(msg.sender).transfer(grant.amount);
        emit ClaimedGrant(msg.sender, grant.amount);
    }

    function getGrantDetails(address beneficiary) external view returns (uint256 amount, uint256 releaseTime) {
        require(grants[beneficiary].exists, "Grant does not exist, try again");
        Grant memory grant = grants[beneficiary];
        return (grant.amount, grant.releaseTime);
    }

    function getTotalFunds() external view returns (uint256) {
        return address(this).balance;
    }

    function getTimeLeft(address beneficiary) external view grantExists(beneficiary) returns (uint256) {
        if (block.timestamp >= grants[beneficiary].releaseTime) {
            return 0;
        }
        return grants[beneficiary].releaseTime - block.timestamp;
    }

    receive() external payable {} // Allow contract to receive Ether
}
