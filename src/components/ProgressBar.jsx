import React from "react";

export default function ProgressBar({ progress = 0, color = "#7C3AED" }) {
  return (
    <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 4 }}>
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: color,
          borderRadius: 4,
          transition: "width 0.3s",
        }}
      />
    </div>
  );
}
