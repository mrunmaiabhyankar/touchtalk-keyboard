import { db } from "../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

// 1. Calculate the user's current task day
export const getUserCurrentDay = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  const userData = userSnap.data();
  const startDate = userData.studyStartDate.toDate();
  const today = new Date();

  const daysSince = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
  );

  const expectedDay = Math.min(daysSince, 7); // max = 7 days

  if (expectedDay > userData.currentDay) {
    return { day: userData.currentDay };
  }

  return { day: expectedDay };
};

// 2. Fetch the phrases for a given task day
export const fetchTaskPhrasesByDay = async (dayNumber) => {
  const q = query(
    collection(db, "tasks"),
    where("day", "==", dayNumber)
  );

  const snapshot = await getDocs(q);

  const phrases = [];
  snapshot.forEach((doc) => {
    phrases.push(doc.data().phrase);
  });

  return phrases.sort(); // optional sorting
};