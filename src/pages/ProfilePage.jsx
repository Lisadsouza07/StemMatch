import React, { useState } from "react";
import Avatar from "../components/Avatar.jsx";
import Badge from "../components/Badge.jsx";

const BLUE_DARK = "#0A2463";
const BLUE_MID = "#1B5BE8";
const BLUE_PALE = "#D6E4FF";
const WHITE = "#FFFFFF";

const FIELDS = [
  "Computer Science", "Software Engineering", "Data Science",
  "Cybersecurity", "AI / Machine Learning", "Biotech",
  "Mechanical Engineering", "Electrical Engineering",
  "Physics", "Mathematics", "Chemistry",
];
const TIMEZONES = [
  "UTC−8 (PST)", "UTC−7 (MST)", "UTC−6 (CST)",
  "UTC−5 (EST)", "UTC+0 (GMT)", "UTC+1 (CET)", "UTC+5:30 (IST)",
];
const SKILLS_LIST = [
  "Python", "JavaScript", "C++", "Machine Learning",
  "Data Analysis", "UI/UX Design", "Project Management", "Public Speaking",
];
const GOALS_LIST = [
  "Get a mentor", "Improve coding skills", "Build a portfolio",
  "Prepare for internships", "Grow confidence", "Explore STEM fields",
];

const card = {
  background: WHITE,
  border: `1px solid ${BLUE_PALE}`,
  borderRadius: 20,
  padding: 24,
  boxShadow: "0 4px 20px rgba(10,36,99,0.07)",
};

const labelStyle = {
  color: BLUE_MID,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.8px",
  textTransform: "uppercase",
  fontFamily: "'Sora', sans-serif",
};

const inputStyle = {
  width: "100%",
  background: "#F8FAFF",
  border: `1px solid ${BLUE_PALE}`,
  borderRadius: 10,
  padding: "10px 12px",
  color: "#111",
  marginTop: 6,
  fontSize: 13,
  fontFamily: "'Sora', sans-serif",
  boxSizing: "border-box",
  outline: "none",
};

