import React from "react";

function LandingPage({ onEnter }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0A2463 0%, #0D2F7A 40%, #0A1A4E 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Sora', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');`}</style>

      {/* Decorative orbs */}
      {[
        ["#1B5BE8", "-10%", "20%", 500],
        ["#4A90E2", "80%",  "60%", 400],
        ["#D6E4FF", "30%",  "80%", 300],
      ].map(([c, l, t, s], i) => (
        <div key={i} style={{
          position: "absolute", left: l, top: t,
          width: s, height: s, borderRadius: "50%",
          background: c, opacity: 0.12,
          filter: "blur(80px)", pointerEvents: "none",
        }} />
      ))}

      <div style={{ position: "relative", textAlign: "center", maxWidth: 700 }}>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(27,91,232,0.2)",
          border: "1px solid rgba(100,160,255,0.35)",
          borderRadius: 99, padding: "6px 18px", marginBottom: 32,
        }}>
          <span style={{ fontSize: 18 }}>🔬</span>
          <span style={{ color: "#A8C8FF", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
            Women in STEM
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: "clamp(40px, 6vw, 72px)",
          color: "#F9FAFB",
          lineHeight: 1.1,
          marginBottom: 20,
          fontWeight: 800,
          letterSpacing: "-1px",
        }}>
          Find Your{" "}
          <span style={{ color: "#60A5FA" }}>Mentor</span>
          <br />
          <span style={{
            background: "linear-gradient(90deg, #38BDF8, #4ADE80)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Match
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          color: "#93C5FD",
          fontSize: 18,
          lineHeight: 1.7,
          maxWidth: 500,
          margin: "0 auto 40px",
          fontWeight: 500,
        }}>
          Find the mentor who gets your journey. Sign up today!
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => onEnter("signup")}
            style={{
              background: "linear-gradient(135deg, #1B5BE8, #3B82F6)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "16px 36px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Sora', sans-serif",
              boxShadow: "0 6px 24px rgba(27,91,232,0.45)",
            }}
          >
            Get Started →
          </button>
          <button
            onClick={() => onEnter("login")}
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#D1D5DB",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 12,
              padding: "16px 36px",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            Sign In
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 64, flexWrap: "wrap" }}>
          {[
            ["500+",   "Active Mentors"],
            ["2,400+", "Mentee Matches"],
            ["94%",    "Success Rate"],
            ["48",     "STEM Fields"],
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, color: "#F9FAFB", fontWeight: 800, letterSpacing: "-0.5px" }}>{n}</div>
              <div style={{ color: "#60A5FA", fontSize: 13, fontWeight: 600, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;