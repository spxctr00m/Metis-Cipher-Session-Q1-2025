const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

module.exports = buildModule("Grant_Contract", (m) => {
    // Deploy the GrantContract
    const grantContract = m.contract("GrantContract", []);

    // Return all the deployed contracts
    return { grantContract };
});