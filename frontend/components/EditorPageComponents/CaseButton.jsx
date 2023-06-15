import React from "react";

const CaseButton = ({ caseNumber, onSelectCase, isCorrect }) => {
  let buttonColorClasses;

  if (isCorrect === null) {
    buttonColorClasses = "bg-dark-accent-2 hover:bg-dark-accent-4";
  } else if (isCorrect) {
    buttonColorClasses = "bg-green-500 hover:bg-green-700";
  } else {
    buttonColorClasses = "bg-red-500 hover:bg-red-600";
  }

  return (
    <button
      className={`text-white rounded p-1 mr-2 ${buttonColorClasses}`}
      onClick={() => onSelectCase(caseNumber)}
    >
      Test Case {caseNumber}
    </button>
  );
};

export default CaseButton;
