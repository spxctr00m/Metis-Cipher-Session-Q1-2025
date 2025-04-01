const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const INITIAL_SUPPLY = 1000000;

module.exports = buildModule("ChiefTokenModule", (m) => {
  const chiefToken = m.contract("ChiefToken", [INITIAL_SUPPLY]);

  return { chiefToken };
});
