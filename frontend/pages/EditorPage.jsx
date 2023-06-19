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
        problemStates[currentProblemIndex].isComplete;
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
    axios
      .post("http://localhost:80/python", {
        code: problemStates[currentProblemIndex].code,
      })
      .then((response) => {
        let updatedProblemStates = [...problemStates];
        let updatedProblemState = {
          ...updatedProblemStates[currentProblemIndex],
        };
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
          setModalVisible(true);
        }
        updatedProblemStates[currentProblemIndex] = updatedProblemState;
        setProblemStates(updatedProblemStates);
      })
      .catch((error) => console.error(error));
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
              title={currentProblemState.problem.title}
              description={currentProblemState.problem.description}
              examples={currentProblemState.problem.examples}
              constraints={currentProblemState.problem.constraints}
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
                    onSelectCase={(newActiveCase) => {
                      let updatedProblemStates = [...problemStates];
                      updatedProblemStates[currentProblemIndex].activeCase =
                        newActiveCase;
                      setProblemStates(updatedProblemStates);
                    }}
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
