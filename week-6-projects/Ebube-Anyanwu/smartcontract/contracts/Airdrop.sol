// SPDX-License-Identifier UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Airdrop is Ownable {
    IERC20 public token;
    bytes32 public merkleRoot;
    uint public claimAmount;
    mapping (address => bool) public hasClaimed;
    event AirdropClaimed(address indexed account, uint amount);

    constructor(address _token, bytes32 _merkleRoot, uint _claimAmount) Ownable(msg.sender) {
        token = IERC20(_token);
        merkleRoot = _merkleRoot;
        claimAmount = _claimAmount;
    }

    function claim(bytes32[] calldata merkleProof) external {
        require(!hasClaimed[msg.sender], "You have already claimed the airdrop");
        uint amount = claimAmount;
        bytes32 node = keccak256(abi.encodePacked(msg.sender, amount));
        require(MerkleProof.verify(merkleProof, merkleRoot, node), "Airdrop: Invalid proof");

        hasClaimed[msg.sender] = true;
        require(token.transfer(msg.sender, amount), "Transfer failed");
        emit AirdropClaimed(msg.sender, amount);
    }

    function updateMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function updateClaimedAmount(uint _claimAmount) external onlyOwner {
        claimAmount = _claimAmount;
    }

    function withdrawUnclaimedTokens() external onlyOwner {
        uint balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Withdrawal failed");
    }


}