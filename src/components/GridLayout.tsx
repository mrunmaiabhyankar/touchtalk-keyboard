import React from "react"
import KeyboardGrid from "./KeyboardGrid"

const GridLayout: React.FC = () => {
  return (
    <div>
      <h2>Step 1: Cell placement</h2>
      <p style={{ maxWidth: "400px", margin: "1rem auto", lineHeight: "1.5" }}>
        The keyboard is a 3x3 grid, navigated left to right, top to bottom.
        Swiping right moves through the cells: 1–3 in the first row, 4–6 in the second,
        and 7–9 in the third. Double-tap each cell to learn its position.
        The 'Continue' button appears once all cells are pressed, with focus shifting to it automatically.
      </p>

      <KeyboardGrid variant="gridLayout" content="single" doesTap={true} nextPageLink="/task1" taskWord="VIBE" />
    </div>
  )
}

export default GridLayout
