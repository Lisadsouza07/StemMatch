import React, { useState, useEffect } from "react";

import LandingPage from "./pages/LandingPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MatchesPage from "./pages/MatchesPage.jsx";
import MessagesPage from "./pages/MessagesPage.jsx";
import MeetingsPage from "./pages/MeetingsPage.jsx";
import GoalsPage from "./pages/GoalsPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Avatar from "./components/Avatar.jsx";



// ─── SAMPLE DATA ──────────────────────────────────────────────────────────────
const FIELDS = ["Computer Science","Engineering","Biology","Physics","Mathematics","Data Science","Chemistry","Neuroscience","Environmental Science","Biomedical Engineering"];
const SKILLS_LIST = ["Python","Machine Learning","Data Analysis","React","Java","C++","Research","Statistics","Deep Learning","SQL","Cloud Computing","Bioinformatics","Signal Processing","Computer Vision","NLP"];
const GOALS_LIST = ["Prepare for technical interviews","Apply for internships","Learn machine learning","Publish research","Switch careers into STEM","Get a PhD","Land a senior role","Build a startup","Contribute to open source","Improve public speaking"];
const TIMEZONES = ["PST","MST","CST","EST","GMT","CET","IST","JST","AEST"];
const MENTORING_STYLES = ["Weekly check-ins","Monthly sessions","Casual / as needed","Project-based","Intensive bootcamp style"];

const SAMPLE_MENTORS = [
  { id:1, role:"mentor", name:"Dr. Aisha Patel", field:"Computer Science", experience:"Senior Software Engineer @ Google", yearsExp:12, skills:["Python","Machine Learning","Deep Learning","SQL"], goals:["Prepare for technical interviews","Land a senior role"], style:"Weekly check-ins", timezone:"PST", bio:"I've navigated big tech for 12 years and love helping women break in. Let's crack those interviews together!", avatar:"AP", color:"#7C3AED", mentorAreas:["System Design","ML Engineering","Career Growth"], rating:4.9, mentees:47 },
  { id:2, role:"mentor", name:"Prof. Elena Vasquez", field:"Biology", experience:"Associate Professor @ MIT", yearsExp:15, skills:["Research","Bioinformatics","Statistics","Python"], goals:["Publish research","Get a PhD"], style:"Monthly sessions", timezone:"EST", bio:"Research is a marathon, not a sprint. I specialize in guiding PhD candidates through the messy middle.", avatar:"EV", color:"#059669", mentorAreas:["Academic Research","Grant Writing","Lab Management"], rating:4.8, mentees:23 },
  { id:3, role:"mentor", name:"Priya Nair", field:"Data Science", experience:"Lead Data Scientist @ Netflix", yearsExp:8, skills:["Machine Learning","Python","Statistics","SQL","Data Analysis"], goals:["Apply for internships","Learn machine learning"], style:"Casual / as needed", timezone:"PST", bio:"From intern to lead in 8 years — the path is clearer than you think. Happy to share what worked.", avatar:"PN", color:"#DC2626", mentorAreas:["Data Engineering","A/B Testing","Storytelling with Data"], rating:4.9, mentees:61 },
  { id:4, role:"mentor", name:"Sarah Chen", field:"Engineering", experience:"Principal Engineer @ SpaceX", yearsExp:10, skills:["C++","Signal Processing","Computer Vision","Python"], goals:["Build a startup","Contribute to open source"], style:"Project-based", timezone:"CST", bio:"Aerospace engineering is hard, but so are you. I mentor on technical depth and leadership.", avatar:"SC", color:"#0284C7", mentorAreas:["Systems Engineering","Robotics","Technical Leadership"], rating:4.7, mentees:31 },
  { id:5, role:"mentor", name:"Dr. Maya Johnson", field:"Neuroscience", experience:"Research Director @ NIH", yearsExp:20, skills:["Research","Statistics","Bioinformatics","NLP"], goals:["Publish research","Get a PhD","Improve public speaking"], style:"Monthly sessions", timezone:"EST", bio:"Two decades of brain research. I help scientists find their voice and their funding.", avatar:"MJ", color:"#9333EA", mentorAreas:["Neuroscience Research","Science Communication","Grant Funding"], rating:5.0, mentees:18 },
  { id:6, role:"mentor", name:"Fatima Al-Hassan", field:"Mathematics", experience:"Quantitative Researcher @ Two Sigma", yearsExp:7, skills:["Python","Statistics","Machine Learning","Data Analysis"], goals:["Switch careers into STEM","Land a senior role"], style:"Weekly check-ins", timezone:"EST", bio:"Math is everywhere — especially in finance. Career-switchers welcome, no background required to start.", avatar:"FA", color:"#EA580C", mentorAreas:["Quantitative Finance","Probability Theory","Career Transition"], rating:4.8, mentees:29 },
];

