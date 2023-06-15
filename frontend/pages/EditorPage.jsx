import React, { useState, useEffect } from "react";
import Editor from "../components/EditorPageComponents/Editor";
import TestCaseSelector from "../components/EditorPageComponents/TestCaseSelector";
import ProblemStatement from "../components/EditorPageComponents/ProblemStatement";
import Modal from "../components/EditorPageComponents/CompleteModal"
import problems from "../problems.json";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import axios from "axios";

const EditorPage = () => {
  const [sizes, setSizes] = useState(["40%", "60%"]);
  const [innerSizes, setInnerSizes] = useState(["90%", "10%"]);
  const [isPaneUp, setIsPaneUp] = useState(false);
  const [problem, setProblem] = useState(problems[0]);
  const [activeCase, setActiveCase] = useState(1);
  const [code, setCode] = useState('print("Hello World")');
  const [results, setResults] = useState({ 1: "NULL", 2: "NULL", 3: "NULL" });
  const [isCorrect, setIsCorrect] = useState([null, null, null]);
  const [isComplete, setIsComplete] = useState(false)

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
      .post("http://localhost:80/python", { code })
      .then((response) => {

        //udpates Output in Console
        setResults((prevResults) => ({
          ...prevResults,
          [activeCase]: response.data.passOrFail,
        }));

        //Updates isCorrect and changes CaseButton colors
        let resultArray = JSON.parse(response.data.passOrFail);
        let isTestCasePassed =
          resultArray.toString() ==
          problem.testCases[activeCase - 1].expectedOutput.toString();
        let newCorrect = [...isCorrect];
        newCorrect[activeCase - 1] = isTestCasePassed;
        setIsCorrect(newCorrect);

        //checks end-condition of the problem 
        if (newCorrect.every((value) => value === true)) {
          setIsComplete(true)
        }
      })
      .catch((error) => console.error(error));
  };

const onClose = () =>{
  setIsComplete(!isComplete)
}
  return (
    <div className="App h-screen dark:bg-dark-primary">
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize="30%" maxSize="70%">
          <div className="h-full dark:bg-dark-secondary p-6 overflow-auto border-r-4 border-black ">
            {isComplete && <Modal onClose={onClose}/>}
            <ProblemStatement
              title={problem.title}
              description={problem.description}
              examples={problem.examples}
              constraints={problem.constraints}
              followUp={problem.followUp}
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
                    className="p-2 rounded text-white bg-green-500 mt-[-25px] hover:bg-green-700 hover:text-slate-400"
                    onClick={codeSubmit}
                  >
                    Submit{" "}
                  </button>
                </div>
                {isPaneUp && (
                  <TestCaseSelector
                    activeCase={activeCase}
                    onSelectCase={setActiveCase}
                    results={results}
                    testCases={problem.testCases}
                    isCorrect={isCorrect}
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
