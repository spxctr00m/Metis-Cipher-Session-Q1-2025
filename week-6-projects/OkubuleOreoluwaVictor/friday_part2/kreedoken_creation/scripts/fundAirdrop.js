// Script to fund the Airdrop contract with tokens
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Funding Airdrop from account:", deployer.address);
  
  // Load the merkle data to count whitelisted addresses
  let merkleData;
  try {
    const merkleDataPath = path.join(__dirname, "../merkle-data.json");
    merkleData = JSON.parse(fs.readFileSync(merkleDataPath, "utf8"));
  } catch (error) {
    console.error("Error loading merkle-data.json. Make sure to run generateMerkleTree.js first.");
    process.exit(1);
  }
  
  // Count whitelisted addresses
  const whitelistCount = Object.keys(merkleData.addressProofs).length;
  console.log("Number of whitelisted addresses:", whitelistCount);
  
  // Token address (replace with your deployed token address)
  const tokenAddress = "0xE6337571c096afE0569AfC40b6f44F5A5185C9e8";
  
  // Airdrop contract address (replace with your deployed airdrop address)
  const airdropAddress = "0x9ea02f0bb38F4262154eDdB4BDf7d2561a68FBD7";
  
  // Load the token contract
  const token = await ethers.getContractAt("YourToken", tokenAddress);
  
  // Claim amount per address (100 tokens with 18 decimals)
  const claimAmount = ethers.utils.parseEther("100");
  
  // Calculate total amount needed
  const totalAmount = claimAmount.mul(whitelistCount);
  console.log("Total tokens needed:", ethers.utils.formatEther(totalAmount));
  
  // Check current token balance
  const deployerBalance = await token.balanceOf(deployer.address);
  console.log("Your token balance:", ethers.utils.formatEther(deployerBalance));
  
  if (deployerBalance.lt(totalAmount)) {
    console.error("Error: You don't have enough tokens to fund the airdrop");
    process.exit(1);
  }
  
  // Transfer tokens to the airdrop contract
  console.log(`Transferring ${ethers.utils.formatEther(totalAmount)} tokens to the Airdrop contract...`);
  const tx = await token.transfer(airdropAddress, totalAmount);
  await tx.wait();
  
  // Verify the transfer was successful
  const airdropBalance = await token.balanceOf(airdropAddress);
  console.log("Airdrop contract balance:", ethers.utils.formatEther(airdropBalance));
  
  console.log("Funding complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error funding Airdrop:", error);
    process.exit(1);
  });
