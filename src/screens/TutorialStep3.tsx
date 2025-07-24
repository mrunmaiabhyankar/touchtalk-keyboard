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
        <PageHeading title="Step 3: Gestures" onExit={handleExit} ref={headingRef}/>
        <p style={{ maxWidth: "400px", margin: "3rem auto", lineHeight: "1.5"}}>
        With a screen reader, double tap and hold to select the cell. After a slight haptic feedback, move your finger up, down, left, or right, then release to enter the character. Type all four directions to continue.
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGrid variant="singleCell" content="multiple" doesTap={false} onClickContinue={handleContinue} taskWord="None" taskID={-1}/>
    </div>
    </div>
  );
};

export default Gestures;