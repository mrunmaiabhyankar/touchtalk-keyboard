import React, { useEffect, useRef } from "react"
import KeyboardGrid from "../components/KeyboardGrid"
import PageHeading from "../components/PageHeading"
import { useNavigate } from "react-router-dom";


const GridLayout: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const navigate = useNavigate();
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
    // console.log("Continue clicked");
    navigate("/tutorial-2"); // Navigate to the next tutorial step
  };
  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title="Step 1: Cell Placement" onExit={handleExit} />
        <p style={{ maxWidth: "360px", margin: "3rem auto", lineHeight: "1.5"}}>
        The keyboard is a 3x3 grid, navigated left to right, top to bottom.
        Swiping right moves through the cells: 1–3 in the first row, 4–6 in the second,
        and 7–9 in the third. Double-tap each cell to learn its position.
        The 'Continue' button appears once all cells are pressed, with focus shifting to it automatically.
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGrid variant="gridLayout" content="single" doesTap={true} onClickContinue={handleContinue} taskWord="none" taskID={-1} />
    </div>
    </div>
  )
}

export default GridLayout
