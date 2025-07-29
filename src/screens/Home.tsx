import { getAuth } from 'firebase/auth';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserCurrentDay, isSessionAlreadyComplete } from '../services/taskService';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { initializeUserAnalytics } from '../utils/analyticsFunctions';
import { logout } from '../services/authService';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLDivElement | null>(null);
  
  const [nextPageLink, setNextPageLink] = React.useState<string>('/');
  
  useEffect(() => {
    if (headingRef.current) {
      setTimeout(() => {
        headingRef.current?.focus();
      }, 100);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
      localStorage.setItem("userEmail", user.email || "");
      localStorage.setItem("userUid", user.uid || "");
      
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userUid");
      navigate("/login");
    }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  useEffect(() => {
  const checkIfTasksNeeded = async () => {
    const uid = localStorage.getItem("userUid") || '';
    const alreadyCompleted = await isSessionAlreadyComplete(uid);
    console.log("User ID:", uid);
    console.log("Already completed today's tasks:", alreadyCompleted);
    if (alreadyCompleted === "true") {
      // They've already done today's task → maybe redirect or show a message
      // navigate("/tasks-done");
      setNextPageLink("/tasks-done");

    } else if (alreadyCompleted === "false")   {
      // navigate("/task");
      setNextPageLink("/task");
    } else if (alreadyCompleted === "login") {
      // User is not logged in or session is not complete
      navigate("/login");
    } else if (alreadyCompleted === "bonus") {
      // User has completed more than 5 sessions, redirect to bonus task
      setNextPageLink("/thank-you");
    }
  };

  checkIfTasksNeeded();
}, []);

  useEffect(() => {
    document.title = "Home | TouchTalk";
  }, []);

  // throw new Error("Test error for boundary");

  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', padding: '2rem', alignContent: 'center', height: '100vh'  }}>
        <h1 ref={headingRef}>TouchTalk</h1>
        <p>
          Hi! Welcome to the Touchtalk accessibility study. The keyboard is arranged in a simple 3×3 grid, with each cell containing 3 or 4 letters.
          You can access the letters through swiping gestures. You can complete today's task or follow the tutorial to understand how it works!
        </p>
        <div className='btn-grp'>
          <button className='primary-btn' onClick={() => navigate(nextPageLink)}>Today's task</button>
          <button className='secondary-btn' onClick={() => navigate('/tutorial-1')}>Tutorial</button>
          <button className='secondary-btn' onClick={() => logout()}>Logout</button>
        </div>
        <p>Version v1.26</p>
      </div>
    </div>
  );
};

export default Home;
