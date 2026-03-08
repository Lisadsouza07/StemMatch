import React, { useState } from "react";

import Avatar from "../components/Avatar.jsx";

// ─── MEETINGS PAGE ────────────────────────────────────────────────────────────
function MeetingsPage({ meetings, setMeetings, matches }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ mentorId:"", date:"", time:"", topic:"" });

  const book = () => {
    if (!form.date || !form.time || !form.mentorId) return;
    const mentor = matches.find(m => m.id === parseInt(form.mentorId));
    const newMeeting = { id: Date.now(), mentor: mentor?.name || "Mentor", mentorAvatar: mentor?.avatar || "M", mentorColor: mentor?.color || "#6366F1", date: form.date, time: form.time, topic: form.topic || "General check-in", status:"pending" };
    setMeetings(prev => [...prev, newMeeting]);
    setShowForm(false);
    setForm({ mentorId:"", date:"", time:"", topic:"" });
  };

  const statusColor = { confirmed:"#10B981", pending:"#F59E0B", declined:"#EF4444" };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
        <div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:"#F9FAFB", margin:0 }}>📅 Meetings</h1>
          <p style={{ color:"#6B7280", marginTop:6 }}>Schedule and manage your mentorship sessions.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background:"linear-gradient(135deg,#7C3AED,#A855F7)", color:"#fff", border:"none", borderRadius:12, padding:"12px 24px", cursor:"pointer", fontWeight:600 }}>
          + Schedule Meeting
        </button>
      </div>

      {showForm && (
        <div style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.3)", borderRadius:16, padding:24, marginBottom:24 }}>
          <h3 style={{ color:"#A78BFA", margin:"0 0 20px", fontSize:16 }}>Request a Meeting</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div>
              <label style={{ color:"#9CA3AF", fontSize:12, fontWeight:600 }}>SELECT MENTOR</label>
              <select value={form.mentorId} onChange={e => setForm({...form, mentorId:e.target.value})} style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 12px", color:"#F9FAFB", marginTop:6, fontSize:13 }}>
                <option value="" style={{background:"#1a1a2e"}}>Choose a mentor...</option>
                {matches.map(m => <option key={m.id} value={m.id} style={{background:"#1a1a2e"}}>{m.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color:"#9CA3AF", fontSize:12, fontWeight:600 }}>TOPIC</label>
              <input value={form.topic} onChange={e => setForm({...form, topic:e.target.value})} placeholder="e.g. System Design Review" style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 12px", color:"#F9FAFB", marginTop:6, fontSize:13, boxSizing:"border-box" }} />
            </div>
            <div>
              <label style={{ color:"#9CA3AF", fontSize:12, fontWeight:600 }}>DATE</label>
              <input type="date" value={form.date} onChange={e => setForm({...form, date:e.target.value})} style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 12px", color:"#F9FAFB", marginTop:6, fontSize:13, boxSizing:"border-box" }} />
            </div>
            <div>
              <label style={{ color:"#9CA3AF", fontSize:12, fontWeight:600 }}>TIME</label>
              <input type="time" value={form.time} onChange={e => setForm({...form, time:e.target.value})} style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 12px", color:"#F9FAFB", marginTop:6, fontSize:13, boxSizing:"border-box" }} />
            </div>
          </div>
          <div style={{ display:"flex", gap:10, marginTop:16 }}>
            <button onClick={book} style={{ background:"linear-gradient(135deg,#7C3AED,#A855F7)", color:"#fff", border:"none", borderRadius:10, padding:"10px 24px", cursor:"pointer", fontWeight:600 }}>Send Request</button>
            <button onClick={() => setShowForm(false)} style={{ background:"rgba(255,255,255,0.05)", color:"#9CA3AF", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 24px", cursor:"pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {meetings.map(m => (
          <div key={m.id} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:20, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
            <Avatar initials={m.mentorAvatar} color={m.mentorColor} size={48} />
            <div style={{ flex:1 }}>
              <div style={{ color:"#F9FAFB", fontWeight:600, fontSize:15 }}>{m.mentor}</div>
              <div style={{ color:"#A78BFA", fontSize:13, marginTop:2 }}>📅 {m.date} · {m.time}</div>
              <div style={{ color:"#9CA3AF", fontSize:12, marginTop:2 }}>{m.topic}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ background:statusColor[m.status]+"22", color:statusColor[m.status], borderRadius:20, padding:"4px 14px", fontSize:12, fontWeight:600, textTransform:"capitalize" }}>
                {m.status === "confirmed" ? "✓ " : m.status === "pending" ? "⏳ " : "✕ "}{m.status}
              </span>
              {m.status === "confirmed" && <button style={{ background:"rgba(2,132,199,0.15)", color:"#38BDF8", border:"1px solid rgba(2,132,199,0.3)", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontSize:12 }}>Join →</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MeetingsPage;