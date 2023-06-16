import React, { useState, useEffect } from "react";
import Editor from "../components/EditorPageComponents/Editor";
import TestCaseSelector from "../components/EditorPageComponents/TestCaseSelector";
import ProblemStatement from "../components/EditorPageComponents/ProblemStatement";
import Modal from "../components/EditorPageComponents/CompleteModal";
import problems from "../problems.json";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import axios from "axios";

const EditorPage = () => {
  //new state that holds an object of different states of components on the page
  const [problemStates, setProblemStates] = useState(
    problems.map((problem) => ({
      problem: problem,
      code: 'print("Hello World")',
      results: { 1: "NULL", 2: "NULL", 3: "NULL" },
      isCorrect: [null, null, null],
      isComplete: false,
      activeCase: 1,
    }))
  );
  //current problem user is on
  const [sizes, setSizes] = useState(["40%", "60%"]);
  const [innerSizes, setInnerSizes] = useState(["90%", "10%"]);
  const [isPaneUp, setIsPaneUp] = useState(false);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [currentProblemState, setCurrentProblemState] = useState(
    problemStates[currentProblemIndex]
  );

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener("dragstart", stopPropagation);
    window.addEventListener("dragend", stopPropagation);

    return () => {
      window.removeEventListener("dragstart", stopPropagation);
      window.removeEventListener("dragend", stopPropagation);
    };
  }, []);

  //when the index is changed, then a problem switch will occur 
  useEffect(() => {
    setCurrentProblemState(problemStates[currentProblemIndex]);
  }, [currentProblemIndex]);

  const showTestCase = () => {
    if (innerSizes[1] === "10%") {
      setInnerSizes(["35%", "65%"]);
      setIsPaneUp(true);
    } else {
      setInnerSizes(["90%", "10%"]);
      setIsPaneUp(false);
    }
  };

  const codeSubmit = () => {
    axios
      .post("http://localhost:80/python", {
        code: currentProblemState.code,
      })
      .then((response) => {
        let updatedProblemState = { ...currentProblemState };
        updatedProblemState.results[updatedProblemState.activeCase] =
          response.data.passOrFail;
        let resultArray = JSON.parse(response.data.passOrFail);
        let isTestCasePassed =
          resultArray.toString() ===
          updatedProblemState.problem.testCases[
            updatedProblemState.activeCase - 1
          ].expectedOutput.toString();
        updatedProblemState.isCorrect[updatedProblemState.activeCase - 1] =
          isTestCasePassed;
        if (updatedProblemState.isCorrect.every((value) => value === true)) {
          updatedProblemState.isComplete = true;
        }
        setCurrentProblemState(updatedProblemState);
      })
      .catch((error) => console.error(error));
  };

  const onClose = () => {
    setCurrentProblemState({
      ...currentProblemState,
      isComplete: !currentProblemState.isComplete,
    });
  };

  return (
    <div className="App h-screen dark:bg-dark-primary">
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize="30%" maxSize="70%">
          <div className="h-full dark:bg-dark-secondary p-6 overflow-auto border-r-4 border-black ">
            {currentProblemState.isComplete && <Modal onClose={onClose} />}
            <ProblemStatement
              title={currentProblemState.problem.title}
              description={currentProblemState.problem.description}
              examples={currentProblemState.problem.examples}
              constraints={currentProblemState.problem.constraints}
              followUp={currentProblemState.problem.followUp}
            />
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
                onCodeChange={(newCode) =>
                  setCurrentProblemState({
                    ...currentProblemState,
                    code: newCode,
                  })
                }
                code={currentProblemState.code}
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
                    className="p-2 rounded text-white bg-green-500 mt-[-25px] hover:bg-green-700 hover:text-slate-400"
                    onClick={codeSubmit}
                  >
                    Submit{" "}
                  </button>
                </div>
                {isPaneUp && (
                  <TestCaseSelector
                    activeCase={currentProblemState.activeCase}
                    onSelectCase={(newActiveCase) =>
                      setCurrentProblemState({
                        ...currentProblemState,
                        activeCase: newActiveCase,
                      })
                    }
                    results={currentProblemState.results}
                    testCases={currentProblemState.problem.testCases}
                    isCorrect={currentProblemState.isCorrect}
                  />
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
