import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom';
import GridLayout from "./screens/TutorialStep1"
import Login from "./screens/Login";
import Gestures from "./screens/TutorialStep3";
import Keyboard from "./screens/TutorialStep2";
import Practice from "./screens/Practice";
import Task1 from "./screens/Task";
import Home from "./screens/Home";
import TutorialDone from "./screens/TutorialDone";
import ThankYou from "./screens/ThankYou";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/tutorial-1" element={<GridLayout />} />
      <Route path="/tutorial-3" element={<Gestures />} />
      <Route path="/tutorial-2" element={<Keyboard />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tutorial-done" element={<TutorialDone />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/" element={<Home/>} />
      <Route path="/task" element={<Task1 />} />
      {/* Redirect or catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App