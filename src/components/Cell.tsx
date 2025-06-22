import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface MotionDetectionProps {
    letters?: string[]
    ariaLabel?: string
    onLetterSelected?: (letter: string, cellIndex: number) => void
    onSwipe?: () => void
    content?: "single" | "multiple"
    doesTap?: boolean
}

const MotionDetection: React.FC<MotionDetectionProps> = ({
    letters = ["A", "B", "C", "D"],
    ariaLabel = "ABCD",
    onLetterSelected,
    onSwipe,
    content = "single",
    doesTap = false,
}) => {
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
    const [currentAriaLabel, setCurrentAriaLabel] = useState(ariaLabel)
    let bgcolor = "#292929"

    const handleDrag = (_event: any, info: any) => {
        const { offset } = info
        const threshold = 10

        if (Math.abs(offset.x) > Math.abs(offset.y)) {
            if (offset.x > threshold) {
                setSelectedLetter(letters[2])
            } else if (offset.x < -threshold) {
                setSelectedLetter(letters[0])
            }
        } else {
            if (offset.y > threshold) {
                setSelectedLetter(letters[3])
            } else if (offset.y < -threshold) {
                setSelectedLetter(letters[1])
            }
        }
    }

    const handleDragEnd = () => {
        if (selectedLetter && onLetterSelected) {
            onLetterSelected(selectedLetter, 0)
            if (onSwipe) onSwipe()

            let ariaMessage = `Selected ${selectedLetter}`
            const specialChars = ["␣", "⇤", "⌫"]
            if (specialChars.includes(selectedLetter)) {
                ariaMessage = ""
            }

            const liveRegion = document.getElementById("live-region")
            if (liveRegion) {
                liveRegion.textContent = ""
                setTimeout(() => {
                    liveRegion.textContent = ariaMessage
                }, 10)

                setTimeout(() => {
                    liveRegion.textContent = ""
                }, 2000)
            }
        }
    }

    const handleClick = () => {
        if (doesTap && onLetterSelected) {
            bgcolor = "#000000"
            onLetterSelected(letters[0], 0)
            const liveRegion = document.getElementById("live-region")
            if (liveRegion) {
                liveRegion.textContent = `Pressed`
            }
        } else if (onLetterSelected) {
            onLetterSelected(ariaLabel, 0)
        }
    }

    useEffect(() => {
        if (selectedLetter && !doesTap) {
            let currentLetter = ""
            switch (selectedLetter) {
                case "␣":
                    currentLetter = "Space"
                    break
                case "⇤":
                    currentLetter = "Clear All"
                    break
                case "⌫":
                    currentLetter = "Delete"
                    break
                default:
                    currentLetter = selectedLetter.toLowerCase()
            }

            const liveRegion = document.getElementById("live-region")
            if (liveRegion) {
                liveRegion.textContent = currentLetter
            }

            setTimeout(() => {
                setCurrentAriaLabel(ariaLabel)
            }, 2000)
        }
    }, [selectedLetter, ariaLabel, doesTap])

    return (
        <div
            tabIndex={0}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                border: "1px solid #8C8C8C",
            }}
        >
            {content === "single" ? (
                <div
                    aria-label={ariaLabel}
                    tabIndex={0}
                    onClick={handleClick}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        fontSize: "16pt",
                        fontWeight: "bold",
                        color: "#ffffff",
                        background: bgcolor,
                    }}
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
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        width: "100%",
                        height: "100%",
                        border: "1px solid #8C8C8C",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        color: "#ffffff",
                        textTransform: "uppercase",
                        background: "#292929",
                        fontSize: "16pt",
                        padding: "5vw",
                    }}
                >
                    <div
                        aria-hidden="true"
                        tabIndex={-1}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}
                    >
                        <div>{letters[1]}</div>
                    </div>
                    <div
                        aria-hidden="true"
                        tabIndex={-1}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flex: 1 }}
                    >
                        <div>{letters[0]}</div>
                        <div>{letters[2]}</div>
                    </div>
                    <div
                        aria-hidden="true"
                        tabIndex={-1}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}
                    >
                        <div>{letters[3]}</div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default MotionDetection
