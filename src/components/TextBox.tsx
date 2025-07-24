import React from "react"
import { useNavigate } from 'react-router-dom';


interface TextBoxProps {
    value: string // The text to display
    showContinueButton: boolean // Show/hide the continue button
    nextPageLink?: string // Navigation link
    onClickContinue?: () => void;
}

const TextBox: React.FC<TextBoxProps> = ({
    value = "Your Text Will Appear Here",
    showContinueButton = true,
    onClickContinue = () => {}
}) => {
    const navigate = useNavigate();
    return (
        <div
            id="parent-box"
            className="text-box"
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                height: '100%',
                width: '100%',
            }}
        >
            <div
                id="text"
                role="textbox"
                // aria-readonly="true"
                aria-label={`Text box, ${value}`}
                tabIndex={0}
                style={{
                    flex: 1,
                    padding: '12px',
                }}
            >
                {value}
            </div>
            <button
                onClick={onClickContinue}
                disabled={!showContinueButton}
                aria-label={
                    showContinueButton
                        ? "Double tap to go to the next screen"
                        : "Complete all steps to continue"
                }
                style={{
                    width: '10%',
                    padding: '12px',
                    backgroundColor: showContinueButton ? "#4a934a" : "#888",
                    color: "white",
                    border: 'none',
                    cursor: showContinueButton ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: showContinueButton ? 1 : 0.6,
                    }}
            >
    Continue
</button>
        </div>
    )
}

export default TextBox
