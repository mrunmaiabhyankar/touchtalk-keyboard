import React, { useEffect, useRef } from 'react';
import KeyboardGrid from "../components/KeyboardGrid"
import PageHeading from "../components/PageHeading"
import { useNavigate } from 'react-router-dom';

const Keyboard: React.FC = () => {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const handleExit = () => {
    // Handle tutorial exit (e.g., navigate to home or show a modal)
    navigate("/"); // Adjust the path as needed
    // console.log("Tutorial exited");
  };

  useEffect(() => {
      if (headingRef.current) {
        headingRef.current.focus();
      }
    }, []);

  const handleContinue = () => {
    navigate("/tutorial-3"); // Navigate to the next tutorial step
  };
  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title="Step 2: Letter Placement" onExit={handleExit} focusRef={headingRef}/>
        <p style={{ maxWidth: "400px", margin: "3rem auto", lineHeight: "1.5"}}>
        Double tap each cell to explore the letter layout. The middle row has 4 letters, while the top and bottom rows have 3 each, except the last cell, Cell 9. The bottom-right cell (Cell 9) contains only space and delete that can be accessed by swiping left and right respectively. The 'Continue' button will be enabled once all cells are pressed, with focus shifting to it automatically.
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGrid variant="gridLayout" content="multiple" doesTap={true} onClickContinue={handleContinue} taskWord="None" taskID={-1}/>
    </div>
    </div>
  );
};

export default Keyboard;