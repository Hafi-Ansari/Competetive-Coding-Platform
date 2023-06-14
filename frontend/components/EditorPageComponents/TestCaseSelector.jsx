import React from "react";
import CaseButton from "./CaseButton";
import TestCase from "./TestCase";

const TestCaseSelector = ({ activeCase, onSelectCase, results }) => (
  <>
    <CaseButton caseNumber={1} onSelectCase={onSelectCase} />
    <CaseButton caseNumber={2} onSelectCase={onSelectCase} />
    <CaseButton caseNumber={3} onSelectCase={onSelectCase} />
    {activeCase === 1 && (
      <TestCase
        caseInput={[2, 7, 11, 9, 15]}
        target={9}
        results={results[1]}
        expectedOutput={[0, 1]}
      />
    )}
    {activeCase === 2 && (
      <TestCase
        caseInput={[3, 2, 4]}
        target={6}
        results={results[2]}
        expectedOutput={[0, 1]}
      />
    )}
    {activeCase === 3 && (
      <TestCase
        caseInput={[3, 3]}
        target={6}
        results={results[3]}
        expectedOutput={[0, 1]}
      />
    )}
  </>
);

export default TestCaseSelector;
