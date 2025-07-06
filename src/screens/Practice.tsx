import React, { useEffect } from 'react';
import PageHeading from '../components/PageHeading';
import KeyboardGrid from '../components/KeyboardGrid';
import { useNavigate } from 'react-router-dom';

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const handleExit = () => {
    // Handle tutorial exit (e.g., navigate to home or show a modal)
    navigate("/tutorial-done"); // Navigate to the next tutorial step
    // console.log("Tutorial exited");
  };

  const handleContinue = () => {
    // Logic to handle the continue action
    navigate("/tutorial-done"); // Navigate to the next tutorial step
  };

  useEffect(() => {
    document.title = "Practice | TouchTalk";
  }, []);

  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title="Let's practice" onExit={handleExit} />
        <p style={{ maxWidth: "400px", margin: "3rem auto", lineHeight: "1.5"}}>
        Type the sentence 'Hi there' using the layout you've learned. Use the space key to separate words and the delete key to correct mistakes. The 'Continue' button will appear next to the text box once you're ready to proceed.
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGrid variant="default" content="multiple" doesTap={true} onClickContinue={handleContinue} taskWord="VIBE" />
    </div>
    </div>
  );
};

export default Practice;