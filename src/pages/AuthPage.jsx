import React, { useState } from "react";


function AuthPage({ mode, onAuth, users, setUsers }) {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"mentee" });

  const handle = () => {
    if (!form.email || !form.password) return;

    // LOGIN
    if (isLogin) {
      const user = users.find(
        u => u.email === form.email && u.password === form.password
      );

      if (!user) {
        alert("Invalid email or password.");
        return;
      }

      onAuth(user);
      return;
    }

    // SIGN UP
    const newUser = {
      id: Date.now(),
      role: form.role,
      name: form.name || "New User",
      email: form.email,
      password: form.password,
      field: "Computer Science",
      skills: [],
      goals: [],
      style: "Weekly check-ins",
      timezone: "PST",
      bio: "",
      avatar: form.name?.slice(0, 2).toUpperCase() || "ME",
      color: "#6366F1",
      experience: "",
      isNew: true
    };

    setUsers([...users, newUser]);
    onAuth(newUser);
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0F0A1E,#1A0A2E)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:24, padding:40, width:"100%", maxWidth:420, backdropFilter:"blur(20px)" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <span style={{ fontSize:32 }}>🔬</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", color:"#F9FAFB", fontSize:28, margin:"8px 0 4px" }}>
            {isLogin ? "Welcome back" : "Join the community"}
          </h2>
          <p style={{ color:"#6B7280", fontSize:14 }}>
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        {!isLogin && (
          <div style={{ marginBottom:16 }}>
            <label style={{ color:"#9CA3AF", fontSize:12, fontWeight:600 }}>YOUR NAME</label>
            <input
              value={form.name}
              onChange={e => setForm({...form, name:e.target.value})}
              placeholder="Dr. Jane Smith"
              style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"12px 14px", color:"#F9FAFB", marginTop:6 }}
            />
          </div>
        )}

        {["Email","Password"].map(f => (
          <div key={f} style={{ marginBottom:16 }}>
            <label style={{ color:"#9CA3AF", fontSize:12, fontWeight:600 }}>{f.toUpperCase()}</label>
            <input
              type={f==="Password" ? "password" : "email"}
              value={form[f.toLowerCase()]}
              onChange={e => setForm({...form, [f.toLowerCase()]:e.target.value})}
              placeholder={f==="Email" ? "you@example.com" : "••••••••"}
              style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"12px 14px", color:"#F9FAFB", marginTop:6 }}
            />
          </div>
        ))}

        {!isLogin && (
          <div style={{ marginBottom:20 }}>
            <label style={{ color:"#9CA3AF", fontSize:12, fontWeight:600 }}>I AM A</label>
            <div style={{ display:"flex", gap:10, marginTop:8 }}>
              {["mentee","mentor"].map(r => (
                <button
                  key={r}
                  onClick={() => setForm({...form,role:r})}
                  style={{
                    flex:1,
                    padding:"10px",
                    borderRadius:10,
                    border:`2px solid ${form.role===r?"#7C3AED":"rgba(255,255,255,0.1)"}`,
                    background:form.role===r?"rgba(124,58,237,0.2)":"transparent",
                    color:form.role===r?"#A78BFA":"#6B7280",
                    fontWeight:600,
                    cursor:"pointer"
                  }}
                >
                  {r === "mentee" ? "🎓 Mentee" : "🌟 Mentor"}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handle}
          style={{ width:"100%", background:"linear-gradient(135deg,#7C3AED,#A855F7)", color:"#fff", border:"none", borderRadius:12, padding:"14px", fontSize:16, fontWeight:700, cursor:"pointer" }}
        >
          {isLogin ? "Sign In" : "Create Account"} →
        </button>

        <p style={{ color:"#6B7280", textAlign:"center", marginTop:20 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background:"none", border:"none", color:"#A78BFA", cursor:"pointer", fontWeight:600 }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
