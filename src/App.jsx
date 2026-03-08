import React, { useState, useEffect } from "react";

import LandingPage from "./pages/LandingPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";

import SwipePage from "./pages/SwipePage.jsx";
import MentorInbox from "./pages/MentorInbox.jsx";
import MatchesPage from "./pages/MatchesPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PendingPage from "./pages/PendingPage.jsx";

import Avatar from "./components/Avatar.jsx";
import { useGlobal } from "./context/GlobalContext.jsx";

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ active, onNav, user, onLogout }) {
  const isMentor = user?.role === "mentor";

  const NAV = user.role === "mentor"
    ? [
        { id: "inbox", icon: "📥", label: "Requests" },
        { id: "matches", icon: "💬", label: "Matches" },
        { id: "profile", icon: "👤", label: "Profile" },
      ]
    : [
        { id: "swipe", icon: "✨", label: "Find Mentors" },
        { id: "pending", icon: "⏳", label: "Pending" },
        { id: "matches", icon: "💬", label: "Matches" },
        { id: "profile", icon: "👤", label: "Profile" },
      ];


  return (
    <div
  style={{
    width: 220,
    background: "#DCEBFF",
    color: "#1A1A1A",
    borderRight: "1px solid #BBD7FF",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 100,
  }}
>

      <div
        style={{
          padding: "24px 20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#F9FAFB",
            fontFamily: "'Playfair Display',serif",
          }}
        >
          🔬 StemMatch
        </div>
        <div style={{ fontSize: 11, color: "#4B5563", marginTop: 2 }}>
          Women in STEM
        </div>
      </div>

      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {NAV.map((item) => (
          <button
  key={item.id}
  onClick={() => onNav(item.id)}
  style={{
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 20px",
    background: active === item.id ? "#BBD7FF" : "transparent",
    border: "none",
    borderRight:
      active === item.id ? "3px solid #1C4D8D" : "3px solid transparent",
    color: active === item.id ? "#1C4D8D" : "#1A1A1A",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: active === item.id ? 600 : 400,
    textAlign: "left",
    transition: "all 0.15s",
  }}
>
  <span style={{ color: "#1C4D8D" }}>{item.icon}</span>
  {item.label}
</button>

        ))}
      </nav>

      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <Avatar initials={user?.avatar} color={user?.color} size={32} />
          <div>
            <div
              style={{
                color: "#E5E7EB",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {user?.name?.split(" ")[0]}
            </div>
            <div
              style={{
                color: "#4B5563",
                fontSize: 11,
                textTransform: "capitalize",
              }}
            >
              {user?.role}
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          style={{
            width: "100%",
            background: "rgba(239,68,68,0.1)",
            color: "#EF4444",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 8,
            padding: "8px",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const { state } = useGlobal();

  const [screen, setScreen] = useState("landing"); // landing | signup | login | app
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("swipe");
  const [activeChat, setActiveChat] = useState(null);

  const handleAuth = (u) => {
    setUser(u);
    setScreen("app");
    setPage(u.role === "mentor" ? "inbox" : "swipe");
  };

  const handleLogout = () => {
    setUser(null);
    setScreen("landing");
    setPage("swipe");
  };

  // If chatting, show ChatPage full-screen
  if (screen === "app" && activeChat) {
    return (
      <ChatPage mentor={activeChat} onBack={() => setActiveChat(null)} />
    );
  }

  // Landing
  if (screen === "landing") {
    return <LandingPage onEnter={setScreen} />;
  }

  // Auth
  if (screen === "signup" || screen === "login") {
    return (
      <AuthPage
        mode={screen}
        onAuth={handleAuth}
        users={[]}
        setUsers={() => {}}
      />
    );
  }

  // Main App Shell
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "DM Sans, sans-serif",
        background: "#080611",
        minHeight: "100vh",
        color: "#F9FAFB",
      }}
    >
      <Sidebar active={page} onNav={setPage} user={user} onLogout={handleLogout} />

      <main
        style={{
          marginLeft: 220,
          flex: 1,
          padding: "32px",
          boxSizing: "border-box",
        }}
      >
        {page === "swipe" && user.role === "mentee" && <SwipePage />}

        {page === "inbox" && user.role === "mentor" && <MentorInbox />}
        
        {page === "pending" && user.role === "mentee" && (
          <PendingPage user={user} />
        )}
        {page === "matches" && (
          <MatchesPage onOpenChat={(mentor) => setActiveChat(mentor)} />
        )}

        {page === "profile" && (
          <ProfilePage user={user} setUser={setUser} />
        )}

      </main>
    </div>
  );
}

