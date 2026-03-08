import React from "react";



// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ onEnter }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0F0A1E 0%, #1A0A2E 40%, #0A1628 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      {/* Decorative orbs */}
      {[["#7C3AED","-10%","20%",500],["#059669","80%","60%",400],["#DC2626","30%","80%",300]].map(([c,l,t,s],i) => (
        <div key={i} style={{ position:"absolute", left:l, top:t, width:s, height:s, borderRadius:"50%", background:c, opacity:0.12, filter:"blur(80px)", pointerEvents:"none" }} />
      ))}
      <div style={{ position:"relative", textAlign:"center", maxWidth:700 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(124,58,237,0.15)", border:"1px solid rgba(124,58,237,0.3)", borderRadius:99, padding:"6px 18px", marginBottom:32 }}>
          <span style={{ fontSize:18 }}>🔬</span>
          <span style={{ color:"#A78BFA", fontSize:13, fontWeight:600, letterSpacing:1, textTransform:"uppercase" }}>Women in STEM</span>
        </div>
        <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:"clamp(40px,6vw,72px)", color:"#F9FAFB", lineHeight:1.1, marginBottom:20 }}>
          Find Your{" "}
          <span style={{ background:"linear-gradient(90deg,#A78BFA,#34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Mentor Match
          </span>
        </h1>
        <p style={{ color:"#9CA3AF", fontSize:18, lineHeight:1.7, marginBottom:40, maxWidth:500, margin:"0 auto 40px" }}>
          An intelligent platform connecting women in STEM with mentors who get it — matched by field, skills, goals, and vibe.
        </p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => onEnter("signup")} style={{ background:"linear-gradient(135deg,#7C3AED,#A855F7)", color:"#fff", border:"none", borderRadius:12, padding:"16px 36px", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"DM Sans, sans-serif" }}>
            Get Started →
          </button>
          <button onClick={() => onEnter("login")} style={{ background:"rgba(255,255,255,0.05)", color:"#D1D5DB", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"16px 36px", fontSize:16, fontWeight:600, cursor:"pointer" }}>
            Sign In
          </button>
        </div>
        <div style={{ display:"flex", gap:32, justifyContent:"center", marginTop:64, flexWrap:"wrap" }}>
          {[["500+","Active Mentors"],["2,400+","Mentee Matches"],["94%","Success Rate"],["48","STEM Fields"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:32, color:"#F9FAFB", fontWeight:700 }}>{n}</div>
              <div style={{ color:"#6B7280", fontSize:13 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;