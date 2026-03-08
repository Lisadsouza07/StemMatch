import React from "react";
import { useGlobal } from "../context/GlobalContext.jsx";

export default function MentorInbox({ onSelect }) {
  const { state, dispatch } = useGlobal();

  const handleAccept = (mentee) => {
    dispatch({ type: "ACCEPT_REQUEST", payload: mentee });
  };

  const handleDecline = (mentee) => {
    dispatch({ type: "DECLINE_REQUEST", payload: mentee });
  };

  return (
    <div
      style={{
        padding: 20,
        background: "#F0F7FF",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ color: "#1A1A1A", marginBottom: 20 }}>Incoming Requests</h2>

      {state.pendingRequests.length === 0 && (
        <p style={{ color: "#4A5568" }}>No pending requests right now.</p>
      )}

      {state.pendingRequests.map((mentee) => (
        <div
          key={mentee.id}
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <img
            src={mentee.photo}
            alt={mentee.name}
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A" }}>
              {mentee.name}
            </div>
            <div style={{ fontSize: 14, color: "#4A5568" }}>
              {mentee.field}
            </div>
          </div>

          <button
            onClick={() => handleAccept(mentee)}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: "none",
              background: "#059669",
              color: "white",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Accept
          </button>

          <button
            onClick={() => handleDecline(mentee)}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: "1px solid #EF4444",
              background: "transparent",
              color: "#EF4444",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Decline
          </button>
        </div>
      ))}
    </div>
  );
}

