import React from "react";
import "codemirror/keymap/sublime";
import "codemirror/theme/ayu-mirage.css";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/mode/python/python";
import "../src/index.css";
import { useState } from "react";

const Editor = () => {
  const [code, setCode] = useState("Enter some code...");
  return (
    <CodeMirror
      options={{
        value: { code },
        theme: "ayu-mirage",
        keyMap: "sublime",
        mode: "python",
        scrollbarStyle: "null",
      }}
      onChange={(editor, change) => {
        setCode(editor.getValue());
        console.log(code)
      }}
      className="w-96 h-80"
    />
  );
};

export default Editor;
