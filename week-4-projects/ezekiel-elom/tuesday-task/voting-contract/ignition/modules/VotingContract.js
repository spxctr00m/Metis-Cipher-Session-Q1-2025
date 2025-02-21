// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingContractModule", (m) => {
  const adminOfficials = m.getParameter("adminOfficials", [
    "0x91591643928182632F3334DfC4f27a12A406d744",
    "0xf9b393680c240Ce13e63E425Da2009DE3DD6F848",
    "0xc6A4A5922a32be3Db95373Fe7f286264209E7390",
    "0x888B09e1dc5fA9952F89882b923E3479537469cd",
    "0x8C927799f5ba7C0692d4Ea706E258fC1B0B8eAC5",
  ]);

  const electionStartTime = m.getParameter(
    "electionStartTime",
    Math.floor(Date.now() / 1000) + 60 // Start in 1 min
  );

  const electionEndTime = m.getParameter(
      "electionEndTime",
      Math.floor(Date.now() / 1000) + 7 * 3600 // Ends in 7 hours
    );

  const votingContract = m.contract("VotingContract", [
    adminOfficials,
    electionStartTime,
    electionEndTime,
  ]);

  return { votingContract };
});
