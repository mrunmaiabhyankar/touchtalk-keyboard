import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSessionAlreadyComplete } from '../services/taskService';

const TutorialDone: React.FC = () => {
  const navigate = useNavigate();
  const [nextPageLink, setNextPageLink] = React.useState<string>('/');

  useEffect(() => {
    const checkIfTasksNeeded = async () => {
      const uid = localStorage.getItem("userUid");
      const alreadyCompleted = await isSessionAlreadyComplete(uid || '');
      // console.log("Already completed today's tasks:", alreadyCompleted);
      if (alreadyCompleted) {
        // They've already done today's task → maybe redirect or show a message
        // navigate("/tasks-done");
        setNextPageLink("/tasks-done");
  
      } else {
        // navigate("/task");
        setNextPageLink("/task");
      }
    };
  
    checkIfTasksNeeded();
  }, []);
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Tutorial Done!</h2>
      <p>Good job on completing the tutorial. Click on the 'Start Today's Tasks' button whenever you are ready!</p>
      <button onClick={() => navigate(nextPageLink)}>Start Today's Tasks</button>
    </div>
  );
};

export default TutorialDone;