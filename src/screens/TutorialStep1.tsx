import React from "react"
import KeyboardGrid from "../components/KeyboardGrid"
import PageHeading from "../components/PageHeading"


const GridLayout: React.FC = () => {
  const handleExit = () => {
    // Handle tutorial exit (e.g., navigate to home or show a modal)
    console.log("Tutorial exited");
  };
  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title="Step 1: Cell Placement" onExit={handleExit} />
        <p style={{ maxWidth: "400px", margin: "3rem auto", lineHeight: "1.5"}}>
        The keyboard is a 3x3 grid, navigated left to right, top to bottom.
        Swiping right moves through the cells: 1–3 in the first row, 4–6 in the second,
        and 7–9 in the third. Double-tap each cell to learn its position.
        The 'Continue' button appears once all cells are pressed, with focus shifting to it automatically.
        </p>
      </div>
      <KeyboardGrid variant="default" content="single" doesTap={true} nextPageLink="/tutorial-2" taskWord="VIBE" />
    </div>
  )
}

export default GridLayout
