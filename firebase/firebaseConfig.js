// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8SBJzfee8E2sMNCqdmo2FsB0O8RsSIQ4",
  authDomain: "touchtalk-53dd1.firebaseapp.com",
  projectId: "touchtalk-53dd1",
  storageBucket: "touchtalk-53dd1.appspot.com",
  messagingSenderId: "1031273881987",
  appId: "1:1031273881987:web:674d4376b10c8371d6d6b6",
  measurementId: "G-F3VCRR6EXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);