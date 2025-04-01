// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Airdrop is Ownable {
    IERC20 public token;
    bytes32 public merkleRoot;
    uint256 public claimAmount;
    mapping(address => bool) public hasClaimed;

    event Claimed(address indexed user, uint256 amount);
    event MerkleRootUpdated(bytes32 newMerkleRoot);
    event ClaimAmountUpdated(uint256 newClaimAmount);
    event Withdrawn(uint256 amount);

    constructor(address _token, bytes32 _merkleRoot, uint256 _claimAmount)
        Ownable(msg.sender)
    {
        token = IERC20(_token);
        merkleRoot = _merkleRoot;
        claimAmount = _claimAmount;
    }

    function claimTokens(bytes32[] calldata merkleProof) external {
        require(!hasClaimed[msg.sender], "Already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(merkleProof, merkleRoot, leaf), "Not whitelisted");

        hasClaimed[msg.sender] = true;
        require(token.transfer(msg.sender, claimAmount), "Transfer failed");

        emit Claimed(msg.sender, claimAmount);
    }

    // Admin Functions
    function updateMerkleRoot(bytes32 _newMerkleRoot) external onlyOwner {
        merkleRoot = _newMerkleRoot;
        emit MerkleRootUpdated(_newMerkleRoot);
    }

    function updateClaimAmount(uint256 _newClaimAmount) external onlyOwner {
        claimAmount = _newClaimAmount;
        emit ClaimAmountUpdated(_newClaimAmount);
    }

    function withdrawUnclaimedTokens() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Withdraw failed");
        emit Withdrawn(balance);
    }
}
