import React, { useEffect, useState } from 'react';
import PageHeading from '../components/PageHeading';
import KeyboardGrid from '../components/KeyboardGrid';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { fetchTaskPhrasesByDay, getUserCurrentDay, markSessionComplete } from '../services/taskService';
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
  const [completedTasks, setCompletedTasks] = useState(0);
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState<string>('');
  const [taskID, setTaskID] = useState<number>(0);
  // var pageTitle = `Loading Task...`;
  const [userDay, setUserDay] = useState<number>(1);
  useEffect(() => {
  const fetchTasks = async () => {
    setLoading(true);
    const day = await getUserCurrentDay(user?.uid || ''); // fetch the user's current day
    console.log("User's current day:", day);
    if (day !== null) {
      setUserDay(day); 
      await loadTasks(day); // fetch tasks using the day
      // console.log("Tasks loaded for day", day, ":", tasks);
      
    }
    setLoading(false);
  };

  if (tasks.length === 0) {
    fetchTasks();
  }
}, []);

useEffect(() => {
  if (tasks.length > 0) {
    console.log("Tasks updated:", tasks);
    // setCompletedTasks(0);
    console.log("Tasks loaded for day - this is the latesttttttttttt:", tasks.length);
    console.log("Phrase ID for current task:", tasks[currentIndex].phraseId);
    setPageTitle(`Day ${userDay} Task ${completedTasks+1}`);
  }
}, [tasks]);

useEffect(() => {
  if (!loading && tasks.length === 0) {
    markSessionComplete(user?.uid || ''); // Mark the session as complete for the user
    navigate("/tasks-done");
  }
}, [tasks, loading]);

  const handleContinue = () => {
    popTask();
    setCompletedTasks(prev => prev + 1);
    navigate("/task"); // reload same page with new task
  };

  useEffect(() => {
      document.title = `Day ${userDay} Task ${completedTasks + 1} | TouchTalk`;
    }, [userDay, completedTasks]);

  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title={pageTitle} onExit={handleExit} />
        <p className='phrase-text'>
        {tasks.length > 0 ? tasks[currentIndex].phrase : "Loading task..."}
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGrid 
      key={0}     
      variant="default" content="multiple" doesTap={true} onClickContinue={handleContinue} taskID={tasks[currentIndex]?.phraseId || 0} taskWord={tasks[currentIndex]?.phrase || "this is sample"} />
    </div>
    </div>
  );
};

export default Task;