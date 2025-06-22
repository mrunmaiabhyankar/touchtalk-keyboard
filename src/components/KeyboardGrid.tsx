import React, { useState, useEffect, useRef } from "react"
import MotionDetection from "./Cell"
// @ts-ignore
// import { addPropertyControls, ControlType } from "framer"

declare global {
    interface Window {
        gtag?: (...args: any[]) => void
    }
}
export {}

interface KeyboardGridProps {
    onTextUpdate?: (text: string) => void
    variant?: "default" | "gridLayout" | "gestures"
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

    useEffect(() => {
        const updateHeight = () => {
            const safeTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-area-top")) || 0
            const safeBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-area-bottom")) || 0
            const visibleHeight = window.innerHeight
            const adjustedHeight = visibleHeight - safeTop - safeBottom
            setHeight(`${adjustedHeight / 2}px`)
        }

        updateHeight()
        window.addEventListener("resize", updateHeight)
        return () => window.removeEventListener("resize", updateHeight)
    }, [])

    const handleCharacterInput = (inputChar: string, expectedChar: string) => {
        if (inputChar !== expectedChar && inputChar !== "⌫") {
            setErrors(prev => prev + 1)
            window.gtag?.("event", "error_character", {
                event_category: "Task Interaction",
                event_label: inputChar,
                value: 1,
                task_id: taskId,
            })
        }
    }

    const [taskStartTime, setTaskStartTime] = useState<number | null>(null)

    useEffect(() => {
        setTaskStartTime(Date.now())
    }, [])

    const completeTask = (success: boolean) => {
        window.gtag?.("event", "task_completed", {
            event_category: "Task Performance",
            event_label: `Task ${taskId} complete: ${success}`,
            value: 1,
            task_id: taskId,
        })
    }

    const endTask = () => {
        if (taskStartTime) {
            const duration = (Date.now() - taskStartTime) / 1000
            window.gtag?.("event", "time_on_task", {
                event_category: "Task Interaction",
                event_label: "Task duration",
                value: duration,
                task_id: taskId,
            })
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

        if (variant === "gestures") setSwipeCount(prev => prev + 1)
        setText(newText)
        onTextUpdate?.(newText)
    }

    const shouldShowContinueButton = () => {
        switch (variant) {
            case "gridLayout": return pressedCells.length === 9
            case "gestures": return swipeCount >= 4
            default: return text.trim().length > 0
        }
    }

    const onNextTask = () => {
        const expectedLength = taskWord.length
        const errorRate = (errors / expectedLength) * 100
        window.gtag?.("event", "error_rate", {
            event_category: "Task Performance",
            event_label: `Task ${taskId}`,
            value: errors,
            task_id: taskId,
        })

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
                    <MotionDetection
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

            <div
                role="group"
                aria-labelledby="text-box-label"
                tabIndex={0}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid #8c8c8c",
                    backgroundColor: "#292929",
                    height: "10vh",
                    padding: "10px",
                }}
            >
                <div
                    id="live-region"
                    aria-live="polite"
                    style={{ position: "absolute", left: "-9999px" }}
                >
                    {ariaMessage}
                </div>

                <div
                    aria-label={`Text box: ${text}`}
                    id="text-box-label"
                    tabIndex={0}
                    style={{
                        fontSize: "16pt",
                        fontFamily: "Arial",
                        color: "#fff",
                        backgroundColor: "#292929",
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    {text}
                </div>

                {showContinue && (
                    <button
                        style={{
                            marginLeft: "12px",
                            padding: "8px 16px",
                            backgroundColor: "#4a934a",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "12pt",
                            cursor: "pointer",
                        }}
                        ref={continueButtonRef}
                        onClick={onNextTask}
                        tabIndex={0}
                        aria-label="Double tap to continue to next screen"
                    >
                        Continue
                    </button>
                )}
            </div>
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
