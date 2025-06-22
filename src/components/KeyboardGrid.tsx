import React, { useState, useEffect, useRef } from "react"
import KeyboardCell from "./Cell"
import TextBox from "./TextBox"
import {
    reportCharacterError,
    reportTaskCompleted,
    reportTimeOnTask,
    reportErrorRate,
} from "../utils/analyticsFunctions"

declare global {
    interface Window {
        gtag?: (...args: any[]) => void
    }
}
export {}

interface KeyboardGridProps {
    onTextUpdate?: (text: string) => void
    variant?: "default" | "gridLayout" | "singleCell"
    content?: "single" | "multiple"
    nextPageLink?: string
    doesTap?: boolean
    taskWord?: string
}

export default function KeyboardGrid({
    onTextUpdate,
    variant = "gridLayout",
    content = "single",
    nextPageLink,
    doesTap = false,
    taskWord = "VIBE",
}: KeyboardGridProps) {
    const [text, setText] = useState("")
    const [pressedCells, setPressedCells] = useState<number[]>([])
    const [swipeCount, setSwipeCount] = useState(0)
    const continueButtonRef = useRef<HTMLButtonElement>(null)
    const [ariaMessage, setAriaMessage] = useState("")
    const [errors, setErrors] = useState(0)
    const [backspaces, setBackspaces] = useState(0)
    const [height, setHeight] = useState("50vh")
    const tasks = ["VIBE", "ICED", "CAFE LATTE", "ICED CAFE LATTE"]
    const taskId = tasks.indexOf(taskWord) >= 0 ? tasks.indexOf(taskWord) : 0

    const handleCharacterInput = (inputChar: string, expectedChar: string) => {
        if (inputChar !== expectedChar && inputChar !== "⌫") {
            setErrors(prev => prev + 1)
            reportCharacterError(inputChar, taskId)
        }
    }

    const [taskStartTime, setTaskStartTime] = useState<number | null>(null)

    useEffect(() => {
        setTaskStartTime(Date.now())
    }, [])

    // Callback function for swipe gestures
    const handleSwipe = () => {
        if (variant === "singleCell") {
            setSwipeCount((prev) => prev + 1) // Increment swipe count
            console.log(swipeCount)
        }
    }

    const completeTask = (success: boolean) => {
        reportTaskCompleted(success, taskId)
    }

    const endTask = () => {
        if (taskStartTime) {
            const duration = (Date.now() - taskStartTime) / 1000
            reportTimeOnTask(duration, taskId)
        }
    }

    const handleLetterSelected = (letter: string, index: number) => {
        const expectedChar = taskWord[text.length]
        handleCharacterInput(letter, expectedChar)

        let newText = text

        if (variant === "gridLayout") {
            setPressedCells(prev => (prev.includes(index) ? prev : [...prev, index]))
        }

        switch (letter) {
            case "⌫":
                setBackspaces(prev => prev + 1)
                if (newText.length > 0) {
                    const deletedChar = newText.slice(-1)
                    newText = newText.slice(0, -1)
                    setAriaMessage("")
                    setTimeout(() => setAriaMessage(`Deleted ${deletedChar}`), 10)
                } else {
                    setAriaMessage("No character to delete")
                }
                break
            case "⇤":
                newText = ""
                setAriaMessage("Cleared all")
                break
            case "␣":
                newText += " "
                setAriaMessage("Space added")
                break
            default:
                newText += letter
                break
        }

        if (variant === "singleCell") setSwipeCount(prev => prev + 1)
        setText(newText)
        onTextUpdate?.(newText)
    }

    const shouldShowContinueButton = () => {
        switch (variant) {
            case "gridLayout": return pressedCells.length === 9
            case "singleCell": return swipeCount >= 4
            default: return text.trim().length > 0
        }
    }

    const onNextTask = () => {
        const expectedLength = taskWord.length
        const errorRate = (errors / expectedLength) * 100
        reportErrorRate(errorRate, taskId)

        completeTask(text === taskWord)
        endTask()
        window.location.href = nextPageLink || "/"
    }

    const gridLetters = [
        ["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"],
        ["J", "K", "L", "M"], ["N", "O", "P", "Q"], ["R", "S", "T", "U"],
        ["V", "W", "X"], ["Y", "Z", "⇤"], ["␣", "", "⌫"],
    ]
    const gridCells = ["Cell 1", "Cell 2", "Cell 3", "Cell 4", "Cell 5", "Cell 6", "Cell 7", "Cell 8", "Cell 9"]
    const ariaLabelData = ["A,B,C", "D,E,F", "G,H,I", "J,K,L,M", "N,O,P,Q", "R,S,T,U", "V,W,X", "Y,Z,Clear all", "Space,Delete"]
    const data = content === "single" ? gridCells : gridLetters
    const showContinue = shouldShowContinueButton()

    return (
        <div
            tabIndex={0}
            role="group"
            style={{ height, display: "flex", flexDirection: "column" }}
        >
            {variant === "singleCell" ? (
                <KeyboardCell
                    letters={["J", "K", "L", "M"]}
                    ariaLabel={"JKLM"}
                    onLetterSelected={(letter) =>
                        handleLetterSelected(letter, 3)
                    } // Pass cellIndex
                    onSwipe={() => handleSwipe()}
                    content={content} // Pass the variant to the Cell component
                    doesTap={false}
                />
            ) : (
            <div
                style={{
                    flex: 1,
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridTemplateRows: "repeat(3, 1fr)",
                }}
                role="region"
                aria-label="Keyboard region"
                tabIndex={0}
            >
                {data.map((item, index) => (
                    <KeyboardCell
                        key={index}
                        letters={Array.isArray(item) ? item : [item]}
                        aria-label={content === "single" ? item : ariaLabelData[index]}
                        onLetterSelected={letter => handleLetterSelected(letter, index)}
                        onSwipe={() => {}}
                        content={content}
                        doesTap={doesTap}
                    />
                ))}
            </div>
        )}

            {/* Live region for accessibility
            <div
                id="live-region"
                aria-live="polite"
                style={{ position: "absolute", left: "-9999px" }}
            >
                {ariaMessage}
            </div> */}

            <TextBox
                value={text}
                showContinueButton={showContinue}
                nextPageLink={nextPageLink}
            />
        </div>
    )
}

// addPropertyControls(KeyboardGrid, {
//     variant: {
//         type: ControlType.Enum,
//         options: ["default", "gridLayout", "gestures"],
//         defaultValue: "default",
//         title: "Style",
//     },
//     content: {
//         type: ControlType.Enum,
//         options: ["single", "multiple"],
//         defaultValue: "multiple",
//         title: "Content Type",
//     },
//     onTextUpdate: {
//         type: ControlType.Function,
//         title: "On Text Update",
//     },
//     nextPageLink: {
//         type: ControlType.String,
//         title: "Next Page Link",
//     },
//     doesTap: {
//         type: ControlType.Boolean,
//         defaultValue: false,
//         title: "Enable Tap",
//     },
//     taskWord: {
//         type: ControlType.String,
//         defaultValue: "BASE",
//         title: "Task Word",
//     },
// })
