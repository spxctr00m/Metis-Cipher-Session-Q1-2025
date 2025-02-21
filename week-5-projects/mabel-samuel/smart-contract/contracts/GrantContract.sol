// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Permission denied");
        _;
    }
}

contract GrantContract is Ownable {
    struct Grant {
        uint256 amount;
        uint256 releasePeriod;
        bool withdrawn;
    }

    mapping(address => Grant[]) public grants;

    event GrantCreated(address indexed beneficiary, uint256 amount, uint256 releasePeriod);
    event GrantReverted(address indexed beneficiary, uint256 amount);
    event GrantWithdrawn(address indexed beneficiary, uint256 amount);

    function createGrant(address _beneficiary, uint256 _releasePeriod) external payable onlyOwner {
        require(msg.value > 0, "Grant amount must be greater than zero");
        require(_beneficiary != address(0), "Invalid beneficiary address");

        grants[_beneficiary].push(Grant({
            amount: msg.value,
            releasePeriod: _releasePeriod,
            withdrawn: false
        }));

        emit GrantCreated(_beneficiary, msg.value, _releasePeriod);
    }

    function revertGrant(address _beneficiary, uint256 index) external onlyOwner {
        require(index < grants[_beneficiary].length, "Invalid grant index");
        Grant storage grant = grants[_beneficiary][index];
        require(!grant.withdrawn, "Grant already withdrawn");
        require(block.timestamp < grant.releasePeriod, "Grant cannot be reverted after release time");

        uint256 amount = grant.amount;
        grant.withdrawn = true; 
        payable(owner).transfer(amount);

        emit GrantReverted(_beneficiary, amount);
    }

    function withdrawGrant(uint256 index) external {
        require(index < grants[msg.sender].length, "Invalid grant index");
        Grant storage grant = grants[msg.sender][index];
        require(!grant.withdrawn, "Grant already withdrawn");
        require(block.timestamp >= grant.releasePeriod, "Grant not yet available");

        uint256 amount = grant.amount;
        grant.withdrawn = true; 
        payable(msg.sender).transfer(amount);

        emit GrantWithdrawn(msg.sender, amount);
    }
}
