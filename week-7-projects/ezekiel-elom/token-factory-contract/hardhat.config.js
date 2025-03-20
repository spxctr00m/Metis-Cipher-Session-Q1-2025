require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.28",

  networks: {
    metisSepolia: {    
      url: process.env.METIS_SEPOLIA_RPC_URL, // Metis Sepolia RPC
      accounts: [process.env.PRIVATE_KEY], // Private key from .env
      chainId: 59902, // Metis Sepolia Testnet chainId
    },
  },
  sourcify: {
    enabled: true
  }
};
