import React from "react"
import { motion } from "framer-motion"

interface AccessibleCellProps {
  text?: string
  ariaLabel?: string
}

export const AccessibleCell: React.FC<AccessibleCellProps> = ({
  text = "ABC",
  ariaLabel = "ABC",
}) => {
  return (
    <motion.div
      tabIndex={0}
      role="group"
      aria-label={ariaLabel}
      whileHover={{ scale: 1.05 }}
      animate={{ rotate: 0 }}
      whileTap={{ rotate: 90 }}
      style={{
        display: "flex",
        gap: "5px",
        padding: "10px",
        border: "1px solid black",
        width: "100%",
        height: "100%",
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
    </motion.div>
  )
}
