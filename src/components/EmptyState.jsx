import React from "react";

export default function EmptyState({ onReset }) {
  return (
    <div
      style={{
        marginTop: 120,
        textAlign: "center",
        color: "white",
        padding: "0 20px",
      }}
    >
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
        You’re all caught up!
      </h2>

      <p style={{ fontSize: 16, color: "#BDE8F5", marginBottom: 24 }}>
        You’ve seen all available mentors for now.
      </p>

      <button
        onClick={onReset}
        style={{
          padding: "12px 20px",
          borderRadius: 12,
          border: "none",
          background: "#1C4D8D",
          color: "white",
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
      >
        Refresh Mentors
      </button>
    </div>
  );
}
