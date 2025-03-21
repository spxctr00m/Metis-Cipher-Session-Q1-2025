const { buildModule } = require("@nomicfoundation/ignition-core");

module.exports = buildModule("TokenFactoryModule", (m) => {
  const tokenFactory = m.contract("TokenFactory");

  return { tokenFactory };
});
