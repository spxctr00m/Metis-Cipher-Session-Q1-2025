import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("GrantContractModule", (m) => {
    // Deploy the GrantContract (no constructor arguments)
    const grantContract = m.contract("GrantContract", []);

    return { grantContract };
});
