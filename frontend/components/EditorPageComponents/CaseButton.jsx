import React from "react";

const CaseButton = ({ caseNumber, onSelectCase }) => {
  return (
    <button
      className="text-white bg-dark-accent-2 hover:bg-dark-accent-4 hover:text-slate-400 rounded p-1 mr-2"
      onClick={() => onSelectCase(caseNumber)}
    >
      Test Case {caseNumber}
    </button>
  );
};

export default CaseButton;
