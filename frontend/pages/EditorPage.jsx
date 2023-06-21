import React, { useState, useEffect } from "react";
import Editor from "../components/EditorPageComponents/Editor";
import TestCaseSelector from "../components/EditorPageComponents/TestCaseSelector";
import ProblemStatement from "../components/EditorPageComponents/ProblemStatement";
import Modal from "../components/EditorPageComponents/CompleteModal";
import Tabs from "../components/EditorPageComponents/Tabs";
import problems from "../problems.json";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import axios from "axios";

const EditorPage = () => {
  const [problemStates, setProblemStates] = useState([]);

  useEffect(() => {
    // Make a GET request to backend to get four random problems
    axios
      .get("http://localhost:80/problems/random")
      .then((response) => {
        // When the data is returned, update your state
        setProblemStates(
          response.data.map((problem) => ({
            problem: problem,
            code: problem.code,
            results: new Array(problem.testCases.length).fill("NULL"),
            isCorrect: new Array(problem.testCases.length).fill(null),
            isComplete: false,
            activeCase: 1,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [completedProblems, setCompletedProblems] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [sizes, setSizes] = useState(["40%", "60%"]);
  const [innerSizes, setInnerSizes] = useState(["90%", "10%"]);
  const [isPaneUp, setIsPaneUp] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

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

  useEffect(() => {
    setCompletedProblems((prev) => {
      let updatedProblems = [...prev];
      updatedProblems[currentProblemIndex] =
        problemStates[currentProblemIndex]?.isComplete;
      return updatedProblems;
    });
  }, [problemStates, currentProblemIndex]);

  const changeTab = (newIndex) => {
    setCurrentProblemIndex(newIndex);
  };

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
    // Extract current problem and its code
    const currentProblem = problemStates[currentProblemIndex];
    const currentCode = currentProblem.code;

    // Send POST request to the backend with the current code
    axios
      .post("http://localhost:80/python", { code: currentCode })
      .then((response) => {
        // Clone problemStates to avoid direct state mutation
        let updatedProblemStates = [...problemStates];

        // Clone the current problem from the updated state
        let updatedProblem = { ...currentProblem };

        // Extract result from the response and parse it
        let executionResult = JSON.parse(response.data.passOrFail);

        // Update the result of the active test case
        updatedProblem.results[updatedProblem.activeCase] = executionResult;

        // Check if the output matches the expected output
        let expectedOutput =
          updatedProblem.problem.testCases[updatedProblem.activeCase - 1]
            .expectedOutput;
        let isTestCasePassed =
          executionResult.toString() === expectedOutput.toString();

        // Update the test case's pass status
        updatedProblem.isCorrect[updatedProblem.activeCase - 1] =
          isTestCasePassed;

        // If all test cases have passed, the problem is complete
        if (
          updatedProblem.isCorrect.every((testCaseResult) => testCaseResult)
        ) {
          updatedProblem.isComplete = true;

          // Display modal if the problem is complete
          setModalVisible(true);
        }

        // Replace the current problem in the state with the updated problem
        updatedProblemStates[currentProblemIndex] = updatedProblem;

        // Update the state
        setProblemStates(updatedProblemStates);
      })
      .catch((error) => console.error("Error processing Python code:", error));
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const currentProblemState = problemStates[currentProblemIndex];

  return (
    <div className="App h-screen dark:bg-dark-primary">
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize="30%" maxSize="70%">
          <div className="h-full dark:bg-dark-secondary p-6 overflow-auto border-r-4 border-black ">
            <Tabs changeTab={changeTab} completedProblems={completedProblems} />
            {modalVisible && <Modal onClose={onClose} />}
            <ProblemStatement
              title={currentProblemState?.problem?.title}
              description={currentProblemState?.problem?.description}
              examples={currentProblemState?.problem?.examples}
              constraints={currentProblemState?.problem?.constraints}
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
                onCodeChange={(newCode) => {
                  let updatedProblemStates = [...problemStates];
                  updatedProblemStates[currentProblemIndex].code = newCode;
                  setProblemStates(updatedProblemStates);
                }}
                code={currentProblemState?.code}
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
                    activeCase={currentProblemState?.activeCase}
                    onSelectCase={(newActiveCase) => {
                      let updatedProblemStates = [...problemStates];
                      updatedProblemStates[currentProblemIndex].activeCase =
                        newActiveCase;
                      setProblemStates(updatedProblemStates);
                    }}
                    results={currentProblemState?.results}
                    testCases={currentProblemState?.problem?.testCases}
                    isCorrect={currentProblemState?.isCorrect}
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
