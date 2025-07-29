import { doc, getDoc, collection, query, where, getDocs, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Adjust path as needed

// 1. Calculate the user's current task day
export const getUserCurrentDay = async (uid: string): Promise<number | null> => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) throw new Error("User not found");

  const userData = userSnap.data();
  return userData.sessionCount || 0;
};

// 2. Fetch the phrases for a given task day
export const fetchTaskPhrasesByDay = async (dayNumber: number): Promise<{ phraseId: number; phrase: string }[]> => {
  const q = query(collection(db, "tasks"), where("day", "==", dayNumber));
  const snapshot = await getDocs(q);
  // console.log("Fetched", snapshot.size, "tasks for day", dayNumber);

  const phrases: { phraseId: number, phrase: string }[] = [];

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.phrase_no !== undefined && data.phrase) {
      phrases.push({
        phraseId: data.phrase_no,
        phrase: data.phrase,
      });
    }
  });

  // console.log("Fetched phrases for day", dayNumber, ":", phrases);
  return phrases;
};

export const markSessionComplete = async (uid: string): Promise<void> => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) throw new Error("User not found");
  const userData = userSnap.data();
  const lastSeen = userData.lastSeen?.toDate?.() || new Date(0);
  const now = new Date();

  const lastSeenLocal = new Date(lastSeen.getFullYear(), lastSeen.getMonth(), lastSeen.getDate());
  const nowLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const isNewDay = nowLocal.getTime() !== lastSeenLocal.getTime();
  // console.log("Last seen:", lastSeen.toLocaleDateString(), "Now:", now.toLocaleDateString(), "Is new day:", isNewDay);
  if (isNewDay) {
    await updateDoc(userRef, {
      sessionCount: (userData.sessionCount || 1) + 1,
      lastSeen: now,
    });
  }
};

export const isSessionAlreadyComplete = async (uid: string): Promise<string> => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return "login"; // User not found, return false

  const userData = userSnap.data();
  const lastSeen = userData.lastSeen?.toDate?.() || new Date(0);
  const today = new Date();

  const userDay = userData.sessionCount || 0;
  if (userDay > 5) {
    return "bonus"; // User has completed more than 5 sessions, return false
  }

  const lastSeenLocal = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const seenLocal = new Date(
    lastSeen.getFullYear(),
    lastSeen.getMonth(),
    lastSeen.getDate()
  );

  // Compare local day difference
  const dayDifference =
    (lastSeenLocal.getTime() - seenLocal.getTime()) / (1000 * 60 * 60 * 24);

  const isSameLocalDay = dayDifference === 0;
  // console.log("Last session was on:", lastSeen.toLocaleDateString());
  // console.log(userData.sessionCount, " sessions completed");
  return isSameLocalDay.toString(); // Return true or false as a string

  // return isSameDay;
};

