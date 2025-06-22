import React from "react"

interface TextBoxProps {
    value: string // The text to display
    showContinueButton: boolean // Show/hide the continue button
    nextPageLink?: string // Navigation link
}

const TextBox: React.FC<TextBoxProps> = ({
    value = "Your Text Will Appear Here",
    showContinueButton = true,
    nextPageLink = "/",
}) => {
    return (
        <div
            id="parent-box"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #8c8c8c",
                padding: "10px",
                backgroundColor: "#292929",
                height: "10vh",
            }}
        >
            <div
                id="text"
                aria-label="Text box"
                tabIndex={0}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "16pt",
                    fontFamily: "Arial",
                    backgroundColor: "#292929",
                    color: "#ffffff",
                }}
            >
                {value}
            </div>

            {showContinueButton && (
                <a
                    href={nextPageLink}
                    style={{ textDecoration: "none" }}
                    aria-label="Double tap to go to the next screen"
                >
                    <div
                        style={{
                            marginLeft: "12px",
                            padding: "8px 16px",
                            backgroundColor: "#4a934a",
                            color: "white",
                            borderRadius: "5px",
                            height: "100%",
                            cursor: "pointer",
                            fontSize: "12pt",
                            fontFamily: "Arial",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        Continue
                    </div>
                </a>
            )}
        </div>
    )
}

export default TextBox
