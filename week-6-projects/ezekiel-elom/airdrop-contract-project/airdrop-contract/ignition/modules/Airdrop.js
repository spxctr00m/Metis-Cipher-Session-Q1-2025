const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployAirdrop", (m) => {
  
  const myTokenAddress = "0xd37C1Ef6191dc1dE65c21600AeD4bdAb957BDF6e"; 

  
  
  // const merkleRoot = "0x69480ca6a7eee7af655a8985695a6b1bd004684fce4bdf03d5ab1523cda04acd";  
  const merkleRoot = "0x82a86259d88bbb00e89c29c1406b4a0272a56c2f95736f6d81c234928d8f38b2";  

  const claimAmount = m.getParameter("claimAmount", "10000000000000000000"); // 10 tokens in wei

  const airdrop = m.contract("Airdrop", [myTokenAddress, merkleRoot, claimAmount]);

  return { airdrop };
});
