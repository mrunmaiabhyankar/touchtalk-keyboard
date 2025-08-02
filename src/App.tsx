import React, { useEffect } from "react"
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
import DailyTasksDone from "./screens/DailyTasksDone";
import { TaskProvider } from "./screens/TaskContext";
import ErrorFallback from "./screens/ErrorScreen";
import { ErrorBoundary } from "react-error-boundary";
import Register from "./screens/Register";
import BonusTask from "./screens/Bonus-Task";
import ThankYouFinal from "./screens/ThankYou-Final";
import BonusTaskQ from "./screens/Bonus-Task-Q";
import Test from "./screens/Test";

const App: React.FC = () => {

  useEffect(() => {
  const setAppHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };

  setAppHeight();
  window.addEventListener('resize', setAppHeight);

  return () => window.removeEventListener('resize', setAppHeight);
}, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <Routes>
        <Route path="/tutorial-1" element={<GridLayout />} />
        <Route path="/tutorial-3" element={<Gestures />} />
        <Route path="/tutorial-2" element={<Keyboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tutorial-done" element={<TutorialDone />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/bonus-task" element={<TaskProvider><BonusTask /></TaskProvider>} />
        <Route path="/bonus-qwerty" element={<TaskProvider><BonusTaskQ /></TaskProvider>} />
        <Route path="/thank-you-final" element={<ThankYouFinal />} />
        <Route path="/tasks-done" element={<DailyTasksDone />} />
        <Route path="/" element={<Home/>} />
        <Route path="/task" element={<TaskProvider><Task1 /></TaskProvider>} />
        {/* Redirect or catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App