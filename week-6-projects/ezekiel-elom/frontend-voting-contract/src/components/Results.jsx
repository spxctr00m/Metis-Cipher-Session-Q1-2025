import React, { useState, useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import { toast } from "react-toastify";

const ElectionResults = () => {
  const { contract, account } = useContext(BlockchainContext);
  const [winner, setWinner] = useState(null);
  const [voteCount, setVoteCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const getElectionResults = async () => {
    if (!account) {
      toast.error("Please connect your wallet!");
      return;
    }
    if (!contract) return;

    setLoading(true);
    try {
      const winnerAddress = await contract.presidentElect();
      const winnerVoteCount = await contract.getVoteCount(winnerAddress);

      setWinner(winnerAddress);
      setVoteCount(winnerVoteCount.toString());

      toast.success("Election results fetched successfully!");
    } catch (error) {
      console.error("Error fetching election results:", error);
      toast.error("Failed to fetch election results.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg text-green-900 font-bold mb-2">Election Results</h2>
      <button onClick={getElectionResults} className="bg-green-900 text-white p-2 rounded-md w-full" disabled={loading}>
        {loading ? "Fetching..." : "Show Results"}
      </button>
      {winner && <div className="mt-4"><p><strong>Winner:</strong> {winner}</p><p><strong>Vote Count:</strong> {voteCount}</p></div>}
    </div>
  );
};

export default ElectionResults;
