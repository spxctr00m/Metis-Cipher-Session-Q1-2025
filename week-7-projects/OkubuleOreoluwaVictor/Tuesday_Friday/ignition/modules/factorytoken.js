const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenFactoryModule", (m) => {
  // Deploy the TokenFactory contract
  const tokenFactory = m.contract("TokenFactory");

  
  return { tokenFactory };
});
