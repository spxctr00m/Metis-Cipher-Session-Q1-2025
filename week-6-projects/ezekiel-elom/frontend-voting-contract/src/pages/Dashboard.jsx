import React, { useState } from "react";
import RegisterVoter from "../components/RegisterVoter";
import RegisterContestant from "../components/RegisterContestant";
import Vote from "../components/Vote";
import ElectionResults from "../components/Results";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("registerVoter");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-green-900 text-white font-bold p-4">
        {/* <h2 className="text-xl font-bold mb-4">Voting DApp</h2> */}
        <nav>
          <ul className="space-y-3">
            <li
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === "registerVoter" ? "bg-white text-green-900" : ""
              }`}
              onClick={() => setActiveTab("registerVoter")}
            >
              Register Voter
            </li>
            <li
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === "registerContestant" ? "bg-white text-green-900" : ""
              }`}
              onClick={() => setActiveTab("registerContestant")}
            >
              Register Contestant
            </li>
            <li
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === "vote" ? "bg-white text-green-900" : ""
              }`}
              onClick={() => setActiveTab("vote")}
            >
              Vote
            </li>
            <li
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === "results" ? "bg-white text-green-900" : ""
              }`}
              onClick={() => setActiveTab("results")}
            >
              View Results
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-md">
        {activeTab === "registerVoter" && <RegisterVoter />}
        {activeTab === "registerContestant" && <RegisterContestant />}
        {activeTab === "vote" && <Vote />}
        {activeTab === "results" && <ElectionResults />}
      </main>
    </div>
  );
};

export default Dashboard;
