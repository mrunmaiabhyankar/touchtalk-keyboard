import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouFinal: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ textAlign: 'center', padding: '3rem', alignContent: 'center', height: '80vh' }}>
      <h2>Thank you so much for participating in this study. We appreciate your time!</h2>
    </div>
  );
};

export default ThankYouFinal;