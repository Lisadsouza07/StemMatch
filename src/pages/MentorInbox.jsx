import React, { useState } from "react";
import MatchToast from "../components/MatchToast.jsx";
import { useGlobal } from "../context/GlobalContext.jsx";

export default function MentorInbox() {
  const { state, dispatch } = useGlobal();
  const requests = state.pendingRequests;

  const [showToast, setShowToast] = useState(false);
  const [matchedName, setMatchedName] = useState("");

  const handleAccept = (mentee) => {
    setMatchedName(mentee.name);
    setShowToast(true);

    dispatch({
      type: "ACCEPT_REQUEST",
      payload: mentee,
    });
  };

  const handleDecline = (mentee) => {
    dispatch({
      type: "DECLINE_REQUEST",
      payload: mentee,
    });
  };

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
        Mentor Requests
      </h2>

      {requests.length === 0 ? (
        <div
          style={{
            marginTop: 80,
            textAlign: "center",
            fontSize: 18,
            color: "#94B4C1",
          }}
        >
          No pending requests right now.
        </div>
      ) : (
        requests.map((mentee) => (
          <div
            key={mentee.id}
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: 16,
              borderRadius: 16,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 16,
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={mentee.photo}
              alt={mentee.name}
              style={{
                width: 70,
                height: 70,
                borderRadius: 14,
                objectFit: "cover",
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                {mentee.name}, {mentee.age}
              </div>
              <div style={{ fontSize: 14, color: "#BDE8F5" }}>
                {mentee.aboutShort}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => handleDecline(mentee)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: "1px solid #547792",
                  background: "transparent",
                  color: "#547792",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Decline
              </button>

              <button
                onClick={() => handleAccept(mentee)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: "none",
                  background: "#1C4D8D",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Accept
              </button>
            </div>
          </div>
        ))
      )}

      <MatchToast
        show={showToast}
        mentorName={matchedName}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
