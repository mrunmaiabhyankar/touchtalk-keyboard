import { auth } from "../firebase/firebaseConfig";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  User,
} from "firebase/auth";
import { createOrUpdateUser } from "./userService";

const actionCodeSettings = {
  url: 'http://localhost:3000/login',
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

    // Save email and clean up
    localStorage.setItem("userEmail", user.email || "");
    localStorage.removeItem("emailForSignIn");

    return user;
  }

  return null;
};
