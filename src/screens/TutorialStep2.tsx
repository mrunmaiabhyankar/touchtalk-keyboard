import React, { useEffect, useRef } from 'react';
import KeyboardGrid from "../components/KeyboardGrid"
import PageHeading from "../components/PageHeading"
import { useNavigate } from 'react-router-dom';

const Keyboard: React.FC = () => {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
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
      <div ref={headingRef} className="top-section">
        <PageHeading title="Step 2: Letter Placement" onExit={handleExit} />
        <p style={{ maxWidth: "400px", margin: "3rem auto", lineHeight: "1.5"}}>
        Double tap each cell to explore the letter layout. The middle row has 4 letters, while the top and bottom rows have 3 each. The bottom-right cell contains backspace and space. The 'Continue' button will appear once all cells are pressed, with focus shifting to it automatically.
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGrid variant="gridLayout" content="multiple" doesTap={true} onClickContinue={handleContinue} taskWord="VIBE" />
    </div>
    </div>
  );
};

export default Keyboard;