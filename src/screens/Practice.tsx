import React from 'react';
import PageHeading from '../components/PageHeading';
import KeyboardGrid from '../components/KeyboardGrid';

const Practice: React.FC = () => {
  const handleExit = () => {
    // Handle tutorial exit (e.g., navigate to home or show a modal)
    console.log("Tutorial exited");
  };
  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title="Let's practice" onExit={handleExit} />
        <p style={{ maxWidth: "400px", margin: "3rem auto", lineHeight: "1.5"}}>
        Type the sentence 'Hi there' using the layout you've learned. Use the space key to separate words and the delete key to correct mistakes. The 'Continue' button will appear next to the text box once you're ready to proceed.
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGrid variant="default" content="multiple" doesTap={true} nextPageLink="/tutorial-done" taskWord="VIBE" />
    </div>
    </div>
  );
};

export default Practice;