import React from 'react';
import { useNavigate } from 'react-router-dom';

const DailyTasksDone: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div  style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Good job!</h2>
      <p>You finished today's tasks! Come back tomorrow for the next tasks!</p>
      <div className='btn-grp'>
          <button className='primary-btn' onClick={() => navigate('/')}>Go back to home</button>
          <button className='secondary-btn' onClick={() => navigate('/tutorial-1')}>Follow Tutorial</button>
        </div>
    </div>
  );
};

export default DailyTasksDone;