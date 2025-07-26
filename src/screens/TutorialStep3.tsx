import React, { useEffect, useRef } from 'react';
import PageHeading from '../components/PageHeading';
import KeyboardGrid from '../components/KeyboardGrid';
import { useNavigate } from 'react-router-dom';

const Gestures: React.FC = () => {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const handleExit = () => {
    // Handle tutorial exit (e.g., navigate to home or show a modal)
    navigate("/"); // Adjust the path as needed
    // console.log("Tutorial exited");
  };
    
  const handleContinue = () => {
    navigate("/practice"); // Navigate to the next tutorial step
  };

  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title="Step 3: Gestures" onExit={handleExit} focusRef={headingRef}/>
        <p style={{ maxWidth: "400px", margin: "3rem auto", lineHeight: "1.5"}}>
        The keyboard region has just one cell (J,K,L,M) for you to practice the gestures. With a screen reader, double tap and hold to select the cell. After a slight haptic feedback, move your finger up, down, left, or right, then release to enter the character. The 'Continue' button will be enabled once you swipe in all 4 directions, with focus shifting to it automatically.
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGrid variant="singleCell" content="multiple" doesTap={false} onClickContinue={handleContinue} taskWord="None" taskID={-1}/>
    </div>
    </div>
  );
};

export default Gestures;