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
  taskID?: number;
}

const KeyboardGrid: React.FC<KeyboardGridProps> = ({
  onTextUpdate,
  variant = "gridLayout",
  content = "single",
  doesTap = false,
  taskWord = "VIBE",
  taskID = 0,
  onClickContinue = () => {}
}) => {
  const [text, setText] = useState("Text box");
  const [pressedCells, setPressedCells] = useState<number[]>([]);
  const [ariaMessage, setAriaMessage] = useState(text)
  const [swipeCount, setSwipeCount] = useState(0);
  const [errors, setErrors] = useState(0);
  const [backspaces, setBackspaces] = useState(0);
  const [taskStartTime, setTaskStartTime] = useState<number | null>(null);

  // const tasks = ["VIBE", "ICED", "CAFE LATTE", "ICED CAFE LATTE"];
  // const taskID = tasks.indexOf(taskWord) >= 0 ? tasks.indexOf(taskWord) : 0;

  useEffect(() => {
    setTaskStartTime(Date.now());
    setText("");
    // logAnalyticsEvent("text_box_focus", { taskID });
  }, [taskWord]);

  const handleCharacterInput = (inputChar: string, expectedChar: string) => {
    if (inputChar !== expectedChar && inputChar !== "⌫") {
      setErrors(prev => prev + 1);
      logAnalyticsEvent("error_character", { inputChar, expectedChar, taskID });
    }
  };

  // const handleSwipe = () => {
  //   if (variant === "singleCell") {
  //     setSwipeCount(prev => prev + 1);
  //     // logAnalyticsEvent("swipe_count_incremented", { taskID });
  //   }
  // };

  const handleLetterSelected = (letter: string, index: number) => {
    const expectedChar = taskWord[text.length];
    handleCharacterInput(letter, expectedChar);

    let newText = text;

    if (variant === "gridLayout") {
      setPressedCells(prev => (prev.includes(index) ? prev : [...prev, index]));
    }

    // console.log(swipeCount, " swipeCount before increment");
    if (variant === "singleCell") {
      setSwipeCount(prev => prev + 1);
      // console.log("Swipe count incremented:", swipeCount);
    }

    switch (letter) {
      case "⌫":
        setBackspaces(prev => prev + 1);
        if(newText.length > 0) {

        var deletedChar = newText[newText.length - 1];
        newText = newText.slice(0, -1);
        setAriaMessage("")
        setTimeout(() => {
          setAriaMessage(`Deleted ${deletedChar}`)
          }, 10)
        logAnalyticsEvent("backspace", { taskID });
        } else{
          setAriaMessage("No character to delete");
        }
        break;
      case "⇤":
        newText = "";
        setAriaMessage(`Cleared all`)
        logAnalyticsEvent("clear_all", { taskID });
        break;
      case "␣":
        newText += " ";
        setAriaMessage("Space added")
        break;
      default:
        if (variant === "gridLayout" && content === "single") {
          newText = letter;
        } else if (variant === "gridLayout" && content === "multiple") {
          newText = ariaLabelData[index];
        } else{
          newText += letter; // Default behavior for other variants
        }
        // newText = content === "multiple" ? newText + letter : letter;
        break;
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
    logAnalyticsEvent("task_completed", { taskID, success });
  };

  const endTask = () => {
    if (taskStartTime) {
      const duration = (Date.now() - taskStartTime) / 1000;
      logAnalyticsEvent("phrase_duration", { duration, taskID });
    }

    logAnalyticsEvent("swipes_per_character", {
      swipes: swipeCount,
      characters: text.length,
      taskID
    });

    logAnalyticsEvent("backspace_per_phrase", {
      count: backspaces,
      taskID
    });

    const errorRate = (errors / (taskWord.length || 1)) * 100;
    logAnalyticsEvent("error_rate", {
      errorRate,
      errors,
      length: taskWord.length,
      taskID
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
          ariaLabel={"J,K,L,M"}
          onLetterSelected={(letter) => handleLetterSelected(letter, 3)}
          // onSwipe={handleSwipe}
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
          // role="row"
          // aria-label="Keyboard region"
          tabIndex={0}
        >
          {(content === "single" ? gridCells : gridLetters).map((item, index) => (
            <KeyboardCell
              key={index}
              letters={Array.isArray(item) ? item : [item]}
              ariaLabel={content === "single" ? String(item) : ariaLabelData[index]}
              onLetterSelected={(letter) => handleLetterSelected(letter, index)}
              // onSwipe={() => {}}
              content={content}
              doesTap={doesTap}
            />
          ))}
        </div>
      )}
        <div
          id="live-region"
          aria-live="polite"
          aria-atomic="true"
          aria-hidden="true"
              // role="status"
          tabIndex={-1}
          style={{ position: "absolute", left: "-9999px" }}
          >
          {ariaMessage}
        </div>
      <TextBox
        value={text}
        showContinueButton={showContinue}
        onClickContinue={handleContinue}
      />
    </div>
  );
};

export default KeyboardGrid;
