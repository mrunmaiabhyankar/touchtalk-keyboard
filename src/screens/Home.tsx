import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSessionAlreadyComplete } from '../services/taskService';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const [nextPageLink, setNextPageLink] = React.useState<string>('/');
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        console.log("User still signed in:", user.email);
        // Store email if needed for GA or elsewhere
        localStorage.setItem("userEmail", user.email || "");
        localStorage.setItem("userUid", user.uid || "");
      } else {
        console.log("User is not signed in");
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  useEffect(() => {
  const checkIfTasksNeeded = async () => {
    const uid = localStorage.getItem("userUid");
    const alreadyCompleted = await isSessionAlreadyComplete(uid || '');
    console.log("Already completed today's tasks:", alreadyCompleted);
    if (alreadyCompleted) {
      // They've already done today's task → maybe redirect or show a message
      // navigate("/tasks-done");
      setNextPageLink("/tasks-done");

    } else {
      // navigate("/task");
      setNextPageLink("/task");
    }
  };

  checkIfTasksNeeded();
}, []);

  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', padding: '2rem', alignContent: 'center', height: '100vh'  }}>
        <h1>TouchTalk</h1>
        <p>
          The 3×3 keyboard layout is arranged in a simple 3×3 grid, with each cell containing 3 or 4 letters.
          You can access the letters through swiping gestures. Let's learn how to use the keyboard.
        </p>
        <div className='btn-grp'>
          <button className='primary-btn' onClick={() => navigate(nextPageLink)}>Today's task</button>
          <button className='secondary-btn' onClick={() => navigate('/tutorial-1')}>Tutorial</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
