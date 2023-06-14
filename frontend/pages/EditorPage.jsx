import React, { useState, useEffect } from "react";
import Editor from "../components/Editor";
import TestCase from "../components/TestCase";
import CaseButton from "../components/CaseButton";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import axios from "axios";

const EditorPage = () => {
  const [sizes, setSizes] = useState(["40%", "60%"]);
  const [innerSizes, setInnerSizes] = useState(["90%", "10%"]);
  const [isPaneUp, setIsPaneUp] = useState(false);
  const [activeCase, setActiveCase] = useState(1);
  const [code, setCode] = useState("print('hello world!')");
  const [results, setResults] = useState({});

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    // Add event listeners to stop propagation of drag events
    window.addEventListener("dragstart", stopPropagation);
    window.addEventListener("dragend", stopPropagation);

    return () => {
      // Remove event listeners when the component unmounts
      window.removeEventListener("dragstart", stopPropagation);
      window.removeEventListener("dragend", stopPropagation);
    };
  }, []);

  const showTestCase = () => {
    if (innerSizes[1] === "10%") {
      setInnerSizes(["35%", "65%"]);
      setIsPaneUp(true);
    } else {
      setInnerSizes(["90%", "10%"]);
      setIsPaneUp(false);
    }
  };

  const onSelectCase = (num) => {
    setActiveCase(num);
  };

  const codeSubmit = () => {
    axios
      .post("http://localhost:80/python", { code })
      .then((response) => {
        console.log(response.data);
        setResults((prevResults) => ({
          ...prevResults,
          [activeCase]: response.data.passOrFail,
        }));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App h-screen dark:bg-dark-primary">
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize="30%" maxSize="70%">
          <div className="h-full dark:bg-dark-secondary p-6 overflow-auto border-r-4 border-black ">
            <h2 className="text-2xl mb-4 text-white font-bold">
              1. Two Sum Problem
            </h2>
            <p className="text-white mb-4">
              Given an array of integers nums and an integer target, return
              indices of the two numbers such that they add up to target.
            </p>
            <p className="text-white mb-4">
              You may assume that each input would have exactly one solution,
              and you may not use the same element twice.
            </p>
            <p className="text-white mb-4">
              You can return the answer in any order.
            </p>
          </div>
        </Pane>
        <Pane>
          <SplitPane
            split="horizontal"
            sizes={innerSizes}
            onChange={setInnerSizes}
            onDragStart={stopPropagation}
            onDragEnd={stopPropagation}
          >
            <Pane>
              <Editor
                className="border-b-4 border-black"
                onCodeChange={setCode}
                code={code}
              />
            </Pane>
            <Pane minSize="10%" maxSize="40% ">
              <div className="h-full bg-dark-secondary p-6 border-t-4 border-black">
                <div className="flex justify-between items-center ">
                  <button
                    className="text-s mb-4 text-white font-bold mt-[-5px] hover:text-slate-400"
                    onClick={showTestCase}
                  >
                    Console {isPaneUp ? "\u02C7" : "\u02C6"}
                  </button>
                  <button
                    className="px-1 py-1 rounded text-white bg-dark-accent mt-[-25px] hover:bg-neutral-700 hover:text-slate-400"
                    onClick={codeSubmit}
                  >
                    Submit{" "}
                  </button>
                </div>
                {isPaneUp && (
                  <>
                    <CaseButton caseNumber={1} onSelectCase={setActiveCase} />
                    <CaseButton caseNumber={2} onSelectCase={setActiveCase} />
                    <CaseButton caseNumber={3} onSelectCase={setActiveCase} />
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
                )}
              </div>
            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    </div>
  );
};

export default EditorPage;
