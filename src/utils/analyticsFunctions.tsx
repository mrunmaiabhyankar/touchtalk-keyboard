import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase/firebaseConfig";
import { setUserId, setUserProperties } from "firebase/analytics";

export const logAnalyticsEvent = (eventName: string, params: Record<string, any> = {}) => {
  try {
    logEvent(analytics, eventName, params);
  } catch (error) {
    // console.error("GA logging error:", error);
  }
};

export const initializeUserAnalytics = (uid: string, email?: string) => {
  try {
    setUserId(analytics, uid); // ✅ Sets the GA User ID
    if (email) {
      setUserProperties(analytics, { email }); // Optional custom property
    }
  } catch (e) {
    // console.error("Error setting user analytics properties", e);
  }
};

// ──────── Interaction-Level ────────
export const logSwipeDirection = (direction: string, cellIndex: number) => {
  logAnalyticsEvent("swipe_direction", { direction, cellIndex });
};

export const logExpectedVsActualSwipe = (expected: string, actual: string, index: number) => {
  logAnalyticsEvent("expected_vs_actual_swipe", { expected, actual, index });
};

export const logSwipeDuration = (startTime: number, endTime: number) => {
  logAnalyticsEvent("swipe_duration", { duration: endTime - startTime });
};

export const logSwipeAbandonment = (cellIndex: number) => {
  logAnalyticsEvent("swipe_abandonment", { cellIndex });
};

// ──────── Phrase-Level ────────
export const logPhraseTime = (taskId: number, duration: number) => {
  logAnalyticsEvent("phrase_completion_time", { taskId, duration });
};

export const logSwipesPerCharacter = (taskId: number, totalSwipes: number, chars: number) => {
  logAnalyticsEvent("swipes_per_character", { taskId, ratio: totalSwipes / chars });
};

export const logPhraseErrorRate = (taskId: number, wrong: number, total: number) => {
  logAnalyticsEvent("error_rate", { taskId, rate: (wrong / total) * 100 });
};

// ──────── Correction-Level ────────
export const logBackspaceTap = (taskId: number) => {
  logAnalyticsEvent("backspace_used", { taskId });
};

export const logClearAll = (taskId: number, swipeCount: number) => {
  logAnalyticsEvent("clear_all_triggered", { taskId, swipeCount });
};

export const logCorrectionDensity = (taskId: number, charsDeleted: number, charsTyped: number) => {
  logAnalyticsEvent("correction_density", {
    taskId,
    density: (charsDeleted / charsTyped) * 100,
  });
};

// ──────── Focus Behavior ────────
export const logTextboxFocus = (taskId: number) => {
  logAnalyticsEvent("textbox_focus", { taskId });
};

export const logFocusAfterTyping = (taskId: number) => {
  logAnalyticsEvent("focus_after_typing", { taskId });
};

export const logSwipeToFocusRatio = (taskId: number, focusCount: number, totalSwipes: number) => {
  logAnalyticsEvent("swipe_to_focus_ratio", {
    taskId,
    ratio: focusCount / totalSwipes,
  });
};

// ──────── Longitudinal Metrics ────────
export const logDailyPhraseStats = (
  day: number,
  avgTime: number,
  errorRate: number,
  swipesPerPhrase: number
) => {
  logAnalyticsEvent("daily_phrase_stats", {
    day,
    avgTime,
    errorRate,
    swipesPerPhrase,
  });
};

export const logErrorResilience = (userId: string, taskId: number, recovered: boolean) => {
  logAnalyticsEvent("error_resilience", { userId, taskId, recovered });
};

export const logTimeOfDayPerformance = (taskId: number, timeOfDay: string, performance: number) => {
  logAnalyticsEvent("time_of_day_performance", { taskId, timeOfDay, performance });
};

export const logPhraseTypeDifficulty = (
  phraseType: string,
  avgTime: number,
  errorRate: number
) => {
  logAnalyticsEvent("phrase_type_difficulty", {
    phraseType,
    avgTime,
    errorRate,
  });
};

