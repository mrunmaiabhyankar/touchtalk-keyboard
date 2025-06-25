import React from 'react';
import { useNavigate } from 'react-router-dom';

const TutorialDone: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Tutorial Done!</h2>
      <p>Good job on completing the tutorial. Click on the 'Start Today's Tasks' button whenever you are ready!</p>
      <button onClick={() => navigate('/task')}>Start Today's Tasks</button>
    </div>
  );
};

export default TutorialDone;