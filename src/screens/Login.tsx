import React, { useEffect, useState } from 'react';
import { completeLogin, sendLoginLink } from '../services/authService';

import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendLoginLink(email);
    setSubmitted(true);
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
          navigate("/home");
        }
      } catch (err) {
        console.error("Login error:", err);
      }
    };

    finishLogin();

  }, [navigate]);

  return (
    <div className="page-container">
      <div className="top-section">
        <h1>Looks like you're logged out!</h1>
        <p className="description">
          Enter your name and email to receive a magic link to log in!
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ padding: 8, fontSize: 16, maxWidth: '24rem', marginBottom: 8 }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: 8, fontSize: 16, maxWidth: '24rem', marginBottom: 8 }}
          />
          <button
            type="submit"
            className="start-button"
            style={{ marginTop: 12 }}
            disabled={submitted}
          >
            {submitted ? "Magic Link Sent!" : "Send Magic Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;