import React, { useState } from "react";
import Avatar from "../components/Avatar.jsx";

// ─── MATCHES PAGE ─────────────────────────────────────────────────────────────
function MatchesPage({ matches, onMessage }) {
  const [requested, setRequested] = useState([]);
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:"#F9FAFB", margin:0 }}>✨ Your Mentor Matches</h1>
        <p style={{ color:"#6B7280", marginTop:6 }}>Ranked by AI compatibility score across field, goals, skills & timezone.</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        {matches.map((m, idx) => (
          <div key={m.id} style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${idx===0?"rgba(124,58,237,0.4)":"rgba(255,255,255,0.07)"}`, borderRadius:20, padding:24, position:"relative", overflow:"hidden" }}>
            {idx === 0 && <div style={{ position:"absolute", top:0, right:0, background:"linear-gradient(135deg,#7C3AED,#A855F7)", color:"#fff", fontSize:10, fontWeight:700, padding:"4px 14px", borderBottomLeftRadius:12, letterSpacing:1 }}>BEST MATCH</div>}
            <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:16 }}>
                <div style={{ position:"relative" }}>
                  <Avatar initials={m.avatar} color={m.color} size={64} />
                  <div style={{ position:"absolute", bottom:-4, right:-4, background:"#10B981", borderRadius:"50%", width:16, height:16, border:"2px solid #0F0A1E", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ color:"#fff", fontSize:8 }}>✓</span>
                  </div>
                </div>
                <div>
                  <h3 style={{ color:"#F9FAFB", margin:"0 0 2px", fontSize:18, fontFamily:"'Playfair Display',serif" }}>{m.name}</h3>
                  <p style={{ color:"#9CA3AF", margin:"0 0 8px", fontSize:13 }}>{m.experience}</p>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    <Badge text={m.field} color="#7C3AED" />
                    <Badge text={`${m.yearsExp}y exp`} color="#0284C7" />
                    <Badge text={`⭐ ${m.rating}`} color="#F59E0B" />
                    <Badge text={`${m.mentees} mentees`} color="#059669" />
                  </div>
                </div>
              </div>
              <div style={{ flex:1, minWidth:200 }}>
                <div style={{ marginBottom:12 }}>
                  <div style={{ color:"#9CA3AF", fontSize:12, marginBottom:6 }}>COMPATIBILITY SCORE</div>
                  <ScoreBar score={m.score} />
                </div>
                {m.sharedSkills.length > 0 && (
                  <div style={{ marginBottom:8 }}>
                    <span style={{ color:"#9CA3AF", fontSize:11 }}>Shared skills: </span>
                    {m.sharedSkills.map(s => <Badge key={s} text={s} color="#059669" />)}
                  </div>
                )}
                {m.mentorAreas && (
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {m.mentorAreas.map(a => <Badge key={a} text={a} color="#6B7280" />)}
                  </div>
                )}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8, justifyContent:"center" }}>
                <button onClick={() => { setRequested(r => [...r, m.id]); }} disabled={requested.includes(m.id)} style={{ background:requested.includes(m.id)?"rgba(16,185,129,0.15)":"linear-gradient(135deg,#7C3AED,#A855F7)", color:requested.includes(m.id)?"#10B981":"#fff", border:`1px solid ${requested.includes(m.id)?"#10B981":"transparent"}`, borderRadius:10, padding:"10px 20px", cursor:requested.includes(m.id)?"default":"pointer", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }}>
                  {requested.includes(m.id) ? "✓ Requested" : "Request Mentor"}
                </button>
                <button onClick={() => onMessage(m)} style={{ background:"rgba(255,255,255,0.05)", color:"#D1D5DB", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 20px", cursor:"pointer", fontSize:13 }}>
                  💬 Message
                </button>
              </div>
            </div>
            <p style={{ color:"#6B7280", fontSize:13, lineHeight:1.6, marginTop:16, borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:16 }}>"{m.bio}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MatchesPage;