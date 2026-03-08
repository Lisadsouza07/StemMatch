import React from "react";

export default function ScoreBar({ score }) {
  const col = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 8, background: "#E5E7EB", borderRadius: 99 }}>
        <div
          style={{
            width: `${score}%`,
            height: "100%",
            background: col,
            borderRadius: 99,
            transition: "width 1s ease"
          }}
        />
      </div>
      <span style={{ fontWeight: 700, color: col, fontSize: 13, minWidth: 36 }}>
        {score}%
      </span>
    </div>
  );
}
