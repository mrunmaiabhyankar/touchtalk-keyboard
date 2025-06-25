import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { completeLogin, sendLoginLink } from '../services/authService';
import { createOrUpdateUser } from '../services/userService';


const Home: React.FC = () => {
  const user = getAuth().currentUser;
  const navigate = useNavigate();
  useEffect(() => {
    const checkLogin = async () => {
      const user = await completeLogin(); // your function
      if (user) {
        await createOrUpdateUser(user.uid, user.email);
        navigate('/home'); // or wherever the user should go
      }
      else{
        console.log("No user is currently signed in.");
        navigate("/login"); // Redirect to login if no user is signed in
      }
    };
    // checkLogin();
  }, []);
  if (user) {
      console.log("User:", user.email);
    } else {
      console.log("No user is currently signed in.");
      navigate("/login"); // Redirect to login if no user is signed in
    }
  return (
    <div className="page-container">
      <div className='top-section' style={{ textAlign: 'center', padding: '2rem', height: '100vh' }}>
        <h1>TouchTalk</h1>
        <p>
          The 3×3 keyboard layout is arranged in a simple 3×3 grid, with each cell containing 3 or 4 letters.
          You can access the letters through swiping gestures. Let's learn how to use the keyboard.
        </p>
        <div className='btn-grp'>
          <button className='primary-btn' onClick={() => navigate('/task')}>Today's task</button>
          <button className='secondary-btn' onClick={() => navigate('/tutorial-1')}>Tutorial</button>
        </div>
        
      </div>
    </div>
  );
};

export default Home;