function ProfilePage({ user, setUser }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);

  const save = () => { setUser(form); setEditing(false); };

  const toggleSkill = (s) => setForm(f => ({
    ...f, skills: f.skills?.includes(s)
      ? f.skills.filter(x => x !== s)
      : [...(f.skills || []), s]
  }));

  const toggleGoal = (g) => setForm(f => ({
    ...f, goals: f.goals?.includes(g)
      ? f.goals.filter(x => x !== g)
      : [...(f.goals || []), g]
  }));

  return (
    <div style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        input:focus, textarea:focus, select:focus { border-color: #1B5BE8 !important; outline: none; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: BLUE_DARK, margin: 0, letterSpacing: "-0.5px" }}>
          👤 Your Profile
        </h1>
        <button
          onClick={() => editing ? save() : setEditing(true)}
          style={{
            background: editing
              ? "linear-gradient(135deg, #059669, #10B981)"
              : `linear-gradient(135deg, ${BLUE_MID}, #3B82F6)`,
            color: WHITE,
            border: "none",
            borderRadius: 12,
            padding: "12px 24px",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 14,
            fontFamily: "'Sora', sans-serif",
            boxShadow: editing
              ? "0 4px 14px rgba(5,150,105,0.35)"
              : "0 4px 14px rgba(27,91,232,0.35)",
          }}
        >
          {editing ? "💾 Save Changes" : "✏️ Edit Profile"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>

        {/* Left — user card */}
        <div style={{ ...card, textAlign: "center", alignSelf: "start" }}>
          <Avatar initials={user.avatar} color={BLUE_MID} size={80} />
          <div style={{ marginTop: 12 }}>
            <div style={{ color: BLUE_DARK, fontSize: 18, fontWeight: 800 }}>{user.name}</div>
            <div style={{ color: BLUE_MID, fontSize: 13, marginTop: 4, textTransform: "capitalize", fontWeight: 600 }}>
              🌟 {user.role}
            </div>
            <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>{user.field}</div>
          </div>

          <div style={{ borderTop: `1px solid ${BLUE_PALE}`, marginTop: 20, paddingTop: 20 }}>
            {[["Field", user.field || "Not set"], ["Timezone", user.timezone], ["Style", user.style]].map(([k, v]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <div style={{ ...labelStyle }}>{k}</div>
                <div style={{ color: "#333", fontSize: 13, marginTop: 2, fontWeight: 600 }}>{v || "—"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {editing ? (
            <div style={card}>
              <h3 style={{ color: BLUE_DARK, margin: "0 0 20px", fontSize: 16, fontWeight: 800 }}>Edit Details</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[["Name", "name", "text"], ["Experience", "experience", "text"]].map(([l, k, t]) => (
                  <div key={k}>
                    <label style={labelStyle}>{l}</label>
                    <input
                      type={t}
                      value={form[k] || ""}
                      onChange={e => setForm({ ...form, [k]: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                ))}

                <div>
                  <label style={labelStyle}>Field</label>
                  <select
                    value={form.field || ""}
                    onChange={e => setForm({ ...form, field: e.target.value })}
                    style={inputStyle}
                  >
                    {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Timezone</label>
                  <select
                    value={form.timezone || ""}
                    onChange={e => setForm({ ...form, timezone: e.target.value })}
                    style={inputStyle}
                  >
                    {TIMEZONES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <label style={labelStyle}>Bio</label>
                <textarea
                  value={form.bio || ""}
                  onChange={e => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <div style={{ marginTop: 14 }}>
                <label style={{ ...labelStyle, display: "block", marginBottom: 8 }}>Skills</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {SKILLS_LIST.map(s => (
                    <button key={s} onClick={() => toggleSkill(s)} style={{
                      background: form.skills?.includes(s) ? BLUE_PALE : "#F8FAFF",
                      color: form.skills?.includes(s) ? BLUE_MID : "#666",
                      border: `1.5px solid ${form.skills?.includes(s) ? BLUE_MID : BLUE_PALE}`,
                      borderRadius: 20, padding: "4px 12px",
                      cursor: "pointer", fontSize: 12, fontWeight: 700,
                      fontFamily: "'Sora', sans-serif",
                    }}>{s}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <label style={{ ...labelStyle, display: "block", marginBottom: 8 }}>Career Goals</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {GOALS_LIST.map(g => (
                    <button key={g} onClick={() => toggleGoal(g)} style={{
                      background: form.goals?.includes(g) ? "#D1FAE5" : "#F8FAFF",
                      color: form.goals?.includes(g) ? "#059669" : "#666",
                      border: `1.5px solid ${form.goals?.includes(g) ? "#10B981" : BLUE_PALE}`,
                      borderRadius: 20, padding: "4px 12px",
                      cursor: "pointer", fontSize: 12, fontWeight: 700,
                      fontFamily: "'Sora', sans-serif",
                    }}>{g}</button>
                  ))}
                </div>
              </div>
            </div>

          ) : (
            <>
              <div style={card}>
                <h3 style={{ color: BLUE_MID, margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>About</h3>
                <p style={{ color: "#333", fontSize: 13, lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                  {user.bio || "No bio yet — click Edit Profile to add one!"}
                </p>
              </div>

              <div style={card}>
                <h3 style={{ color: BLUE_MID, margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Skills</h3>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {user.skills?.length
                    ? user.skills.map(s => <Badge key={s} text={s} color={BLUE_MID} />)
                    : <span style={{ color: "#999", fontSize: 13 }}>No skills added yet</span>}
                </div>
              </div>

              <div style={card}>
                <h3 style={{ color: BLUE_MID, margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Career Goals</h3>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {user.goals?.length
                    ? user.goals.map(g => <Badge key={g} text={g} color="#059669" />)
                    : <span style={{ color: "#999", fontSize: 13 }}>No goals added yet</span>}
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