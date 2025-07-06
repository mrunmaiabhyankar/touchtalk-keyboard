import React from 'react';
import PageHeading from '../components/PageHeading';
import KeyboardGrid from '../components/KeyboardGrid';
import { useNavigate } from 'react-router-dom';

const Gestures: React.FC = () => {
  const navigate = useNavigate();
  const handleExit = () => {
    // Handle tutorial exit (e.g., navigate to home or show a modal)
    navigate("/home"); // Adjust the path as needed
    // console.log("Tutorial exited");
  };
  const handleContinue = () => {
    navigate("/practice"); // Navigate to the next tutorial step
  };

  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title="Step 3: Gestures" onExit={handleExit} />
        <p style={{ maxWidth: "400px", margin: "3rem auto", lineHeight: "1.5"}}>
        The keyboard is a 3x3 grid, navigated left to right, top to bottom.
        Swiping right moves through the cells: 1–3 in the first row, 4–6 in the second,
        and 7–9 in the third. Double-tap each cell to learn its position.
        The 'Continue' button appears once all cells are pressed, with focus shifting to it automatically.
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGrid variant="singleCell" content="multiple" doesTap={true} onClickContinue={handleContinue} taskWord="VIBE" />
    </div>
    </div>
  );
};

export default Gestures;