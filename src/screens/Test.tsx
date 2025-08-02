import React, { useEffect, useRef } from 'react';
import PageHeading from '../components/PageHeading';
import KeyboardGrid from '../components/KeyboardGrid';
import { useNavigate } from 'react-router-dom';
import KeyboardGridTest from '../components/KeyboardGrid-Test';

const Test: React.FC = () => {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  const handleExit = () => {
    // Handle tutorial exit (e.g., navigate to home or show a modal)
    navigate("/"); // Navigate to the next tutorial step
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
        <PageHeading title="Let's practice" onExit={handleExit} focusRef={headingRef}/>
        <p style={{ maxWidth: "400px", margin: "3rem auto", lineHeight: "1.5"}}>
        For internal testing: Type "Testing testing testing"
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGridTest variant="default" content="multiple" doesTap={false} onClickContinue={handleContinue} taskWord="TEST" />
    </div>
    </div>
  );
};

export default Test;