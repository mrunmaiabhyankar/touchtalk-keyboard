import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouFinal: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h2>Thank you so much fir participating in this study. We appreciate your time!</h2>
    </div>
  );
};

export default ThankYouFinal;