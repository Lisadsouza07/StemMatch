import React from "react";

import Avatar from "../components/Avatar.jsx";
import ScoreBar from "../components/ScoreBar.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Badge from "../components/Badge.jsx";



// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user, matches, meetings, goals, onNav }) {
  const activeGoals = goals.filter(g => g.status !== "completed");
  const upcomingMeetings = meetings.filter(m => m.status === "confirmed").slice(0,2);
  return (
    <div>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:"#F9FAFB", margin:0 }}>Good morning, {user.name?.split(" ")[0]} 👋</h1>
        <p style={{ color:"#6B7280", marginTop:6 }}>Here's what's happening in your mentorship journey.</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:16, marginBottom:32 }}>
        {[
          { label:"Mentor Matches", value:matches.length, icon:"✨", color:"#7C3AED", action:"matches" },
          { label:"Upcoming Meetings", value:upcomingMeetings.length, icon:"📅", color:"#059669", action:"meetings" },
          { label:"Active Goals", value:activeGoals.length, icon:"🎯", color:"#DC2626", action:"goals" },
          { label:"Unread Messages", value:3, icon:"💬", color:"#0284C7", action:"messages" },
        ].map(s => (
          <button key={s.label} onClick={() => onNav(s.action)} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:20, textAlign:"left", cursor:"pointer", transition:"all 0.2s" }}>
            <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:s.color, fontWeight:700 }}>{s.value}</div>
            <div style={{ color:"#6B7280", fontSize:12, marginTop:2 }}>{s.label}</div>
          </button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <h3 style={{ color:"#E5E7EB", margin:0, fontSize:15 }}>Top Matches</h3>
            <button onClick={() => onNav("matches")} style={{ background:"none", border:"none", color:"#7C3AED", cursor:"pointer", fontSize:12, fontWeight:600 }}>See all →</button>
          </div>
          {matches.slice(0,3).map(m => (
            <div key={m.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
              <Avatar initials={m.avatar} color={m.color} size={36} />
              <div style={{ flex:1 }}>
                <div style={{ color:"#E5E7EB", fontSize:13, fontWeight:600 }}>{m.name}</div>
                <div style={{ color:"#6B7280", fontSize:11 }}>{m.field}</div>
              </div>
              <div style={{ width: 80 }}>
                <ScoreBar score={m.score} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <h3 style={{ color:"#E5E7EB", margin:0, fontSize:15 }}>Upcoming Meetings</h3>
            <button onClick={() => onNav("meetings")} style={{ background:"none", border:"none", color:"#7C3AED", cursor:"pointer", fontSize:12, fontWeight:600 }}>See all →</button>
          </div>
          {upcomingMeetings.length ? upcomingMeetings.map(m => (
            <div key={m.id} style={{ background:"rgba(124,58,237,0.08)", borderRadius:12, padding:12, marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <Avatar initials={m.mentorAvatar} color={m.mentorColor} size={32} />
                <div>
                  <div style={{ color:"#E5E7EB", fontSize:13, fontWeight:600 }}>{m.mentor}</div>
                  <div style={{ color:"#A78BFA", fontSize:11 }}>{m.date} · {m.time}</div>
                </div>
              </div>
              <div style={{ color:"#9CA3AF", fontSize:12, marginTop:6, paddingLeft:42 }}>{m.topic}</div>
            </div>
          )) : <div style={{ color:"#4B5563", fontSize:13, padding:"20px 0", textAlign:"center" }}>No upcoming meetings</div>}
        </div>

        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:20, gridColumn:"1/-1" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <h3 style={{ color:"#E5E7EB", margin:0, fontSize:15 }}>Active Goals</h3>
            <button onClick={() => onNav("goals")} style={{ background:"none", border:"none", color:"#7C3AED", cursor:"pointer", fontSize:12, fontWeight:600 }}>Manage →</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {activeGoals.map(g => {
              const col = g.status==="completed" ? "#10B981" : g.status==="in_progress" ? "#6366F1" : "#6B7280";
              return (
                <div key={g.id} style={{ background:"rgba(255,255,255,0.02)", borderRadius:10, padding:14 }}>
                  <div style={{ color:"#E5E7EB", fontSize:13, fontWeight:600, marginBottom:6 }}>{g.title}</div>
                  <ProgressBar progress={g.progress} color={col} />
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
                    <span style={{ color:"#6B7280", fontSize:11 }}>{g.progress}% complete</span>
                    <Badge text={g.status.replace("_"," ")} color={col} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;