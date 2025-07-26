import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { markSessionComplete } from '../services/taskService';
import { getAuth } from 'firebase/auth';

const DailyTasksDone: React.FC = () => {
  const navigate = useNavigate();
  const user = getAuth().currentUser;
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      if (headingRef.current) {
        setTimeout(() => {
          headingRef.current?.focus();
        }, 100);
      }
    }, []);
  return (
    <div  style={{ textAlign: 'center', padding: '2rem', alignContent: 'center', height: '100vh' }}>
      <h1 ref={headingRef}>Good job!</h1>
      <p>You finished today's tasks! Come back tomorrow for the next tasks!</p>
      {/* <h2> What did you think about today's tasks?</h2> */}
      {/* <p>mic button will be here</p> */}
      <div className='btn-grp'>
          <button className='primary-btn' onClick={() => navigate('/')}>Go back to home</button>
          <button className='secondary-btn' onClick={() => navigate('/tutorial-1')}>Follow Tutorial</button>
        </div>
    </div>
  );
};

export default DailyTasksDone;