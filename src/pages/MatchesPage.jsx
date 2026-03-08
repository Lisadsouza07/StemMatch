import React from "react";
import { useGlobal } from "../context/GlobalContext.jsx";

export default function MatchesPage({ onOpenChat }) {
  const { state } = useGlobal();
  const matches = state.acceptedMatches;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        background: "#213448",
        color: "white",
      }}
    >
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
        Your Matches
      </h2>

      {matches.length === 0 ? (
        <div
          style={{
            marginTop: 80,
            textAlign: "center",
            fontSize: 18,
            color: "#94B4C1",
          }}
        >
          You don’t have any matches yet.
        </div>
      ) : (
        matches.map((mentor) => (
          <div
            key={mentor.id}
            onClick={() => onOpenChat(mentor)}
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: 16,
              borderRadius: 16,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 16,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* PHOTO */}
            <img
              src={mentor.photo}
              alt={mentor.name}
              style={{
                width: 70,
                height: 70,
                borderRadius: 14,
                objectFit: "cover",
              }}
            />

            {/* INFO */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                {mentor.name}, {mentor.age}
              </div>
              <div style={{ fontSize: 14, color: "#BDE8F5" }}>
                {mentor.field}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
