import React, { useState } from "react";

import Avatar from "../components/Avatar.jsx";
import Badge from "../components/Badge.jsx";

// ─── COMMUNITY PAGE ───────────────────────────────────────────────────────────
function CommunityPage({ user, posts, setPosts }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:"", body:"", tag:"Question" });
  const [liked, setLiked] = useState([]);
  const tags = ["Question","Career Advice","Resources","Win","Inspiration","Research"];
  const tagColors = { Question:"#7C3AED", "Career Advice":"#059669", Resources:"#0284C7", Win:"#F59E0B", Inspiration:"#DC2626", Research:"#9333EA" };

  const post = () => {
    if (!form.title || !form.body) return;
    const newPost = { id:Date.now(), author:user.name, avatar:user.avatar, color:user.color, role:user.role, field:user.field||"STEM", time:"Just now", title:form.title, body:form.body, likes:0, comments:0, tag:form.tag };
    setPosts(prev => [newPost, ...prev]);
    setShowForm(false);
    setForm({ title:"", body:"", tag:"Question" });
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
        <div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:"#F9FAFB", margin:0 }}>🌐 Community</h1>
          <p style={{ color:"#6B7280", marginTop:6 }}>Advice, wins, and wisdom from the STEM community.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background:"linear-gradient(135deg,#7C3AED,#A855F7)", color:"#fff", border:"none", borderRadius:12, padding:"12px 24px", cursor:"pointer", fontWeight:600 }}>+ Post</button>
      </div>

      {showForm && (
        <div style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.3)", borderRadius:16, padding:24, marginBottom:24 }}>
          <input value={form.title} onChange={e => setForm({...form, title:e.target.value})} placeholder="Title your post..." style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"12px 14px", color:"#F9FAFB", fontSize:14, fontWeight:600, marginBottom:10, boxSizing:"border-box" }} />
          <textarea value={form.body} onChange={e => setForm({...form, body:e.target.value})} placeholder="Share your thoughts, question, or advice..." rows={4} style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"12px 14px", color:"#F9FAFB", fontSize:13, resize:"vertical", marginBottom:10, boxSizing:"border-box", lineHeight:1.6 }} />
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
            {tags.map(t => <button key={t} onClick={() => setForm({...form, tag:t})} style={{ background:form.tag===t?tagColors[t]+"33":"rgba(255,255,255,0.05)", color:form.tag===t?tagColors[t]:"#9CA3AF", border:`1px solid ${form.tag===t?tagColors[t]:"rgba(255,255,255,0.1)"}`, borderRadius:20, padding:"4px 14px", cursor:"pointer", fontSize:12, fontWeight:600 }}>{t}</button>)}
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={post} style={{ background:"linear-gradient(135deg,#7C3AED,#A855F7)", color:"#fff", border:"none", borderRadius:10, padding:"10px 24px", cursor:"pointer", fontWeight:600 }}>Publish</button>
            <button onClick={() => setShowForm(false)} style={{ background:"rgba(255,255,255,0.05)", color:"#9CA3AF", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 24px", cursor:"pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {posts.map(p => (
          <div key={p.id} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:24 }}>
            <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
              <Avatar initials={p.avatar} color={p.color} size={44} />
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap", marginBottom:6 }}>
                  <span style={{ color:"#E5E7EB", fontWeight:700, fontSize:14 }}>{p.author}</span>
                  <Badge text={p.role} color={p.role==="mentor"?"#7C3AED":"#059669"} />
                  <Badge text={p.field} color="#6B7280" />
                  <Badge text={p.tag} color={tagColors[p.tag]||"#6366F1"} />
                  <span style={{ color:"#4B5563", fontSize:12, marginLeft:"auto" }}>{p.time}</span>
                </div>
                <h3 style={{ color:"#F9FAFB", margin:"0 0 8px", fontSize:15 }}>{p.title}</h3>
                <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.7, margin:0 }}>{p.body}</p>
                <div style={{ display:"flex", gap:16, marginTop:14 }}>
                  <button onClick={() => setLiked(l => l.includes(p.id) ? l.filter(x=>x!==p.id) : [...l,p.id])} style={{ background:"none", border:"none", color:liked.includes(p.id)?"#EF4444":"#6B7280", cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", gap:4 }}>
                    {liked.includes(p.id)?"❤️":"🤍"} {p.likes + (liked.includes(p.id)?1:0)}
                  </button>
                  <button style={{ background:"none", border:"none", color:"#6B7280", cursor:"pointer", fontSize:13 }}>💬 {p.comments} comments</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityPage;