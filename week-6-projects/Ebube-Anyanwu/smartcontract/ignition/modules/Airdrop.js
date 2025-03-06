const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { merkleRoot } = require("../../scripts/generateMerkleRoot");
const { ethers } = require("ethers");

const CLAIM_AMOUNT = 1000;
const CHIEFTOKEN_ADDRESS = "0x3E796aD5d9bAD3289A995534b78b95C01884BEE6"
const formattedMerkleRoot = merkleRoot.startsWith("0x") ? merkleRoot : "0x" + merkleRoot;

// Convert to Bytes32
const merkleRootBytes32 = ethers.hexlify(formattedMerkleRoot);

module.exports = buildModule("AirdropModule", (m) => {
  const airdrop = m.contract("Airdrop", [CHIEFTOKEN_ADDRESS, merkleRootBytes32, CLAIM_AMOUNT]);

  return { airdrop };
});
