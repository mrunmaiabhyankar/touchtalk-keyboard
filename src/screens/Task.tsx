import React from 'react';
import PageHeading from '../components/PageHeading';
import KeyboardGrid from '../components/KeyboardGrid';

const Task: React.FC = () => {
  const handleExit = () => {
    // Handle tutorial exit (e.g., navigate to home or show a modal)
    console.log("Task exited");
  };
  return (
    <div className="page-container">
      <div className="top-section">
        <PageHeading title="Day 1 Task 3" onExit={handleExit} />
        <p className='phrase-text'>
        Be You
        </p>
      </div>
      <KeyboardGrid variant="default" content="multiple" doesTap={true} nextPageLink="/" taskWord="VIBE" />
    </div>
  
  );
};

export default Task;