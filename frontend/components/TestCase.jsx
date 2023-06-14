import React from "react";

const TestCase = ({ caseNumber, onInputChange, onExpectedOutputChange }) => {
  return (
    <div className="my-2 bg-dark-secondary ">
      <button className="text-white  bg-dark-accent  hover:bg-neutral-700 hover:text-slate-400 rounded">
        Test Case {caseNumber}
      </button>
      <div className="mb-2">
        <label className="text-white block" htmlFor={`input-${caseNumber}`}>
          Input
        </label>
        <input
          id={`input-${caseNumber}`}
          className="w-full p-2 rounded bg-dark-accent-2 text-white"
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
      <div>
        <label
          className="text-white block"
          htmlFor={`expected-output-${caseNumber}`}
        >
          Expected Output
        </label>
        <input
          id={`expected-output-${caseNumber}`}
          className="w-full p-2 rounded bg-dark-accent-2 text-white"
          onChange={(e) => onExpectedOutputChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TestCase;
