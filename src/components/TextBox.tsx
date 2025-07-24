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
        >
            <div
                id="text"
                role="textbox"
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
                style={{
                    // marginLeft: "12px",
                    // padding: "8px 16px",
                    backgroundColor: showContinueButton ? "#4a934a" : "#888",
                    color: "white",
                    // borderRadius: "5px",
                    // height: "100%",
                    cursor: showContinueButton ? "pointer" : "not-allowed",
                    // fontSize: "12pt",
                    // fontFamily: "Arial",
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
