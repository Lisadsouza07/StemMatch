import React from "react";
import { FiX, FiStar } from "react-icons/fi";

export default function SwipeControls({ onSkip, onRequest }) {
  return (
    <div 
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: 28,
        marginTop: 24,
      }}
    >
      {/* SKIP BUTTON */}
      <button
        onClick={onSkip}
        style={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          border: "2px solid #547792",
          background: "rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          transition: "0.2s ease",
        }}
      >
        <FiX size={32} color="#547792" />
      </button>

      {/* REQUEST BUTTON */}
      <button
        onClick={onRequest}
        style={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          border: "none",
          background: "#1C4D8D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
          transition: "0.2s ease",
        }}
      >
        <FiStar size={32} color="white" />
      </button>
    </div>
  );
}
