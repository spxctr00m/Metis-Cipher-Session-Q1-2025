const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GrantMoodule", (m) => {
  const grantContract = m.contract("GrantContract", []);

  return { grantContract };
});
