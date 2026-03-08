
import React, { useState } from "react";
import { registerUser, loginUser } from "../config/authService.js";

const BLUE_DARK = "#0A2463";
const BLUE_MID = "#1B5BE8";
const BLUE_PALE = "#D6E4FF";
const WHITE = "#FFFFFF";

function AuthPage({ mode, onAuth }) {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "mentee" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = async () => {
    if (!form.email || !form.password) return;
    
    setLoading(true);
    setError("");

    try {
      let user;
      
      if (isLogin) {
        user = await loginUser(form.email, form.password);
      } else {
        if (!form.name) {
          setError("Please enter your name");
          setLoading(false);
          return;
        }
        
        user = await registerUser(form.email, form.password, form.name, form.role, {
          field: "Computer Science",
          skills: [],
          goals: [],
          style: "Weekly check-ins",
          timezone: "PST",
          bio: "",
          avatar: form.name?.slice(0, 2).toUpperCase() || "US",
          color: BLUE_MID,
          experience: "",
        });
      }
      
      onAuth(user);
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(100,160,255,0.25)",
    borderRadius: 10,
    padding: "12px 14px",
    color: WHITE,
    marginTop: 6,
    fontSize: 14,
    fontFamily: "'Sora', sans-serif",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    color: "#93C5FD",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    fontFamily: "'Sora', sans-serif",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0A2463 0%, #0D2F7A 40%, #0A1A4E 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      fontFamily: "'Sora', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        input::placeholder { color: rgba(255,255,255,0.3); }
        input:focus { border-color: rgba(100,160,255,0.6) !important; background: rgba(255,255,255,0.1) !important; }
      `}</style>

      <div style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(100,160,255,0.2)",
        borderRadius: 24,
        padding: 40,
        width: "100%",
        maxWidth: 420,
        backdropFilter: "blur(20px)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span style={{ fontSize: 32 }}>🔬</span>
          <h2 style={{
            color: WHITE,
            fontSize: 28,
            fontWeight: 800,
            margin: "8px 0 4px",
            letterSpacing: "-0.5px",
          }}>
            {isLogin ? "Welcome back" : "Join the community"}
          </h2>
          <p style={{ color: "#93C5FD", fontSize: 14, fontWeight: 500 }}>
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        {/* Name field (signup only) */}
        {!isLogin && (
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Your Name</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Dr. Jane Smith"
              style={inputStyle}
            />
          </div>
        )}

        {/* Email + Password */}
        {["Email", "Password"].map(f => (
          <div key={f} style={{ marginBottom: 16 }}>
            <label style={labelStyle}>{f}</label>
            <input
              type={f === "Password" ? "password" : "email"}
              value={form[f.toLowerCase()]}
              onChange={e => setForm({ ...form, [f.toLowerCase()]: e.target.value })}
              placeholder={f === "Email" ? "you@example.com" : "••••••••"}
              style={inputStyle}
            />
          </div>
        ))}

        {/* Role selector (signup only) */}
        {!isLogin && (
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>I Am A</label>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              {["mentee", "mentor"].map(r => (
                <button
                  key={r}
                  onClick={() => setForm({ ...form, role: r })}
                  style={{
                    flex: 1,
                    padding: "11px",
                    borderRadius: 10,
                    border: `2px solid ${form.role === r ? BLUE_MID : "rgba(255,255,255,0.1)"}`,
                    background: form.role === r ? "rgba(27,91,232,0.25)" : "transparent",
                    color: form.role === r ? "#93C5FD" : "#6B7280",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "'Sora', sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {r === "mentee" ? "🎓 Mentee" : "🌟 Mentor"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handle}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#555" : "linear-gradient(135deg, #1B5BE8, #3B82F6)",
            color: WHITE,
            border: "none",
            borderRadius: 12,
            padding: "14px",
            fontSize: 16,
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Sora', sans-serif",
            boxShadow: "0 6px 24px rgba(27,91,232,0.45)",
            marginTop: isLogin ? 8 : 0,
          }}
        >
          {loading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")} →
        </button>

        {/* Error Message */}
        {error && (
          <div style={{
            marginTop: 12,
            padding: "10px 12px",
            background: "rgba(255,100,100,0.2)",
            border: "1px solid rgba(255,100,100,0.5)",
            borderRadius: 8,
            color: "#FF6B6B",
            fontSize: 13,
            textAlign: "center",
          }}>
            {error}
          </div>
        )}

        {/* Toggle */}
        <p style={{ color: "#6B7280", textAlign: "center", marginTop: 20, fontSize: 14 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              color: "#60A5FA",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;