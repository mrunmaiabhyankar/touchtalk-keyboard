import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h2>Thank you!</h2>
      <p>You've completed all your tasks for the study. Well done! Please wait for the email from us for scheduling the final session about your experience!</p>
      <button className='primary-btn' onClick={() => navigate('/bonus-task')}>
        Open during the final session
      </button>
    </div>
  );
};

export default ThankYou;