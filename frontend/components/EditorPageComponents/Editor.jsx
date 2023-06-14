import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import "@uiw/codemirror-theme-sublime";
import { aura } from "@uiw/codemirror-theme-aura";
import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';
import "../../src/index.css";

const Editor = ({ onCodeChange, code }) => {
  // <-- access these props
  return (
    <CodeMirror
      value={code}
      height="515px"
      theme={aura}
      extensions={
      [
        langs.python(),
        basicSetup({
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
        }),
      ]}
      onChange={onCodeChange}
    />
  );
};

export default Editor;
