import React, { useEffect, useState } from 'react';
import PageHeading from '../components/PageHeading';
import KeyboardGrid from '../components/KeyboardGrid';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { fetchTaskPhrasesByDay, getUserCurrentDay } from '../services/taskService';
import { useTask } from './TaskContext';


const Task: React.FC = () => {
  const user = getAuth().currentUser;
  const handleExit = () => {
    // Handle tutorial exit (e.g., navigate to home or show a modal)
    navigate("/home"); // Adjust the path as needed
    
    console.log("Task exited");
  };

  const { tasks, loadTasks, popTask } = useTask();
  // const [tasks, setTasks] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const pageTitle = "Day 1 Task ${}";
  // const userDay = getUserCurrentDay(user?.uid || '');
  const userDay = 4;
  useEffect(() => {
  if (tasks.length === 0) {
    setLoading(true);
    loadTasks(userDay).finally(() => setLoading(false));
  } else {
    setLoading(false);
  }
}, []);

useEffect(() => {
  if (!loading && tasks.length === 0) {
    navigate("/tasks-done");
  }
}, [tasks, loading]);

  const handleContinue = () => {
    popTask();
    navigate("/task"); // reload same page with new task
  };

  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title={pageTitle} onExit={handleExit} />
        <p className='phrase-text'>
        {tasks.length > 0 ? tasks[currentIndex] : "Loading..."}
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGrid variant="default" content="multiple" doesTap={true} onClickContinue={handleContinue} taskWord="VIBE" />
    </div>
    </div>
  );
};

export default Task;