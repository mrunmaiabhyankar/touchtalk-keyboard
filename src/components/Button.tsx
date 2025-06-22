import React from "react"

interface ButtonProps {
    link?: string
    ariaLabel?: string
    title?: string
}

export default function Button({
    link = "/gridLayout",
    ariaLabel = "Double tap to go to the next screen",
    title = "Continue",
}: ButtonProps) {
    return (
        <button
            onClick={() => (window.location.href = link)}
            role="button"
            aria-label={ariaLabel}
            tabIndex={0}
            style={{
                display: "inline-block",
                margin: "10%",
                padding: "16px 20px",
                backgroundColor: "#F0F5FF",
                border: "1px solid #8C8C8C",
                width: "80%",
                fontSize: "16pt",
                fontFamily: "SF Pro Text",
                color: "#1a1a1a",
                borderRadius: "12px",
                textDecoration: "none",
                textAlign: "center",
            }}
        >
            {title}
        </button>
    )
}
