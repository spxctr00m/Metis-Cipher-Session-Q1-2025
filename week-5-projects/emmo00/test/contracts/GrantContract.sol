// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// @author: Emmanuel Nwafor (Emmo00)
contract GrantContract {
    address public owner;
    
    struct Grant {
        uint256 amount;        // Amount of Ether in wei
        uint256 releaseTime;   // Timestamp when the grant becomes available
        bool exists;           // Whether the grant exists
        bool claimed;          // Whether the grant has been claimed
    }
    
    // Mapping from beneficiary address to their grant
    mapping(address => Grant) public grants;
    
    // Events
    event GrantCreated(address indexed beneficiary, uint256 amount, uint256 releaseTime);
    event GrantClaimed(address indexed beneficiary, uint256 amount);
    event GrantReverted(address indexed beneficiary, uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    function createGrant(address beneficiary, uint256 releaseTime) external payable onlyOwner {
        require(beneficiary != address(0), "Beneficiary address cannot be zero");
        require(msg.value > 0, "Grant amount must be greater than zero");
        require(releaseTime > block.timestamp, "Release time must be in the future");
        require(!grants[beneficiary].exists || grants[beneficiary].claimed, "Beneficiary already has an active grant");
        
        grants[beneficiary] = Grant({
            amount: msg.value,
            releaseTime: releaseTime,
            exists: true,
            claimed: false
        });
        
        emit GrantCreated(beneficiary, msg.value, releaseTime);
    }

    function claimGrant() external {
        Grant storage grant = grants[msg.sender];
        
        require(grant.exists, "No grant exists for this address");
        require(!grant.claimed, "Grant has already been claimed");
        require(block.timestamp >= grant.releaseTime, "Grant is not yet available for claiming");
        
        uint256 amount = grant.amount;
        grant.claimed = true;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit GrantClaimed(msg.sender, amount);
    }
    
    function revertGrant(address beneficiary) external onlyOwner {
        Grant storage grant = grants[beneficiary];
        
        require(grant.exists, "No grant exists for this address");
        require(!grant.claimed, "Grant has already been claimed");
        require(block.timestamp < grant.releaseTime, "Grant release time has already passed");
        
        uint256 amount = grant.amount;
        grant.claimed = true;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit GrantReverted(beneficiary, amount);
    }
    
    function getGrantInfo(address beneficiary) external view returns (
        uint256 amount,
        uint256 releaseTime,
        bool exists,
        bool claimed
    ) {
        Grant memory grant = grants[beneficiary];
        return (grant.amount, grant.releaseTime, grant.exists, grant.claimed);
    }
    
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    function getTimeUntilRelease(address beneficiary) external view returns (uint256) {
        Grant memory grant = grants[beneficiary];
        
        if (!grant.exists || grant.claimed) {
            return 0;
        }
        
        if (block.timestamp >= grant.releaseTime) {
            return 0;
        }
        
        return grant.releaseTime - block.timestamp;
    }
}
