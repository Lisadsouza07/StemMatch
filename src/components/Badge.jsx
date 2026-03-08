import React from "react";

export default function Badge({ text, color }) {
  return (
    <span
      style={{
        background: color,
        color: "white",
        padding: "2px 8px",
        borderRadius: 12,
        fontSize: 10,
        fontWeight: 600,
        textTransform: "capitalize",
      }}
    >
      {text}
    </span>
  );
}


