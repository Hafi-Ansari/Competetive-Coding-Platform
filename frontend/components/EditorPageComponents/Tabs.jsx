import React, { useState } from "react";

const Tabs = ({ changeTab, completedProblems}) => {
  const [activeTab, setActiveTab] = useState(0);

  const TabButton = ({ index, label }) => (
    <button
      className={`px-6 py-2 text-sm font-bold uppercase ${
        completedProblems[index] ? (activeTab === index ? "bg-green-600 text-white" : "bg-green-500 text-white hover:bg-green-600") :
        (activeTab === index ? "bg-dark-accent-5 text-white" : "bg-dark-primary text-white hover:bg-dark-accent-5")
      }`}
      onClick={() => {
        changeTab(index);
        setActiveTab(index);
      }}
    >
      {label}
    </button>
  );
  

  return (
    <div className="bg-dark-primary mb-4">
      <div className="flex space-x-4">
        <TabButton index={0} label="Q1"/>
        <TabButton index={1} label="Q2" />
        <TabButton index={2} label="Q3" />
        <TabButton index={3} label="Q4" />
      </div>
    </div>
  );
};

export default Tabs;
