import { auth } from "../firebase/firebaseConfig";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  User,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
} from "firebase/auth";
import { createOrUpdateUser } from "./userService";
// import { create } from "domain";

const actionCodeSettings = {
  url: 'https://mrunmaiabhyankar.github.io/touchtalk-keyboard/',
  handleCodeInApp: true,
};

export const sendLoginLink = async (email: string): Promise<void> => {
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem("emailForSignIn", email);
  console.log('Email sent to:', email);
};

export const completeLogin = async (): Promise<User | null> => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = localStorage.getItem("emailForSignIn");
    console.log("Email from localStorage:", email);
    // Ask user for email if not found locally (edge case: clicked link on different device)
    if (!email) {
      email = window.prompt("Please provide your email to complete sign-in:");
    }

    if (!email) return null;

    const result = await signInWithEmailLink(auth, email, window.location.href);
    const user = result.user;
    createOrUpdateUser(user.uid, user.email)
    // Save email and clean up
    // console.log("User signed in:", user.uid);
    
    window.localStorage.setItem("userEmail", user.email || "");
    window.localStorage.setItem("userUid", user.uid || "");
    localStorage.removeItem("emailForSignIn");

    return user;
  }

  return null;
};

export const registerWithEmail = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;
  await createOrUpdateUser(user.uid, email);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userUid", user.uid);
  return user;
};

export const loginWithEmail = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userUid", user.uid);
  return user;
};

export const logout = async () => {
  return await signOut(auth);
};