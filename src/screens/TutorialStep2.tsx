import React from 'react';
import KeyboardGrid from "../components/KeyboardGrid"
import PageHeading from "../components/PageHeading"

const Keyboard: React.FC = () => {
  const handleExit = () => {
    // Handle tutorial exit (e.g., navigate to home or show a modal)
    console.log("Tutorial exited");
  };
  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title="Step 2: Letter Placement" onExit={handleExit} />
        <p style={{ maxWidth: "400px", margin: "3rem auto", lineHeight: "1.5"}}>
        Double tap each cell to explore the letter layout. The middle row has 4 letters, while the top and bottom rows have 3 each. The bottom-right cell contains backspace and space. The 'Continue' button will appear once all cells are pressed, with focus shifting to it automatically.
        </p>
      </div>
      <KeyboardGrid variant="default" content="multiple" doesTap={true} nextPageLink="/tutorial-3" taskWord="VIBE" />
    </div>
  );
};

export default Keyboard;