const SAMPLE_MENTEES = [
  { id:101, role:"mentee", name:"Jordan Kim", email:"jordan@example.com", password:"test123", field:"Computer Science", experience:"Junior Developer", skills:["Python","React","SQL"], goals:["Prepare for technical interviews","Land a senior role"], style:"Weekly check-ins", timezone:"PST", bio:"CS grad looking to break into big tech. Love building products, hate LeetCode (but doing it anyway).", avatar:"JK", color:"#F59E0B" },
];

const SAMPLE_POSTS = [
  { id:1, author:"Priya Nair", avatar:"PN", color:"#DC2626", role:"mentor", field:"Data Science", time:"2h ago", title:"How do I prepare for my first ML internship interview?", body:"Great question I see a lot! Focus on these 3 areas: (1) SQL and pandas data wrangling, (2) basic ML concepts and when to use them, (3) a project you can talk about deeply. The interview is 80% communication and 20% code.", likes:34, comments:12, tag:"Career Advice" },
  { id:2, author:"Dr. Aisha Patel", avatar:"AP", color:"#7C3AED", role:"mentor", field:"Computer Science", time:"5h ago", title:"System design resources that actually helped me", body:"After years of interviews and mentoring, here are the resources I recommend: (1) 'Designing Data-Intensive Applications' by Kleppmann, (2) the system-design-primer GitHub repo, (3) drawing things out before coding. Visualization is underrated.", likes:67, comments:23, tag:"Resources" },
  { id:3, author:"Jordan Kim", avatar:"JK", color:"#F59E0B", role:"mentee", field:"Computer Science", time:"1d ago", title:"Finally got my first FAANG offer! 🎉", body:"After 6 months of prep and 3 failed attempts, I just got an offer from Google! Huge thanks to my mentor for mock interviews every week. This community is everything. Don't give up.", likes:203, comments:41, tag:"Win" },
  { id:4, author:"Sarah Chen", avatar:"SC", color:"#0284C7", role:"mentor", field:"Engineering", time:"1d ago", title:"Women in aerospace: what I wish I knew at 22", body:"The field can be isolating. Find your people early. Join SWE, AWA, AIAA — not just for networking, but for the reminder that you belong here. The technical skills are learnable; the community is irreplaceable.", likes:89, comments:17, tag:"Inspiration" },
];

const INITIAL_MESSAGES = {
  1: [
    { from:"mentor", text:"Hi Jordan! Excited to start working with you. What's your biggest interview challenge right now?", time:"10:30 AM" },
    { from:"mentee", text:"Honestly, system design. I freeze up when they ask me to design Twitter or Uber.", time:"10:32 AM" },
    { from:"mentor", text:"That's so common! Let's break it down. First rule: always clarify requirements before drawing anything. Can we do a mock session this Friday?", time:"10:35 AM" },
  ],
};

const INITIAL_MEETINGS = [
  { id:1, mentor:"Dr. Aisha Patel", mentorAvatar:"AP", mentorColor:"#7C3AED", date:"2026-03-15", time:"2:00 PM PST", topic:"System Design Mock Interview", status:"confirmed" },
  { id:2, mentor:"Priya Nair", mentorAvatar:"PN", mentorColor:"#DC2626", date:"2026-03-22", time:"11:00 AM PST", topic:"ML Project Review", status:"pending" },
];

const INITIAL_GOALS = [
  { id:1, title:"Complete LeetCode 150", status:"in_progress", progress:60, mentorFeedback:"Great pace! Focus on dynamic programming next.", due:"2026-04-01" },
  { id:2, title:"Build ML portfolio project", status:"not_started", progress:0, mentorFeedback:"", due:"2026-05-15" },
  { id:3, title:"Apply to 20 companies", status:"in_progress", progress:35, mentorFeedback:"Tailor your resume for each role!", due:"2026-04-30" },
  { id:4, title:"Prepare behavioral STAR stories", status:"completed", progress:100, mentorFeedback:"Excellent work — you're ready!", due:"2026-03-01" },
];

// ─── ML MATCHING ALGORITHM ────────────────────────────────────────────────────
function cosineSim(a, b) {
  const all = [...new Set([...a, ...b])];
  const va = all.map(x => a.includes(x) ? 1 : 0);
  const vb = all.map(x => b.includes(x) ? 1 : 0);
  const dot = va.reduce((s, v, i) => s + v * vb[i], 0);
  const na = Math.sqrt(va.reduce((s, v) => s + v * v, 0));
  const nb = Math.sqrt(vb.reduce((s, v) => s + v * v, 0));
  return na && nb ? dot / (na * nb) : 0;
}

