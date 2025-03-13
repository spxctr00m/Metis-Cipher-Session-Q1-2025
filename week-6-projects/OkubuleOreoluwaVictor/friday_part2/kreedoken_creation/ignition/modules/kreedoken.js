const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const fs = require("fs");
const path = require("path");

module.exports = buildModule("AirdropDeploy", (m) => {
  
  const merkleDataPath = path.join(__dirname, "../../merkle-data.json");
  const merkleData = JSON.parse(fs.readFileSync(merkleDataPath, "utf8"));
  
  
  const merkleRoot = merkleData.root; // Changed from merkleData.merkleRoot
  
  
  const token = m.contract("kreedoken", ["kreedoken", "KKK", 18, 1000000]);
  
  // Set claim amount (100 tokens with 18 decimals)
  const claimAmount = "100000000000000000000";
  
  
  
  const airdrop = m.contract("Airdrop", [
    token,  
    merkleRoot,
    claimAmount
  ]);
  
  return { token, airdrop };
});
