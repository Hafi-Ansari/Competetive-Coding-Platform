import React from 'react';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/ayu-mirage.css';
import CodeMirror from '@uiw/react-codemirror';
import '../src/index.css'

const Editor = () => {
  return (
    <CodeMirror
      options={{
        theme: 'ayu-mirage',
        keyMap: 'sublime',
        mode: 'default',
      }}
      className="w-96 h-80"
    />
  );
};

export default Editor;
