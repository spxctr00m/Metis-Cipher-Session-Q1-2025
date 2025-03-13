const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const VotingModule = buildModule("VotingModule", (m)=>{
	const contract = m.contract("VotingContract", []);
	return {contract};
})

module.exports = VotingModule;
	