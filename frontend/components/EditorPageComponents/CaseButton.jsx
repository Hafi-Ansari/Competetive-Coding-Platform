import React from "react";

const CaseButton = ({ caseNumber, onSelectCase }) => {
  return (
    <button
      className="text-white bg-dark-accent hover:bg-neutral-700 hover:text-slate-400 rounded p-0 mr-4"
      onClick={() => onSelectCase(caseNumber)}
    >
      Test Case {caseNumber}
    </button>
  );
};

export default CaseButton;
