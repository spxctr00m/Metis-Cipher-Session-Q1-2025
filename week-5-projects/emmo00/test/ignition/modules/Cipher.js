const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

module.exports = buildModule("CipherTokenContract", (m) => {
    // Create a future for the deployer's address
    const deployer = m.getAccount(0);

    // Deploy the Cipher Contract with the deployer as a parameter
    const cipherContract = m.contract("Cipher", [deployer]);

    // Call the mint function after deployment
    m.call(cipherContract, 'mint', [deployer, 1_000_000]);

    // Return all the deployed contracts
    return { cipherContract };
});
