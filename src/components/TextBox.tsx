import React from "react"
import { useNavigate } from 'react-router-dom';


interface TextBoxProps {
    value: string // The text to display
    showContinueButton: boolean // Show/hide the continue button
    nextPageLink?: string // Navigation link
    onClickContinue?: () => void;
    continueButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

const TextBox: React.FC<TextBoxProps> = ({
    value = "Your Text Will Appear Here",
    showContinueButton = true,
    onClickContinue = () => {},
    continueButtonRef = React.createRef<HTMLButtonElement>(),
}) => {
    const navigate = useNavigate();
    return (
        <div
            id="parent-box"
            className="text-box"
        >
            <div
                id="text"
                style={{
                flex: 1,
                padding: "0 1rem",
                color: "white",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                overflowX: "auto",
                whiteSpace: "nowrap",
            }}
                // role="textbox"
                // aria-readonly="true"
                aria-label={`Text box, ${value}`}
                tabIndex={0}
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
                ref={continueButtonRef}
                // style={{
                //     backgroundColor: showContinueButton ? "#4a934a" : "#888",
                //     color: "white",
                //     cursor: showContinueButton ? "pointer" : "not-allowed",
                //     display: "flex",
                //     alignItems: "center",
                //     justifyContent: "center",
                //     height: "100%",
                //     opacity: showContinueButton ? 1 : 0.6,
                // }}
                style={{
                    width: "33.33%",
                    height: "100%",
                    backgroundColor: showContinueButton ? "#4a934a" : "#888",
                    color: "white",
                    // cursor: showContinueButton ? "pointer" : "not-allowed",

                    border: "none",
                    fontWeight: "bold",
                    fontSize: "1rem",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0",

                    borderRadius: "16px",  // match right edge rounding
                    // boxSizing: "border-box",
                                }}
            >
    Continue
</button>
        </div>
    )
}

export default TextBox