function matchMentors(mentee, mentors) {
  return mentors.map(mentor => {
    const fieldSim = mentee.field === mentor.field ? 1 : (mentee.field.includes(mentor.field.split(" ")[0]) ? 0.5 : 0.1);
    const goalSim = cosineSim(mentee.goals, mentor.goals);
    const skillOverlap = cosineSim(mentee.skills, mentor.skills);
    const tzMatch = mentee.timezone === mentor.timezone ? 1 : (Math.abs(TIMEZONES.indexOf(mentee.timezone) - TIMEZONES.indexOf(mentor.timezone)) <= 2 ? 0.5 : 0.1);
    const score = 0.4 * fieldSim + 0.3 * goalSim + 0.2 * skillOverlap + 0.1 * tzMatch;
    const shared = mentee.skills.filter(s => mentor.skills.includes(s));
    const sharedGoals = mentee.goals.filter(g => mentor.goals.includes(g));
    return { ...mentor, score: Math.round(score * 100), sharedSkills: shared, sharedGoals };
  }).sort((a, b) => b.score - a.score).slice(0, 3);
}



// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard", icon:"🏠", label:"Dashboard" },
  { id:"matches", icon:"✨", label:"Mentor Matches" },
  { id:"messages", icon:"💬", label:"Messages" },
  { id:"meetings", icon:"📅", label:"Meetings" },
  { id:"goals", icon:"🎯", label:"Goals" },
  { id:"community", icon:"🌐", label:"Community" },
  { id:"profile", icon:"👤", label:"Profile" },
];

function Sidebar({ active, onNav, user, onLogout }) {
  return (
    <div style={{ width:220, background:"#0F0A1E", borderRight:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", height:"100vh", position:"fixed", left:0, top:0, zIndex:100 }}>
      <div style={{ padding:"24px 20px 16px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize:18, fontWeight:800, color:"#F9FAFB", fontFamily:"'Playfair Display',serif" }}>🔬 StemMatch</div>
        <div style={{ fontSize:11, color:"#4B5563", marginTop:2 }}>Women in STEM</div>
      </div>
      <nav style={{ flex:1, padding:"12px 0", overflowY:"auto" }}>
        {NAV.map(item => (
          <button key={item.id} onClick={() => onNav(item.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"11px 20px", background:active===item.id?"rgba(124,58,237,0.15)":"transparent", border:"none", borderRight:active===item.id?"3px solid #7C3AED":"3px solid transparent", color:active===item.id?"#A78BFA":"#6B7280", cursor:"pointer", fontSize:14, fontWeight:active===item.id?600:400, textAlign:"left", transition:"all 0.15s" }}>
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>
      <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <Avatar initials={user.avatar} color={user.color} size={32} />
          <div>
            <div style={{ color:"#E5E7EB", fontSize:13, fontWeight:600 }}>{user.name?.split(" ")[0]}</div>
            <div style={{ color:"#4B5563", fontSize:11, textTransform:"capitalize" }}>{user.role}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ width:"100%", background:"rgba(239,68,68,0.1)", color:"#EF4444", border:"1px solid rgba(239,68,68,0.2)", borderRadius:8, padding:"8px", fontSize:12, cursor:"pointer" }}>Sign Out</button>
      </div>
    </div>
  );
}


// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [activeMentorId, setActiveMentorId] = useState(1);
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : SAMPLE_MENTEES;
  });
  useEffect(() => {
  localStorage.setItem("users", JSON.stringify(users));
}, [users]);



  const handleAuth = (u) => { setUser(u); setScreen("app"); };
  const handleLogout = () => { setUser(null); setScreen("landing"); setPage("dashboard"); };

  const matches = user ? matchMentors(user, SAMPLE_MENTORS) : [];

  const goMessage = (mentor) => {
    setActiveMentorId(mentor.id);
    if (!messages[mentor.id]) setMessages(prev => ({ ...prev, [mentor.id]: [] }));
    setPage("messages");
  };

  if (screen === "landing") return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      <LandingPage onEnter={setScreen} />
    </>
  );

  if (screen === "signup" || screen === "login") return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      <AuthPage 
        mode={screen} 
        onAuth={handleAuth} 
        users={users}
        setUsers={setUsers}
      />


    </>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      <div style={{ display:"flex", fontFamily:"DM Sans, sans-serif", background:"#080611", minHeight:"100vh", color:"#F9FAFB" }}>
        <Sidebar active={page} onNav={setPage} user={user} onLogout={handleLogout} />
        <main style={{ marginLeft:220, flex:1, padding:"32px 32px 32px", maxWidth:"calc(100vw - 220px)", boxSizing:"border-box" }}>
          {page === "dashboard" && <Dashboard user={user} matches={matches} meetings={meetings} goals={goals} onNav={setPage} />}
          {page === "matches" && <MatchesPage matches={matches} onMessage={goMessage} />}
          {page === "messages" && <MessagesPage user={user} mentors={SAMPLE_MENTORS} messages={messages} setMessages={setMessages} activeMentorId={activeMentorId} setActiveMentorId={setActiveMentorId} />}
          {page === "meetings" && <MeetingsPage meetings={meetings} setMeetings={setMeetings} matches={matches} />}
          {page === "goals" && <GoalsPage goals={goals} setGoals={setGoals} />}
          {page === "community" && <CommunityPage user={user} posts={posts} setPosts={setPosts} />}
          {page === "profile" && <ProfilePage user={user} setUser={u => { setUser(u); }} />}
        </main>
      </div>
    </>
  );
}
