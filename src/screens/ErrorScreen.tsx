import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "5rem",
        textAlign: "center",
        // color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>Something went wrong 😞</h1>
      <p>{error.message}</p>

      <div className='btn-grp'>
          <button className='primary-btn' onClick={goHome}>Go back to homepage</button>
          <button className='secondary-btn' onClick={handleReload}>Reload page</button>
        </div>
      
    </div>
  );
};

export default ErrorFallback;
