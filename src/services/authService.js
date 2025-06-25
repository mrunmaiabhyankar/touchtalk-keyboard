import { auth } from "../firebase/firebaseConfig";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { createOrUpdateUser } from '../services/userService';

const actionCodeSettings = {
  url: 'http://localhost:3000/login',
  handleCodeInApp: true,
};

export const sendLoginLink = async (email) => {
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem("emailForSignIn", email);
  console.log('Email sent to:', email);
};

export const completeLogin = async () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = localStorage.getItem("emailForSignIn");
    const result = await signInWithEmailLink(auth, email, window.location.href);
    const user = result.user;
    
    await createOrUpdateUser(user.uid, user.email); // 👈 add this line
    localStorage.removeItem("emailForSignIn"); // Clean up
    return user;
  }
  return null;
};
