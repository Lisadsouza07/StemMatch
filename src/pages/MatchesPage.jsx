import React, { useState, useEffect } from "react";
import { useGlobal } from "../context/GlobalContext.jsx";
import { useFirebaseAuth } from "../config/FirebaseAuthContext.jsx";
import { getAllUsers } from "../config/authService.js";

export default function MatchesPage({ onOpenChat }) {
  const { state } = useGlobal();
  const { user } = useFirebaseAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch matches from Firebase
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        
        // Get list of accepted matches from state
        const acceptedMatchIds = state.acceptedMatches?.map(m => m.id || m.uid) || [];
        
        if (acceptedMatchIds.length === 0) {
          setMatches([]);
          setLoading(false);
          return;
        }

        // Fetch all users and filter by accepted matches
        const allUsers = await getAllUsers();
        const matchedUsers = allUsers.filter(u => 
          acceptedMatchIds.includes(u.uid) || acceptedMatchIds.includes(u.id)
        );
        
        setMatches(matchedUsers);
      } catch (error) {
        console.error("Error fetching matches:", error);
        // Fallback to state matches
        setMatches(state.acceptedMatches || []);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchMatches();
    }
  }, [user?.uid, state.acceptedMatches]);

  // Helper to get display photo
  const getPhotoUrl = (mentor) => {
    if (mentor.photo) return mentor.photo;
    
    // Fallback: Create SVG avatar
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70'%3E%3Crect fill='${encodeURIComponent(mentor.color || "%231B5BE8")}' width='70' height='70'/%3E%3Ctext x='50%' y='50%' font-size='30' font-weight='bold' text-anchor='middle' dominant-baseline='central' fill='white' font-family='Sora'%3E${mentor.avatar || mentor.name?.slice(0, 2).toUpperCase() || "U"}%3C/text%3E%3C/svg%3E`;
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          padding: "20px",
          background: "#213448",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading matches...
      </div>
    );
  }

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
          You don't have any matches yet.
        </div>
      ) : (
        matches.map((mentor) => (
          <div
            key={mentor.uid || mentor.id}
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
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            {/* PHOTO */}
            <img
              src={getPhotoUrl(mentor)}
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
                {mentor.name}{mentor.age ? `, ${mentor.age}` : ""}
              </div>
              <div style={{ fontSize: 14, color: "#BDE8F5" }}>
                {mentor.field || "Mentor"}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
