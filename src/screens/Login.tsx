import React, { useEffect, useRef, useState } from 'react';
import { completeLogin, loginWithEmail, registerWithEmail, sendLoginLink } from '../services/authService';

import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
      localStorage.setItem("userEmail", user.email || "");
      localStorage.setItem("userUid", user.uid || "");
      navigate("/");
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userUid");
      navigate("/login");
    }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
        await loginWithEmail(email, password);
      // window.location.href = "/touchtalk-keyboard"; // or use navigate from react-router
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    document.title = "Login | TouchTalk";
  }, []);

  useEffect(() => {
    const finishLogin = async () => {
      try {
        const user = await completeLogin();
        // console.log("User after login:", user);
        // If user is null, it means login was not successful
        if (!user) {
          // console.error("Login failed. User is null.");
          return;
        }
        if (user) {
          navigate("/");
        }
      } catch (err) {
        console.error("Login error:", err);
      }
    };

    finishLogin();

  }, [navigate]);

  return (
    <div className="page-container">
      <div style={{ maxWidth: '24rem', margin: '0 auto', padding: '2rem', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <h1 ref={headingRef}>{"Login"}</h1>
        <p className="description">
          Enter email and password to login.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: 8, fontSize: 16, maxWidth: '24rem', marginBottom: 8 }}
          />
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ padding: 8, fontSize: 16, maxWidth: '24rem', marginBottom: 8 }}
        />
          <button
            type="submit"
            className="start-button"
            style={{ marginTop: 12 }}
            disabled={submitted}
          >
            Login
          </button>
          <button type="button" onClick={() => navigate("/register")}>
          Switch to Register
        </button>
        </form>
      </div>
    </div>
  );
};

export default Login;