const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GrantContractModule", (m)=>{
	const grantContract = m.contract("GrantContract", ["MyGrantContract", "GC", 10000]);
	return {grantContract};
});