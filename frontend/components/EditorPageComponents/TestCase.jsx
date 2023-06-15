import React from "react";

const TestCase = ({ caseInput, expectedOutput, results }) => {
  return (
    <div className="my-2 bg-dark-secondary overflow-auto max-h-64">
      <div className="mb-2">
        <label
          className="text-white block font-bold text-xs mt-6 mb-2"
          htmlFor={`input-${caseInput}`}
        >
          Input
        </label>
        <div
          id={`input-${caseInput}`}
          className="w-full p-2 rounded bg-dark-accent-2 text-white"
        >
          {Object.entries(caseInput).map(([key, value]) => (
            <div key={key}>
              {key}: {JSON.stringify(value)}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <label
          className="text-white block font-bold text-xs mb-2"
          htmlFor={`expected-output-${caseInput}`}
        >
          Expected Output
        </label>
        <div
          id={`expected-output-${caseInput}`}
          className="w-full p-2 rounded bg-dark-accent-2 text-white"
        >
          {JSON.stringify(expectedOutput)}
        </div>
      </div>

      <div className="mb-2">
        <label
          className="text-white block font-bold text-xs mb-2"
          htmlFor={`output-${caseInput}`}
        >
          Output
        </label>
        <div
          id={`output-${caseInput}`}
          className="w-full p-2 rounded bg-dark-accent-2 text-white"
        >
          {results}
        </div>
      </div>
    </div>
  );
};

export default TestCase;
