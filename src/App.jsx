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
import { FirebaseAuthProvider, useFirebaseAuth } from "./config/FirebaseAuthContext.jsx";
import { logoutUser } from "./config/authService.js";

const BLUE_DARK = "#0A2463";
const BLUE_MID = "#1B5BE8";
const BLUE_PALE = "#D6E4FF";
const WHITE = "#FFFFFF";

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ active, onNav, user, onLogout }) {
  const NAV = user.role === "mentor"
    ? [
        { id: "inbox", icon: "📥", label: "Requests" },
        { id: "matches", icon: "💬", label: "Matches" },
        { id: "profile", icon: "👤", label: "Profile" },
      ]
    : [
        { id: "swipe", icon: "✦", label: "Find Mentors" },
        { id: "pending", icon: "⏳", label: "Pending" },
        { id: "matches", icon: "💬", label: "Matches" },
        { id: "profile", icon: "👤", label: "Profile" },
      ];

  return (
    <div style={{
      width: 240,
      background: BLUE_DARK,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 100,
      padding: "28px 18px",
      fontFamily: "'Sora', sans-serif",
    }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: BLUE_MID, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 18, color: WHITE,
          fontWeight: 800, flexShrink: 0,
        }}>✦</div>
        <div>
          <div style={{ color: WHITE, fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px" }}>
            StemMatch
          </div>
          <div style={{ color: BLUE_PALE, fontSize: 10, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" }}>
            Women in STEM
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 12,
              border: "none",
              background: active === item.id ? BLUE_MID : "transparent",
              color: active === item.id ? WHITE : BLUE_PALE,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              textAlign: "left",
              boxShadow: active === item.id ? "0 4px 14px rgba(27,91,232,0.4)" : "none",
              transition: "all 0.15s",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            <span style={{ width: 20, textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

     {/* Bottom user section */}
<div
  style={{
    borderTop: "1px solid rgba(255,255,255,0.08)",
    paddingTop: 18,
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>
  {/* Avatar + name */}
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <Avatar initials={user?.avatar} color={user?.color} size={32} />

    <div>
      <div
        style={{
          color: WHITE,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {user?.name?.split(" ")[0]}
      </div>

      <div
        style={{
          color: BLUE_PALE,
          fontSize: 11,
          fontWeight: 600,
          textTransform: "capitalize",
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {user?.role}
      </div>
    </div>
  </div>

  {/* Tiny logout icon */}
  <button
    onClick={onLogout}
    style={{
      background: "transparent",
      border: "none",
      color: "#FF6B6B",
      fontSize: 18,
      cursor: "pointer",
      padding: 4,
      lineHeight: 1,
    }}
    title="Sign Out"
  >
    🚪
  </button>
</div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function AppContent() {
  const { state } = useGlobal();
  const { user, loading, logout } = useFirebaseAuth();

  const [screen, setScreen] = useState("landing");
  const [page, setPage] = useState("swipe");
  const [activeChat, setActiveChat] = useState(null);

  // Auto-navigate based on auth state
  useEffect(() => {
    if (user) {
      setScreen("app");
      setPage(user.role === "mentor" ? "inbox" : "swipe");
    } else {
      setScreen("landing");
    }
  }, [user]);

  const handleAuth = (authenticatedUser) => {
    // Auth is handled automatically by Firebase context
    // This is called after successful signup/login
  };

  const handleLogout = async () => {
    try {
      await logout();
      setScreen("landing");
      setPage("swipe");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #0A2463 0%, #0D2F7A 40%, #0A1A4E 100%)",
        fontFamily: "'Sora', sans-serif",
        color: "white",
        fontSize: 18,
      }}>
        Loading...
      </div>
    );
  }

  if (screen === "app" && activeChat) {
    return <ChatPage mentor={activeChat} user={user} onBack={() => setActiveChat(null)} />;
  }

  if (screen === "landing") {
    return <LandingPage onEnter={setScreen} />;
  }

  if (screen === "signup" || screen === "login") {
    return <AuthPage mode={screen} onAuth={handleAuth} />;
  }

  return (
    <div style={{
      display: "flex",
      fontFamily: "'Sora', sans-serif",
      background: "#EEF4FF",
      minHeight: "100vh",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');`}</style>

      <Sidebar active={page} onNav={setPage} user={user} onLogout={handleLogout} />

      <main style={{
        marginLeft: 240,
        flex: 1,
        padding: "32px",
        boxSizing: "border-box",
      }}>
        {page === "swipe" && user?.role === "mentee" && <SwipePage />}
        {page === "inbox" && user?.role === "mentor" && <MentorInbox />}
        {page === "pending" && user?.role === "mentee" && <PendingPage user={user} />}
        {page === "matches" && <MatchesPage onOpenChat={(mentor) => setActiveChat(mentor)} />}
        {page === "profile" && <ProfilePage user={user} setUser={() => {}} />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <FirebaseAuthProvider>
      <AppContent />
    </FirebaseAuthProvider>
  );
}