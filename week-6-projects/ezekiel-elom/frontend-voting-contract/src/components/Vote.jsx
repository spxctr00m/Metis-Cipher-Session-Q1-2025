import React, { useState, useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import { toast } from "react-toastify";

const Vote = () => {
  const { contract, account } = useContext(BlockchainContext);
  const [contestantAddress, setContestantAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const castVote = async () => {
    if (!account) {
      toast.error("Please connect your wallet!");
      return;
    }
    if (!contract) return;

    setLoading(true);
    try {
      const tx = await contract.vote(contestantAddress);
      await tx.wait();

      toast.success("Vote Cast Successfully!");
      setContestantAddress(""); // Clear input field
    } catch (error) {
      console.error("Voting failed:", error);
      toast.error("Voting failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg text-green-900 font-bold mb-2">Vote for a Contestant</h2>
      <input type="text" placeholder="Contestant Address" value={contestantAddress} onChange={(e) => setContestantAddress(e.target.value)} className="border p-2 w-full mb-2" />
      <button onClick={castVote} className="bg-green-900 text-white p-2 rounded-md w-full" disabled={loading}>
        {loading ? "Voting..." : "Vote"}
      </button>
    </div>
  );
};

export default Vote;
