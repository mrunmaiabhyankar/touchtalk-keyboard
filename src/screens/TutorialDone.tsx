import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSessionAlreadyComplete } from '../services/taskService';

const TutorialDone: React.FC = () => {
  const navigate = useNavigate();
  // const [nextPageLink, setNextPageLink] = React.useState<string>('/');

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Tutorial Done!</h2>
      <p>Good job on completing the tutorial!</p>
      <button onClick={() => navigate('/')}>Go back to Home</button>
    </div>
  );
};

export default TutorialDone;