import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tokenData from "../abi/MyToken.json";
import airdropData from "../abi/Airdrop.json";

const myTokenAddress = "0xd37C1Ef6191dc1dE65c21600AeD4bdAb957BDF6e";
const airdropAddress = "0x32D353a4E09Bf4C3D411950E885c7d5CA32BB077";

const myTokenABI = tokenData.abi;
const airdropABI = airdropData.abi;

const AirdropClaim = () => {
  const [account, setAccount] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [merkleProof, setMerkleProof] = useState([]);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const setupProvider = async () => {
        const providerInstance = new ethers.BrowserProvider(window.ethereum);
        const signerInstance = await providerInstance.getSigner();
        setProvider(providerInstance);
        setSigner(signerInstance);
      };
      setupProvider();
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        toast.success(`Connected wallet: ${accounts[0]}`);
        checkEligibility(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
        toast.error("Wallet connection failed!");
      }
    } else {
      toast.warn("MetaMask is required!");
    }
  };

  const getBalance = async () => {
    if (!signer) return;
    try {
      const myTokenContract = new ethers.Contract(myTokenAddress, myTokenABI, signer);
      const balanceWei = await myTokenContract.balanceOf(await signer.getAddress());
      const balanceEth = ethers.formatEther(balanceWei);
      setBalance(balanceEth);
      toast.info(`Your balance: ${balanceEth} tokens`);
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error("Failed to fetch balance");
    }
  };

  const checkEligibility = async (userAddress) => {
    try {
      const proof = ["0x37d551a45680e0c211bea5878ff5a4a5944f18ad60938e74bfa31d7935096988"];
      if (proof.length > 0) {
        setIsEligible(true);
        setMerkleProof(proof);
        toast.success("You are eligible for the airdrop!");
      } else {
        setIsEligible(false);
        toast.error("You are not whitelisted for the airdrop!");
      }
    } catch (error) {
      console.error("Error checking eligibility:", error);
      toast.error("Error verifying eligibility");
    }
  };

  const claimAirdrop = async () => {
    if (!isEligible) {
      toast.error("You are not whitelisted!");
      
      return;
    }

    setLoading(true);
    try {
      const airdropContract = new ethers.Contract(airdropAddress, airdropABI, signer);
      const tx = await airdropContract.claimTokens(merkleProof);
      await tx.wait();
      alert("Airdrop claimed successfully!");
      toast.success("Airdrop claimed successfully!");
    } catch (error) {
      console.error("Error claiming airdrop:", error);
      toast.error("Failed to claim airdrop, you're not whitelisted.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-2xl font-semibold mb-4">Airdrop Claim</h2>

        {account ? (
          <p className="text-green-600">Connected: {account}</p>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Connect Wallet
          </button>
        )}

        {account && (
          <div className="mt-4">
            <button onClick={getBalance} className="bg-gray-500 text-white px-4 py-2 rounded">
              Check Balance
            </button>

            {balance !== null && (
              <p className="mt-2 text-gray-700">Your Balance: {balance} Tokens</p>
            )}

            {isEligible ? (
              <button
                onClick={claimAirdrop}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                disabled={loading}
              >
                {loading ? "Claiming..." : "Claim Airdrop"}
              </button>
            ) : (
              <p className="text-red-500 mt-2">Not eligible for airdrop</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AirdropClaim;
