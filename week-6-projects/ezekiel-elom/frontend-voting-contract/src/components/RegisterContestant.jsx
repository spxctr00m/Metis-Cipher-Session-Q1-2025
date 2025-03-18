import React, { useState, useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import { toast } from "react-toastify";

const RegisterContestant = () => {
  const { contract, account } = useContext(BlockchainContext);
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateAge: "",
    politicalParty: "",
    manifesto: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerContestant = async () => {
    if (!account) {
      toast.error("Please connect your wallet!");
      return;
    }
    if (!contract) return;

    setLoading(true);
    try {
      const tx = await contract.registerContestant(
        account,
        formData.candidateName,
        parseInt(formData.candidateAge),
        formData.politicalParty,
        formData.manifesto
      );
      await tx.wait();

      toast.success("Contestant Registered Successfully!");
      setFormData({ candidateName: "", candidateAge: "", politicalParty: "", manifesto: "" }); // Clear form fields
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg text-green-900 font-bold mb-2">Register as Contestant</h2>
      <input type="text" name="candidateName" placeholder="Candidate Name" value={formData.candidateName} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="number" name="candidateAge" placeholder="Candidate Age" value={formData.candidateAge} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="politicalParty" placeholder="Political Party" value={formData.politicalParty} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="manifesto" placeholder="Manifesto" value={formData.manifesto} onChange={handleChange} className="border p-2 w-full mb-2" />
      <button onClick={registerContestant} className="bg-green-900 text-white font-bold  p-2 rounded-md w-full" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default RegisterContestant;
