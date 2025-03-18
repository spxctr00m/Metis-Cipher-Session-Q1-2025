import React from "react";
import BlockchainProvider from "./context/BlockchainContext";
import Navbar from "./components/navbar";
import Dashboard from "./pages/Dashboard";
// import RegisterVoter from "./components/RegisterVoter";
// import Vote from "./components/Vote";
// import RegisterContestant from "./components/RegisterContestant";
// import ElectionResults from "./components/Results";

const App = () => {
  return (
    <BlockchainProvider>
      <Navbar />
      <div className="p-6 space-y-6">
        <Dashboard />
        {/* <RegisterVoter />
        <Vote />
        <RegisterContestant />
        <ElectionResults /> */}
      </div>
    </BlockchainProvider>
  );
};

export default App;
