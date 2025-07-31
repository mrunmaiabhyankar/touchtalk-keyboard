import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeading from '../components/PageHeading';
import { X } from 'lucide-react';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  return (
    <div>
       <div  className="page-heading">
      
      <h1 ref={headingRef} className="page-title" tabIndex={0}>Thank you</h1>
      <button className="nav-btn" aria-label="Exit" onClick={() => navigate('/')}>
        <X size={28} />
      </button>
    </div>
      {/* <h2>Thank you!</h2> */}
      <div style={{ textAlign: 'center', padding: '2rem', alignContent: 'center', height: '40vh', gap:'2rem' }}>
        <p>You've completed all your tasks for the study. Well done! Please wait for the email from us for scheduling the final session about your experience!</p>
        <button className='primary-btn' onClick={() => navigate('/bonus-task')}>
          Open during the final session
        </button>
      </div>
      
    </div>
  );
};

export default ThankYou;