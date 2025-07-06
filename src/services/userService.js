import { db } from "../firebase/firebaseConfig";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";

export const createOrUpdateUser = async (uid, email) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email,
      createdAt: serverTimestamp(),
      studyStartDate: serverTimestamp(),
      // taskFrequency: "daily", // or "every3days"
      sessionCount: 0,
      lastSeen: serverTimestamp(),
    });
  }
  // } else {
  //   // await updateDoc(userRef, {
  //   //   lastSeen: serverTimestamp(),
  //   //   sessionCount: increment(1),
  //   // });
  // }
};
