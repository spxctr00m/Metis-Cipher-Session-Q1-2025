import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import VotingContractData from "../abi/VotingContract.json"; // Ensure correct ABI import

export const BlockchainContext = createContext();

const contractAddress = "0x834Ae16603a59cB09891226Ed226F17ff6525463";
const VotingContractABI = VotingContractData.abi; // Extract ABI

const BlockchainProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it.");
        return;
      }

      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      const ethSigner = await ethProvider.getSigner();
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      setProvider(ethProvider);
      setSigner(ethSigner);
      setAccount(accounts[0]);

      console.log("Connected account:", accounts[0]);

      const votingContract = new ethers.Contract(contractAddress, VotingContractABI, ethSigner);
      setContract(votingContract);
      console.log("Contract loaded:", votingContract);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <BlockchainContext.Provider value={{ account, contract, connectWallet }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;





// const contractAddress = "0x834Ae16603a59cB09891226Ed226F17ff6525463";
