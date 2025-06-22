import React from 'react';
import './Home.css'; // You’ll add styles separately here

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="title">TouchTalk</h1>
        <p className="description">
          The 3×3 keyboard layout is arranged in a simple 3×3 grid, with each cell containing 3 or 4 letters.
          You can access the letters through swiping gestures. Let's learn how to use the keyboard.
        </p>
        <button className="start-button">Start Tutorial</button>
      </div>
    </div>
  );
};

export default Home;