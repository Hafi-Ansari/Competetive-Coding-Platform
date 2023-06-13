import React, { useState, useEffect } from "react";
import Editor from "../components/Editor";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';

const EditorPage = () => {
  const [sizes, setSizes] = useState(['40%', '60%']);
  const [innerSizes, setInnerSizes] = useState(['70%', '30%']);
  const [code, setCode] = useState('Enter code here...')

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    // Add event listeners to stop propagation of drag events
    window.addEventListener('dragstart', stopPropagation);
    window.addEventListener('dragend', stopPropagation);

    return () => {
      // Remove event listeners when the component unmounts
      window.removeEventListener('dragstart', stopPropagation);
      window.removeEventListener('dragend', stopPropagation);
    };
  }, []);

  const codeSubmit = () =>{
    console.log(code)
  }


  return (
    <div className="App h-screen dark:bg-dark-primary">
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
      >
        <Pane minSize="30%" maxSize="70%">
          <div className="h-full dark:bg-dark-secondary p-6 overflow-auto border-r-4 border-black">
            <h2 className="text-2xl mb-4 text-white font-bold">1. Two Sum Problem</h2>
            <p className="text-white mb-4">Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>
            <p className="text-white mb-4">You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
            <p className="text-white mb-4">You can return the answer in any order.</p>
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
              <Editor className="border-b-4 border-black" onCodeChange={setCode}/> 
            </Pane>
            <Pane minSize="20%" maxSize="80%">
              <div className="h-full bg-dark-secondary p-6 border-t-4 border-black">
                <div className="flex justify-between items-center">
                  <h2 className="mb-4 text-white font-bold">Console</h2>
                  <button className="px-2 py-2 rounded text-white bg-dark-accent" onClick={codeSubmit}>Submit</button>
                </div>
              </div>
            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    </div>
  );
};

export default EditorPage;
