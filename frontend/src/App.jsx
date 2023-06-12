import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EditorPage from "../pages/EditorPage";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/editor" element={<EditorPage/>} />
          <Route path="/*" element={<Navigate to="/editor" replace />} />
        </Routes>
      </Router>
  );
};


export default App;