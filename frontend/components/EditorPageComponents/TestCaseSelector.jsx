import React from "react";
import CaseButton from "./CaseButton";
import TestCase from "./TestCase";

const TestCaseSelector = ({ activeCase, onSelectCase, results, testCases }) => (
  <>
    {testCases.map((testCase, index) => (
      <CaseButton key={index} caseNumber={index + 1} onSelectCase={() => onSelectCase(index + 1)} />
    ))}

    {testCases.map((testCase, index) => {
      if (activeCase === index + 1) {
        return (
          <TestCase
            key={index}
            caseInput={testCase.input}
            target={testCase.target}
            results={results[activeCase]}
            expectedOutput={testCase.expectedOutput}
          />
        );
      }
      return null;
    })}
  </>
);

export default TestCaseSelector;
