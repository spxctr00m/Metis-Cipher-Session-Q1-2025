require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY, METIS_SEPOLIA_RPC_URL } = process.env

module.exports = {
  solidity: "0.8.28",
  networks: {
    metisSepolia: {
      url: METIS_SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 59902,
    },
  },
};
