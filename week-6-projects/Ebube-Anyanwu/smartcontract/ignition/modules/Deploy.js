// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { merkleRoot } = require("../../scripts/generateMerkleRoot");

module.exports = buildModule("AirdropModule", (m) => {
  // Define the deployer
  const [deployer] = m.getSigners();

  // Set the initial supply of tokens to 1 million tokens
  const initialSupply = 1000000n;
  const claimAmount = 1000;  // Claim 1000 tokens per user

  // Deploy ChiefToken contract
  const chiefToken = m.contract("ChiefToken", [initialSupply], { from: deployer });
  console.log("ChiefToken deployed at:", chiefToken.address);

  // Deploy Airdrop contract
  const airdrop = m.contract("Airdrop", [chiefToken.address, merkleRoot, claimAmount], { from: deployer });
  console.log("Airdrop deployed at:", airdrop.address);

  return { chiefToken, airdrop };
});
