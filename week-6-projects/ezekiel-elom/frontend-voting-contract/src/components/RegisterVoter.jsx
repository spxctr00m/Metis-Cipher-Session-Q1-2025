import React, { useState, useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RegisterVoter = () => {
  const { contract, account } = useContext(BlockchainContext);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    nin: "",
    nationality: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerVoter = async () => {
    if (!account) {
      toast.error("Please connect your wallet!");
      return;
    }
    if (!contract) return;

    setLoading(true);
    try {
      const tx = await contract.registerVoter(
        account,
        formData.fullName,
        parseInt(formData.age),
        formData.nin,
        formData.nationality
      );
      await tx.wait();

      toast.success("Voter Registered Successfully!");
      setFormData({ fullName: "", age: "", nin: "", nationality: "" }); // Clear form fields
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
            <ToastContainer />
      <h2 className="text-lg text-green-900 font-bold mb-2">Register as Voter</h2>
      <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="number" name="nin" placeholder="NIN" value={formData.nin} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} className="border p-2 w-full mb-2" />
      <button onClick={registerVoter} className="bg-green-900 font-bold text-white p-2 rounded-md w-full" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default RegisterVoter;
