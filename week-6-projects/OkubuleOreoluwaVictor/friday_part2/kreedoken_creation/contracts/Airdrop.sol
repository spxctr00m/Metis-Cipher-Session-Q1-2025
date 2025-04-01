// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @title Airdrop
 * @dev Contract for distributing tokens to whitelisted addresses using a Merkle Tree
 */
contract Airdrop is Ownable {
    // The token being distributed
    IERC20 public token;
    
    // The Merkle root of the whitelist
    bytes32 public merkleRoot;
    
    // Amount of tokens per claim
    uint256 public claimAmount;
    
    // Mapping to track if an address has already claimed
    mapping(address => bool) public hasClaimed;
    
    // Events
    event TokensClaimed(address indexed account, uint256 amount);
    event MerkleRootUpdated(bytes32 newMerkleRoot);
    event ClaimAmountUpdated(uint256 newClaimAmount);
    event TokensWithdrawn(address indexed to, uint256 amount);

    
    constructor(address _token, bytes32 _merkleRoot, uint256 _claimAmount) Ownable(msg.sender) {
        require(_token != address(0), "Token address cannot be zero");
        require(_merkleRoot != bytes32(0), "Merkle root cannot be zero");
        require(_claimAmount > 0, "Claim amount must be greater than zero");
        
        token = IERC20(_token);
        merkleRoot = _merkleRoot;
        claimAmount = _claimAmount;
    }
    
    
    function claim(bytes32[] calldata merkleProof) external {
        
        require(!hasClaimed[msg.sender], "Tokens already claimed");
        
        
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(merkleProof, merkleRoot, leaf), "Invalid Merkle proof");
        
        
        hasClaimed[msg.sender] = true;
        
       
        require(token.transfer(msg.sender, claimAmount), "Token transfer failed");
        
        emit TokensClaimed(msg.sender, claimAmount);
    }
    
    
    function updateMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        require(_merkleRoot != bytes32(0), "Merkle root cannot be zero");
        merkleRoot = _merkleRoot;
        emit MerkleRootUpdated(_merkleRoot);
    }
    
 
    function updateClaimAmount(uint256 _claimAmount) external onlyOwner {
        require(_claimAmount > 0, "Claim amount must be greater than zero");
        claimAmount = _claimAmount;
        emit ClaimAmountUpdated(_claimAmount);
    }
    
    
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than zero");
        require(token.transfer(owner(), amount), "Token transfer failed");
        emit TokensWithdrawn(owner(), amount);
    }
    
    
    function isEligible(address account, bytes32[] calldata merkleProof) external view returns (bool) {
        if (hasClaimed[account]) {
            return false;
        }
        
        bytes32 leaf = keccak256(abi.encodePacked(account));
        return MerkleProof.verify(merkleProof, merkleRoot, leaf);
    }
}
