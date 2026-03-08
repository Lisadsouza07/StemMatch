import React, { useState } from "react";
import { useGlobal } from "../context/GlobalContext.jsx";

export default function PendingPage() {
  const { state, dispatch } = useGlobal();
  const [confirming, setConfirming] = useState(null);

  const handleCancel = (request) => {
    dispatch({ type: "CANCEL_REQUEST", payload: request.recipient || request });
    setConfirming(null);
  };

  const getPhotoUrl = (user) => {
    if (user?.photo) return user.photo;
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect fill='${encodeURIComponent(user?.color || "%231B5BE8")}' width='64' height='64'/%3E%3Ctext x='50%' y='50%' font-size='28' font-weight='bold' text-anchor='middle' dominant-baseline='central' fill='white' font-family='Sora'%3E${user?.avatar || user?.name?.slice(0, 1).toUpperCase() || "U"}%3C/text%3E%3C/svg%3E`;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: "#1A1A1A", marginBottom: 20 }}>Pending Requests</h2>

      {state.sentRequests.length === 0 && (
        <p style={{ color: "#4A5568" }}>You have no pending requests.</p>
      )}

      {state.sentRequests.map((request) => {
        // Get the recipient (mentor) from the request
        const mentor = request.recipient || request;
        
        return (
          <div
            key={mentor.id || mentor.uid}
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
              src={getPhotoUrl(mentor)}
              alt={mentor.name}
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A" }}>
                {mentor.name}
              </div>
              <div style={{ fontSize: 14, color: "#4A5568" }}>
                {mentor.field || "Mentor"}
              </div>
              <div style={{ fontSize: 13, color: "#718096", marginTop: 4 }}>
                Pending acceptance…
              </div>
            </div>

            <button
              onClick={() => setConfirming(request)}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: "1px solid #EF4444",
                background: "transparent",
                color: "#EF4444",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Cancel
            </button>
          </div>
        );
      })}

      {confirming && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              padding: 24,
              borderRadius: 12,
              width: 320,
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#1A1A1A", marginBottom: 12 }}>
              Cancel Request?
            </h3>
            <p style={{ color: "#4A5568", marginBottom: 20 }}>
              Are you sure you want to cancel your request to{" "}
              <strong>{(confirming.recipient || confirming).name}</strong>?
            </p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setConfirming(null)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: 8,
                  border: "1px solid #CBD5E0",
                  background: "#F0F7FF",
                  color: "#1A1A1A",
                  cursor: "pointer",
                }}
              >
                Keep
              </button>

              <button
                onClick={() => handleCancel(confirming)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: 8,
                  border: "1px solid #EF4444",
                  background: "#EF4444",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Cancel Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
