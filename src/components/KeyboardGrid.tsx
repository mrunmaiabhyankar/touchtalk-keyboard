import React, { useState, useEffect, useRef } from "react";
import KeyboardCell from "./Cell";
import TextBox from "./TextBox";
import { logAnalyticsEvent } from "../utils/analyticsFunctions";

interface KeyboardGridProps {
  onTextUpdate?: (text: string) => void;
  variant?: "default" | "gridLayout" | "singleCell";
  content?: "single" | "multiple";
  onClickContinue?: () => void;
  doesTap?: boolean;
  taskWord?: string;
}

const KeyboardGrid: React.FC<KeyboardGridProps> = ({
  onTextUpdate,
  variant = "gridLayout",
  content = "single",
  doesTap = false,
  taskWord = "VIBE",
  onClickContinue = () => {}
}) => {
  const [text, setText] = useState("");
  const [pressedCells, setPressedCells] = useState<number[]>([]);
  const [swipeCount, setSwipeCount] = useState(0);
  const [errors, setErrors] = useState(0);
  const [backspaces, setBackspaces] = useState(0);
  const [taskStartTime, setTaskStartTime] = useState<number | null>(null);

  const tasks = ["VIBE", "ICED", "CAFE LATTE", "ICED CAFE LATTE"];
  const taskId = tasks.indexOf(taskWord) >= 0 ? tasks.indexOf(taskWord) : 0;

  useEffect(() => {
    setTaskStartTime(Date.now());
    logAnalyticsEvent("text_box_focus", { taskId });
  }, [taskWord]);

  const handleCharacterInput = (inputChar: string, expectedChar: string) => {
    if (inputChar !== expectedChar && inputChar !== "⌫") {
      setErrors(prev => prev + 1);
      logAnalyticsEvent("error_character", { inputChar, expectedChar, taskId });
    }
  };

  const handleSwipe = () => {
    if (variant === "singleCell") {
      setSwipeCount(prev => prev + 1);
      logAnalyticsEvent("swipe_count_incremented", { taskId });
    }
  };

  const handleLetterSelected = (letter: string, index: number) => {
    const expectedChar = taskWord[text.length];
    handleCharacterInput(letter, expectedChar);

    let newText = text;

    if (variant === "gridLayout") {
      setPressedCells(prev => (prev.includes(index) ? prev : [...prev, index]));
    }

    switch (letter) {
      case "⌫":
        setBackspaces(prev => prev + 1);
        newText = newText.slice(0, -1);
        logAnalyticsEvent("backspace_pressed", { taskId });
        break;
      case "⇤":
        newText = "";
        logAnalyticsEvent("clear_all", { taskId });
        break;
      case "␣":
        newText += " ";
        break;
      default:
        newText = content === "multiple" ? newText + letter : letter;
        break;
    }

    if (variant === "singleCell") {
      setSwipeCount(prev => prev + 1);
    }

    setText(newText);
    onTextUpdate?.(newText);
  };

  const shouldShowContinueButton = () => {
    switch (variant) {
      case "gridLayout":
        return pressedCells.length === 9;
      case "singleCell":
        return swipeCount >= 4;
      default:
        return text.trim().length > 0;
    }
  };

  const completeTask = (success: boolean) => {
    logAnalyticsEvent("task_completed", { taskId, success });
  };

  const endTask = () => {
    if (taskStartTime) {
      const duration = (Date.now() - taskStartTime) / 1000;
      logAnalyticsEvent("phrase_duration", { duration, taskId });
    }

    logAnalyticsEvent("swipes_per_character", {
      swipes: swipeCount,
      characters: text.length,
      taskId
    });

    logAnalyticsEvent("backspace_per_phrase", {
      count: backspaces,
      taskId
    });

    const errorRate = (errors / (taskWord.length || 1)) * 100;
    logAnalyticsEvent("error_rate", {
      errorRate,
      errors,
      length: taskWord.length,
      taskId
    });
  };

  const handleContinue = () => {
    completeTask(text === taskWord);
    endTask();
    onClickContinue?.();
  };

  const gridLetters = [
    ["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"],
    ["J", "K", "L", "M"], ["N", "O", "P", "Q"], ["R", "S", "T", "U"],
    ["V", "W", "X"], ["Y", "Z", "⇤"], ["␣", "", "⌫"]
  ];

  const gridCells = ["Cell 1", "Cell 2", "Cell 3", "Cell 4", "Cell 5", "Cell 6", "Cell 7", "Cell 8", "Cell 9"];
  const ariaLabelData = ["A,B,C", "D,E,F", "G,H,I", "J,K,L,M", "N,O,P,Q", "R,S,T,U", "V,W,X", "Y,Z,Clear all", "Space,Delete"];

  const showContinue = shouldShowContinueButton();

  return (
    <div
      tabIndex={0}
      role="group"
      className="keyboard-grid"
      style={{ height: "50vh", display: "flex", flexDirection: "column" }}
    >
      {variant === "singleCell" ? (
        <KeyboardCell
          letters={["J", "K", "L", "M"]}
          ariaLabel={"JKLM"}
          onLetterSelected={(letter) => handleLetterSelected(letter, 3)}
          onSwipe={({ direction, targetKey }) =>
            logAnalyticsEvent("swipe_direction", { direction, targetKey })
          }
          content={content}
          doesTap={false}
        />
      ) : (
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)"
          }}
          role="region"
          aria-label="Keyboard region"
          tabIndex={0}
        >
          {(content === "single" ? gridCells : gridLetters).map((item, index) => (
            <KeyboardCell
              key={index}
              letters={Array.isArray(item) ? item : [item]}
              ariaLabel={content === "single" ? String(item) : ariaLabelData[index]}
              onLetterSelected={(letter) => handleLetterSelected(letter, index)}
              onSwipe={() => {}}
              content={content}
              doesTap={doesTap}
            />
          ))}
        </div>
      )}

      <TextBox
        value={text}
        showContinueButton={showContinue}
        onClickContinue={handleContinue}
      />
    </div>
  );
};

export default KeyboardGrid;
