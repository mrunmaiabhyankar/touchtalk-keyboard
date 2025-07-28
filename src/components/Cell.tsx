import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { logAnalyticsEvent } from "../utils/analyticsFunctions";

interface KeyboardCellProps {
  letters?: string[];
  ariaLabel?: string;
  onLetterSelected?: (letter: string, cellIndex: number) => void;
  onSwipe?: (info: { direction: string; targetKey: string }) => void;
  content?: "single" | "multiple";
  doesTap?: boolean;
}

const KeyboardCell: React.FC<KeyboardCellProps> = ({
  letters = ["A", "B", "C", "D"],
  ariaLabel = "ABCD",
  onLetterSelected,
  onSwipe,
  content = "single",
  doesTap = false,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [currentAriaLabel, setCurrentAriaLabel] = useState(ariaLabel);

  const handleDrag = (_event: any, info: any) => {
    const { offset } = info;
    const threshold = 10;
    let direction = "";
    let letter = "";

    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      if (offset.x > threshold) {
        letter = letters[2];
        direction = "right";
      } else if (offset.x < -threshold) {
        letter = letters[0];
        direction = "left";
      }
    } else {
      if (offset.y > threshold) {
        letter = letters[3];
        direction = "down";
      } else if (offset.y < -threshold) {
        letter = letters[1];
        direction = "up";
      }
    }

    if (letter) {
      setSelectedLetter(letter);
      if (onSwipe) {
        onSwipe({ direction, targetKey: ariaLabel || "unknown" });
      }

      logAnalyticsEvent("swipe_direction", {
        direction,
        targetKey: ariaLabel,
      });
    }
  };

  const handleDragEnd = () => {

    if (selectedLetter && onLetterSelected && !doesTap) {
      onLetterSelected(selectedLetter, 0);
      var ariaMessage = `Entered ${selectedLetter}`;
      const specialChars = ["␣", "⇤", "⌫"];

      if (specialChars.includes(selectedLetter)) {
                ariaMessage = "";
            }

      const liveRegion = document.getElementById("live-region");
      if (liveRegion) {
        liveRegion.textContent = ariaMessage;

        setTimeout(() => {
          liveRegion.textContent = "";
        }, 2000);
      }
    }
  };

  const handleClick = () => {
    if (doesTap && onLetterSelected) {
      onLetterSelected(letters[0], 0);
      const liveRegion = document.getElementById("live-region");
      if (liveRegion) {
        liveRegion.textContent = `Pressed`;
        // setTimeout(() => {
        //   liveRegion.textContent = "";
        // }, 10);
      }
      
    } else if (onLetterSelected) {
      onLetterSelected(ariaLabel, 0);
    } 
  };

  useEffect(() => {
    if (selectedLetter && !doesTap) {
      let currentLetter = "";
      switch (selectedLetter) {
        case "␣":
          currentLetter = "Space";
          break;
        case "⇤":
          currentLetter = "Clear All";
          break;
        case "⌫":
          currentLetter = "Delete";
          break;
        default:
          currentLetter = selectedLetter.toLowerCase();
      }

      const liveRegion = document.getElementById("live-region");
      if (liveRegion) {
        liveRegion.textContent = currentLetter;
      }

      setTimeout(() => {
        setCurrentAriaLabel(ariaLabel);
      }, 2000);
    }
  }, [selectedLetter, ariaLabel, doesTap]);

  return (
    <div tabIndex={0} className="cell">
      {content === "single" ? (
        <div
          aria-label={ariaLabel}
          tabIndex={0}
          onClick={handleClick}
          className="cell-single"
        >
          {letters[0]}
        </div>
      ) : (
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onClick={doesTap ? handleClick : () => {}}
          tabIndex={0}
          aria-label={currentAriaLabel}
          className="cell-multiple"
        >
          <div aria-hidden="true" className="cell-row">
            <div>{letters[1]}</div>
          </div>
          <div aria-hidden="true" className="cell-row-middle">
            <div>{letters[0]}</div>
            <div>{letters[2]}</div>
          </div>
          <div aria-hidden="true" className="cell-row">
            <div>{letters[3]}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default KeyboardCell;
