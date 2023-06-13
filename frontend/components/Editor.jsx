import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import "@uiw/codemirror-theme-sublime";
import { aura } from "@uiw/codemirror-theme-aura";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { python } from '@codemirror/lang-python';
import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';
import "../src/index.css";

const Editor = () => {
  // <-- access these props
  return (
    <CodeMirror
      value="print('hello world!');"
      height="400px"
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
    />
  );
};

export default Editor;
