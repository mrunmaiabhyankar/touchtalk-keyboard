import React, { useEffect, useRef, useState } from 'react';
import PageHeading from '../components/PageHeading';
import KeyboardGrid from '../components/KeyboardGrid';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { fetchTaskPhrasesByDay, getUserCurrentDay, markSessionComplete } from '../services/taskService';
import { useTask } from './TaskContext';
import { ArrowLeft } from 'lucide-react';


const BonusTaskQ: React.FC = () => {
  const user = getAuth().currentUser;
  const handleExit = () => {
    navigate("/"); // Adjust the path as needed
  };

  const { tasks, loadTasks, popTask } = useTask();
  // const [tasks, setTasks] = useState<string[]>([]);
  const [taskPhrase, setTaskPhrase] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState(0);
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState<string>('');
  const [taskID, setTaskID] = useState<number>(0);
  const [userDay, setUserDay] = useState<number>(1);
  const headingRef = useRef<HTMLHeadingElement>(null);

  
  useEffect(() => {
  const fetchTasks = async () => {
    setLoading(true);
    const day = 6; // fetch the user's current day
    if (day !== null) {
      setUserDay(day); 
      await loadTasks(day); // fetch tasks using the day
    }
    setLoading(false);
  };

  if (tasks.length === 0) {
    fetchTasks();
  }
}, []);

useEffect(() => {
  if (tasks.length > 0) {
    setPageTitle(`Day ${userDay} Task ${completedTasks+1}`);
  }
  
}, [tasks]);

useEffect(() => {
  if (!loading && tasks.length === 0) {
    // markSessionComplete(user?.uid || ''); // Mark the session as complete for the user
    navigate("/thank-you-final");
  }
}, [tasks, loading]);

  const handleContinue = () => {
    popTask();
    setCompletedTasks(prev => prev + 1);
    setTaskPhrase('');
    navigate("/bonus-qwerty"); // reload same page with new task
  };

  useEffect(() => {
      document.title = `Day ${userDay} Task ${completedTasks + 1} | TouchTalk`;
    }, [userDay, completedTasks]);

  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title={pageTitle} onExit={handleExit} focusRef={headingRef}/>
        <div className="phrase-wrapper">
          <p className="phrase-text">
          {tasks.length > 0 ? tasks[currentIndex].phrase : "Loading task..."}
          </p>
          <input
            placeholder="Enter task phrase"
            value={taskPhrase}
            onChange={(e) => setTaskPhrase(e.target.value)}
            required
            style={{ padding: '1rem', fontSize: 16, maxWidth: '24rem' }}
          />
          <button  className='primary-btn' onClick={handleContinue}>Continue</button>
        </div>
        <div style={{ display: 'flex', flex:'1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '2rem', height: '40vh', gap: '0.75em'}}>
          
        </div>
        {/* <p>Another paragraph which doesn't seem to be visible</p> */}
      </div>
      
      
    </div>
  );
};

export default BonusTaskQ;