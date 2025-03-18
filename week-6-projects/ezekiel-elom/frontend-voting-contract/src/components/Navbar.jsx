import React, { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext"; // Ensure correct path

const Navbar = () => {
  const { account, connectWallet } = useContext(BlockchainContext);

  return (
    <nav className="bg-green-900 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">Voting DApp</h1>
      <button
        onClick={connectWallet}
        className="bg-white text-green-900 font-bold px-4 py-2 rounded-md hover:bg-gray-200 transition"
      >
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </button>
    </nav>
  );
};

export default Navbar;
