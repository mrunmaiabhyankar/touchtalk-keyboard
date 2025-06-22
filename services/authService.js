import { auth } from "../firebase/firebaseConfig";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

const actionCodeSettings = {
  url: window.location.href,
  handleCodeInApp: true,
};

export const sendLoginLink = async (email) => {
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem("emailForSignIn", email);
};

export const completeLogin = async () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = localStorage.getItem("emailForSignIn");
    const result = await signInWithEmailLink(auth, email, window.location.href);
    return result.user;
  }
  return null;
};
