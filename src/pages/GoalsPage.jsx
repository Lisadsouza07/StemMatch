import React, { useState } from "react";

import ProgressBar from "../components/ProgressBar.jsx";

// ─── GOALS PAGE ───────────────────────────────────────────────────────────────
function GoalsPage({ goals, setGoals }) {
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ title:"", due:"" });

  const add = () => {
    if (!newGoal.title) return;
    setGoals(prev => [...prev, { id:Date.now(), title:newGoal.title, status:"not_started", progress:0, mentorFeedback:"", due:newGoal.due }]);
    setShowForm(false);
    setNewGoal({ title:"", due:"" });
  };

  const cycle = (id) => {
    setGoals(prev => prev.map(g => {
      if (g.id !== id) return g;
      const next = { not_started:"in_progress", in_progress:"completed", completed:"not_started" }[g.status];
      return { ...g, status:next, progress:next==="completed"?100:next==="in_progress"?Math.max(g.progress,10):0 };
    }));
  };

  const statusColor = { not_started:"#6B7280", in_progress:"#6366F1", completed:"#10B981" };
  const statusLabel = { not_started:"Not Started", in_progress:"In Progress", completed:"Completed" };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
        <div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:"#F9FAFB", margin:0 }}>🎯 Career Goals</h1>
          <p style={{ color:"#6B7280", marginTop:6 }}>Track your mentorship milestones and career progress.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background:"linear-gradient(135deg,#7C3AED,#A855F7)", color:"#fff", border:"none", borderRadius:12, padding:"12px 24px", cursor:"pointer", fontWeight:600 }}>+ Add Goal</button>
      </div>

      {showForm && (
        <div style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.3)", borderRadius:16, padding:20, marginBottom:24 }}>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <input value={newGoal.title} onChange={e => setNewGoal({...newGoal, title:e.target.value})} placeholder="e.g. Land a Google internship" style={{ flex:1, minWidth:200, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 14px", color:"#F9FAFB", fontSize:13 }} />
            <input type="date" value={newGoal.due} onChange={e => setNewGoal({...newGoal, due:e.target.value})} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 14px", color:"#F9FAFB", fontSize:13 }} />
            <button onClick={add} style={{ background:"linear-gradient(135deg,#7C3AED,#A855F7)", color:"#fff", border:"none", borderRadius:10, padding:"10px 20px", cursor:"pointer", fontWeight:600 }}>Add</button>
            <button onClick={() => setShowForm(false)} style={{ background:"rgba(255,255,255,0.05)", color:"#9CA3AF", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 20px", cursor:"pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
        {goals.map(g => {
          const col = statusColor[g.status];
          return (
            <div key={g.id} style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${col}44`, borderRadius:16, padding:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <h3 style={{ color:"#F9FAFB", margin:0, fontSize:14, fontWeight:600, flex:1, lineHeight:1.4 }}>{g.title}</h3>
                <button onClick={() => cycle(g.id)} style={{ background:col+"22", color:col, border:`1px solid ${col}44`, borderRadius:20, padding:"3px 10px", cursor:"pointer", fontSize:10, fontWeight:700, whiteSpace:"nowrap", marginLeft:8 }}>
                  {statusLabel[g.status]}
                </button>
              </div>
              <ProgressBar progress={g.progress} color={col} />
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
                <span style={{ color:"#6B7280", fontSize:11 }}>{g.progress}%</span>
                {g.due && <span style={{ color:"#6B7280", fontSize:11 }}>Due {g.due}</span>}
              </div>
              {g.mentorFeedback && (
                <div style={{ background:"rgba(124,58,237,0.08)", borderRadius:10, padding:"10px 12px", marginTop:12 }}>
                  <span style={{ color:"#A78BFA", fontSize:11, fontWeight:600 }}>✨ MENTOR FEEDBACK</span>
                  <p style={{ color:"#D1D5DB", fontSize:12, margin:"4px 0 0", lineHeight:1.5 }}>{g.mentorFeedback}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GoalsPage;