const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployMyToken", (m) => {
  const myToken = m.contract("MyToken"); // Deploy MyToken contract
  return { myToken };
});
