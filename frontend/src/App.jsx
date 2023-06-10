import React from "react";
import "./index.css";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";

function App() {
  const options = {
    theme: "dracula",
    mode: "jsx",
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="absolute top-20 bottom-40 left-20 right-20 text-left">
          <div>Create a function to add two numbers.</div>
          <CodeMirror options={options} />
        </div>
      </header>
    </div>
  );
}

export default App;
