// src/services/feedbackService.js
import { storage, db } from "../firebase/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const uploadVoiceFeedback = async ({ audioBlob, uid, day }) => {
  try {
    const filename = `feedback_audio/${uid}_day${day}.webm`;
    const storageRef = ref(storage, filename);

    // 1. Upload audio blob to Firebase Storage
    await uploadBytes(storageRef, audioBlob);

    // 2. Save metadata to Firestore
    const feedbackRef = doc(db, "voiceFeedback", `${uid}_day${day}`);
    await setDoc(feedbackRef, {
      userId: uid,
      day: day,
      uploadedAt: serverTimestamp(),
      storagePath: filename
    });

    return { success: true };
  } catch (error) {
    console.error("Error uploading voice feedback:", error);
    return { success: false, error };
  }
};
