import React, { useState } from "react";

import Avatar from "../components/Avatar.jsx";
import Badge from "../components/Badge.jsx";

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage({ user, setUser }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);

  const save = () => { setUser(form); setEditing(false); };

  const toggleSkill = (s) => setForm(f => ({ ...f, skills: f.skills?.includes(s) ? f.skills.filter(x=>x!==s) : [...(f.skills||[]), s] }));
  const toggleGoal = (g) => setForm(f => ({ ...f, goals: f.goals?.includes(g) ? f.goals.filter(x=>x!==g) : [...(f.goals||[]), g] }));

  const FIELDS = [
  "Computer Science",
  "Software Engineering",
  "Data Science",
  "Cybersecurity",
  "AI / Machine Learning",
  "Biotech",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Physics",
  "Mathematics",
  "Chemistry",
];
const TIMEZONES = [
  "UTC−8 (PST)",
  "UTC−7 (MST)",
  "UTC−6 (CST)",
  "UTC−5 (EST)",
  "UTC+0 (GMT)",
  "UTC+1 (CET)",
  "UTC+5:30 (IST)",
];
const SKILLS_LIST = [
  "Python",
  "JavaScript",
  "C++",
  "Machine Learning",
  "Data Analysis",
  "UI/UX Design",
  "Project Management",
  "Public Speaking",
];
const GOALS_LIST = [
  "Get a mentor",
  "Improve coding skills",
  "Build a portfolio",
  "Prepare for internships",
  "Grow confidence",
  "Explore STEM fields",
];




  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:"#F9FAFB", margin:0 }}>👤 Your Profile</h1>
        <button onClick={() => editing ? save() : setEditing(true)} style={{ background:editing?"linear-gradient(135deg,#059669,#10B981)":"linear-gradient(135deg,#7C3AED,#A855F7)", color:"#fff", border:"none", borderRadius:12, padding:"12px 24px", cursor:"pointer", fontWeight:600 }}>
          {editing ? "💾 Save Changes" : "✏️ Edit Profile"}
        </button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:20 }}>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:24, textAlign:"center", alignSelf:"start" }}>
          <Avatar initials={user.avatar} color={user.color} size={80} />
          <div style={{ marginTop:12 }}>
            <div style={{ color:"#F9FAFB", fontSize:18, fontWeight:700, fontFamily:"'Playfair Display',serif" }}>{user.name}</div>
            <div style={{ color:"#A78BFA", fontSize:13, marginTop:4, textTransform:"capitalize" }}>🌟 {user.role}</div>
            <div style={{ color:"#6B7280", fontSize:12, marginTop:2 }}>{user.field}</div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", marginTop:20, paddingTop:20 }}>
            {[["Field",user.field||"Not set"],["Timezone",user.timezone],["Style",user.style]].map(([k,v]) => (
              <div key={k} style={{ marginBottom:12 }}>
                <div style={{ color:"#4B5563", fontSize:11, fontWeight:600, letterSpacing:0.5 }}>{k.toUpperCase()}</div>
                <div style={{ color:"#D1D5DB", fontSize:13, marginTop:2 }}>{v||"—"}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {editing ? (
            <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:24 }}>
              <h3 style={{ color:"#E5E7EB", margin:"0 0 20px", fontSize:15 }}>Edit Details</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {[["Name","name","text"],["Experience","experience","text"]].map(([l,k,t]) => (
                  <div key={k}>
                    <label style={{ color:"#9CA3AF", fontSize:11, fontWeight:600 }}>{l.toUpperCase()}</label>
                    <input type={t} value={form[k]||""} onChange={e => setForm({...form,[k]:e.target.value})} style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 12px", color:"#F9FAFB", marginTop:6, fontSize:13, boxSizing:"border-box" }} />
                  </div>
                ))}
                <div>
                  <label style={{ color:"#9CA3AF", fontSize:11, fontWeight:600 }}>FIELD</label>
                  <select value={form.field||""} onChange={e => setForm({...form, field:e.target.value})} style={{ width:"100%", background:"rgba(30,20,60,0.9)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 12px", color:"#F9FAFB", marginTop:6, fontSize:13 }}>
                    {FIELDS.map(f => <option key={f} value={f} style={{background:"#1a1a2e"}}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color:"#9CA3AF", fontSize:11, fontWeight:600 }}>TIMEZONE</label>
                  <select value={form.timezone||""} onChange={e => setForm({...form, timezone:e.target.value})} style={{ width:"100%", background:"rgba(30,20,60,0.9)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 12px", color:"#F9FAFB", marginTop:6, fontSize:13 }}>
                    {TIMEZONES.map(t => <option key={t} value={t} style={{background:"#1a1a2e"}}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginTop:14 }}>
                <label style={{ color:"#9CA3AF", fontSize:11, fontWeight:600 }}>BIO</label>
                <textarea value={form.bio||""} onChange={e => setForm({...form, bio:e.target.value})} rows={3} style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 12px", color:"#F9FAFB", marginTop:6, fontSize:13, resize:"vertical", boxSizing:"border-box" }} />
              </div>
              <div style={{ marginTop:14 }}>
                <label style={{ color:"#9CA3AF", fontSize:11, fontWeight:600, display:"block", marginBottom:8 }}>SKILLS</label>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {SKILLS_LIST.map(s => <button key={s} onClick={() => toggleSkill(s)} style={{ background:form.skills?.includes(s)?"rgba(99,102,241,0.25)":"rgba(255,255,255,0.04)", color:form.skills?.includes(s)?"#A5B4FC":"#6B7280", border:`1px solid ${form.skills?.includes(s)?"#6366F1":"rgba(255,255,255,0.1)"}`, borderRadius:20, padding:"4px 12px", cursor:"pointer", fontSize:12, fontWeight:600 }}>{s}</button>)}
                </div>
              </div>
              <div style={{ marginTop:14 }}>
                <label style={{ color:"#9CA3AF", fontSize:11, fontWeight:600, display:"block", marginBottom:8 }}>CAREER GOALS</label>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {GOALS_LIST.map(g => <button key={g} onClick={() => toggleGoal(g)} style={{ background:form.goals?.includes(g)?"rgba(16,185,129,0.2)":"rgba(255,255,255,0.04)", color:form.goals?.includes(g)?"#34D399":"#6B7280", border:`1px solid ${form.goals?.includes(g)?"#10B981":"rgba(255,255,255,0.1)"}`, borderRadius:20, padding:"4px 12px", cursor:"pointer", fontSize:12 }}>{g}</button>)}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:24 }}>
                <h3 style={{ color:"#E5E7EB", margin:"0 0 12px", fontSize:15 }}>About</h3>
                <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.7, margin:0 }}>{user.bio || "No bio yet — click Edit Profile to add one!"}</p>
              </div>
              <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:24 }}>
                <h3 style={{ color:"#E5E7EB", margin:"0 0 14px", fontSize:15 }}>Skills</h3>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {user.skills?.length ? user.skills.map(s => <Badge key={s} text={s} color="#6366F1" />) : <span style={{ color:"#4B5563", fontSize:13 }}>No skills added yet</span>}
                </div>
              </div>
              <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:24 }}>
                <h3 style={{ color:"#E5E7EB", margin:"0 0 14px", fontSize:15 }}>Career Goals</h3>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {user.goals?.length ? user.goals.map(g => <Badge key={g} text={g} color="#059669" />) : <span style={{ color:"#4B5563", fontSize:13 }}>No goals added yet</span>}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;