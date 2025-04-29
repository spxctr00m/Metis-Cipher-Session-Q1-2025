// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

OWNER_ADDRESS = "0x185F41BEC7a7E501359a145be1844BfB71379325"; // Replace with the actual owner address
module.exports = buildModule("TokenDeployment", (m) => {
  const spx = m.contract("Spxctr00m", [OWNER_ADDRESS]);
  return { spx };
});
