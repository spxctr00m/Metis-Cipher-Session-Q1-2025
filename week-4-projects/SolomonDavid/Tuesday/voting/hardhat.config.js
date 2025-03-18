require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    metisSepolia: {
    url: process.env.METIS_SEPOLIA_RPC_URL,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    chainId: 59902,
    },
},
     etherscan: {
    apiKey: {
      metisSepolia: "PLACEHOLDER_STRING", // Use a non-empty string as a placeholder
    },
    customChains: [
      {
        network: "metisSepolia",
        chainId: 59902,
        urls: {
          apiURL: "https://sepolia-explorer-api.metisdevops.link/api",
          browserURL: "https://sepolia-explorer.metisdevops.link/",
        },
      },
    ],
  },
};
