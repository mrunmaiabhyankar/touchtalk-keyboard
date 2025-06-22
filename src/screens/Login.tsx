import React, { useState } from 'react';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the magic link to the user's email
    setSubmitted(true);
  };

  return (
    <div className="page-container">
      <div className="top-section">
        <h1>TouchTalk</h1>
        <p className="description">
          The 3×3 keyboard layout is arranged in a simple 3×3 grid, with each cell containing 3 or 4 letters.
          You can access the letters through swiping gestures. Let's learn how to use the keyboard.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ padding: 8, fontSize: 16 }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: 8, fontSize: 16 }}
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