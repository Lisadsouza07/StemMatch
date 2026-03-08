import React, { useState } from "react";


// ─── MESSAGES PAGE ────────────────────────────────────────────────────────────
function MessagesPage({ user, mentors, messages, setMessages, activeMentorId, setActiveMentorId }) {
  const [input, setInput] = useState("");
  const endRef = useRef();
  const activeMentor = mentors.find(m => m.id === activeMentorId) || mentors[0];
  const convo = messages[activeMentorId] || messages[1] || [];

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [convo]);

  const send = () => {
    if (!input.trim()) return;
    const key = activeMentorId || 1;
    const newMsg = { from:"mentee", text: input, time: new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}) };
    setMessages(prev => ({ ...prev, [key]: [...(prev[key]||[]), newMsg] }));
    setInput("");
  };

  return (
    <div style={{ display:"flex", height:"calc(100vh - 96px)", gap:0, background:"rgba(255,255,255,0.02)", borderRadius:20, border:"1px solid rgba(255,255,255,0.07)", overflow:"hidden" }}>
      <div style={{ width:260, borderRight:"1px solid rgba(255,255,255,0.07)", overflowY:"auto" }}>
        <div style={{ padding:"16px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <h3 style={{ color:"#F9FAFB", margin:0, fontSize:15 }}>Messages</h3>
        </div>
        {mentors.map(m => (
          <button key={m.id} onClick={() => setActiveMentorId(m.id)} style={{ width:"100%", display:"flex", gap:12, padding:"14px 16px", background:activeMentorId===m.id?"rgba(124,58,237,0.12)":"transparent", border:"none", borderBottom:"1px solid rgba(255,255,255,0.04)", cursor:"pointer", textAlign:"left" }}>
            <Avatar initials={m.avatar} color={m.color} size={40} />
            <div style={{ flex:1, overflow:"hidden" }}>
              <div style={{ color:"#E5E7EB", fontSize:13, fontWeight:600 }}>{m.name}</div>
              <div style={{ color:"#6B7280", fontSize:11, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.field}</div>
            </div>
          </button>
        ))}
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
        {activeMentor && (
          <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", gap:12 }}>
            <Avatar initials={activeMentor.avatar} color={activeMentor.color} size={40} />
            <div>
              <div style={{ color:"#F9FAFB", fontWeight:600 }}>{activeMentor.name}</div>
              <div style={{ color:"#10B981", fontSize:12 }}>● Online</div>
            </div>
          </div>
        )}
        <div style={{ flex:1, overflowY:"auto", padding:20, display:"flex", flexDirection:"column", gap:12 }}>
          {convo.map((msg, i) => (
            <div key={i} style={{ display:"flex", justifyContent:msg.from==="mentee"?"flex-end":"flex-start" }}>
              <div style={{ maxWidth:"70%", background:msg.from==="mentee"?"linear-gradient(135deg,#7C3AED,#A855F7)":"rgba(255,255,255,0.06)", color:"#F9FAFB", borderRadius:msg.from==="mentee"?"18px 18px 4px 18px":"18px 18px 18px 4px", padding:"10px 16px", fontSize:13, lineHeight:1.5 }}>
                {msg.text}
                <div style={{ color:msg.from==="mentee"?"rgba(255,255,255,0.5)":"#4B5563", fontSize:10, marginTop:4, textAlign:"right" }}>{msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div style={{ padding:"12px 20px", borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", gap:10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send()} placeholder="Type a message..." style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"12px 16px", color:"#F9FAFB", fontSize:13, outline:"none" }} />
          <button onClick={send} style={{ background:"linear-gradient(135deg,#7C3AED,#A855F7)", color:"#fff", border:"none", borderRadius:12, padding:"12px 20px", cursor:"pointer", fontSize:16 }}>➤</button>
        </div>
      </div>
    </div>
  );
}
export default MessagesPage;