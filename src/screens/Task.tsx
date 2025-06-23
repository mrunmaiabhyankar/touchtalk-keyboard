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
        <PageHeading title="Day 1 Task 1" onExit={handleExit} />
        <p className='phrase-text'>
        Be You
        </p>
      </div>
      <div className="grid-section">
      <KeyboardGrid variant="default" content="multiple" doesTap={true} nextPageLink="/" taskWord="VIBE" />
    </div>
    </div>
  );
};

export default Task;