import React from "react"

interface AccessibleCellProps {
    text?: string
    ariaLabel?: string
}

export default function AccessibleCell({
    text = "ABC",
    ariaLabel = "ABC",
}: AccessibleCellProps) {
    return (
        <div
            tabIndex={0}
            role="group"
            aria-label={ariaLabel}
            style={{
                display: "flex",
                gap: "5px",
                padding: "10px",
                border: "1px solid black",
                width: "auto",
                height: "auto",
                boxSizing: "border-box",
                background: "#B3E9FC",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {text.split("").map((letter, index) => (
                <span key={index} aria-hidden="true">
                    {letter}
                </span>
            ))}
        </div>
    )
}
