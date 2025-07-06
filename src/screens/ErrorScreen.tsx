import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8f8f8'
        }}>
            <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
            <p style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Page Not Found</p>
            <button
                onClick={handleGoHome}
                style={{
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    borderRadius: '4px',
                    border: 'none',
                    background: '#007bff',
                    color: '#fff',
                    cursor: 'pointer'
                }}
            >
                Go to Home
            </button>
        </div>
    );
};

export default ErrorScreen;