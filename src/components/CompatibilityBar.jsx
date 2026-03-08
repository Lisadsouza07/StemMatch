import React from "react";

export default function CompatibilityBar({ value }) {
  return (
    <div style={{ marginTop: 6 }}>
      <div 
        style={{
          width: "100%",
          height: 4,
          background: "rgba(255,255,255,0.15)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div 
          style={{
            width: `${value}%`,
            height: "100%",
            background: "linear-gradient(90deg, #4988C4, #BDE8F5)",
            borderRadius: 4,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div 
        style={{
          marginTop: 4,
          fontSize: 12,
          color: "#BDE8F5",
          fontWeight: 600,
        }}
      >
        {value}% Compatibility
      </div>
    </div>
  );
}
