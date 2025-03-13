import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("GrantModule", (m) => {
  const grantContract = m.contract("GrantContract");

  return { grantContract };
});
