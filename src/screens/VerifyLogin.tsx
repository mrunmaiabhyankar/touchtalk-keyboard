import { useEffect } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig'; // Adjust the path as needed to your firebase config

const VerifyLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const email = window.localStorage.getItem('emailForSignIn');

    if (isSignInWithEmailLink(auth, url) && email) {
      signInWithEmailLink(auth, email, url)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
          navigate('/home'); // or next screen
        })
        .catch((error) => {
          console.error('Login failed:', error);
        });
    }
  }, [navigate]);

  return <p>Verifying login…</p>;
};

export default VerifyLogin;
