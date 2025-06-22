import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <div className='top-section'>
        <h1>TouchTalk</h1>
        <p>
          The 3×3 keyboard layout is arranged in a simple 3×3 grid, with each cell containing 3 or 4 letters.
          You can access the letters through swiping gestures. Let's learn how to use the keyboard.
        </p>
        <button onClick={() => navigate('/tutorial-1')}>Start Tutorial</button>
      </div>
    </div>
  );
};

export default Home;