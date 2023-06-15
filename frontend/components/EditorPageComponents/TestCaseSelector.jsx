import React from "react";
import CaseButton from "./CaseButton";
import TestCase from "./TestCase";

const TestCaseSelector = ({ activeCase, onSelectCase, results, testCases, isCorrect }) => (
  <>
    {testCases.map((testCase, index) => (
      <CaseButton key={index} caseNumber={index + 1} onSelectCase={() => onSelectCase(index + 1)} isCorrect={isCorrect[index]} />
    ))}

    {testCases.map((testCase, index) => {
      if (activeCase === index + 1) {
        return (
          <TestCase
            key={index}
            caseInput={testCase.input}
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
