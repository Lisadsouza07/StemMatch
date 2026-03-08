import React from "react";
import { useGlobal } from "../context/GlobalContext.jsx";

export default function MentorInbox({ onSelect }) {
  const { state, dispatch } = useGlobal();

  const handleAccept = (request) => {
    // Accept the sender (mentee) as a match
    dispatch({ type: "ACCEPT_REQUEST", payload: request.sender });
  };

  const handleDecline = (request) => {
    // Decline from sender
    dispatch({ type: "DECLINE_REQUEST", payload: request.sender });
  };

  // Get the mentee info from the request (sender)
  const getPhotoUrl = (user) => {
    if (user?.photo) return user.photo;
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect fill='${encodeURIComponent(user?.color || "%231B5BE8")}' width='64' height='64'/%3E%3Ctext x='50%' y='50%' font-size='28' font-weight='bold' text-anchor='middle' dominant-baseline='central' fill='white' font-family='Sora'%3E${user?.avatar || user?.name?.slice(0, 1).toUpperCase() || "U"}%3C/text%3E%3C/svg%3E`;
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

      {state.pendingRequests.map((request) => {
        // Get the sender (mentee) from the request
        const mentee = request.sender || request;
        
        return (
          <div
            key={mentee.id || mentee.uid}
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
              src={getPhotoUrl(mentee)}
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
                {mentee.field || "Mentee"}
              </div>
            </div>

            <button
              onClick={() => handleAccept(request)}
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
              onClick={() => handleDecline(request)}
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
        );
      })}
    </div>
  );
}

