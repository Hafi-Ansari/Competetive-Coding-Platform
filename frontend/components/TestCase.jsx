import React from 'react';

const TestCase = ({ caseNumber, onInputChange, onExpectedOutputChange }) => {
  return (
    <div className="my-2 bg-dark-secondary">
      <h3 className="text-white">Test Case {caseNumber}</h3>
      <div className="mb-2">
        <label className="text-white block" htmlFor={`input-${caseNumber}`}>Input</label>
        <input
          id={`input-${caseNumber}`} 
          className="w-full p-2 rounded bg-light-primary text-white" 
          onChange={e => onInputChange(e.target.value)}
        />
      </div>
      <div>
        <label className="text-white block" htmlFor={`expected-output-${caseNumber}`}>Expected Output</label>
        <input
          id={`expected-output-${caseNumber}`} 
          className="w-full p-2 rounded bg-light-primary text-white" 
          onChange={e => onExpectedOutputChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TestCase;