const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingContractModule", (m) => {
  // Deploy the VotingContract
  const votingContract = m.contract("VotingContract");

  // Return the deployed contract for use in other modules or tests
  return { votingContract };
});
