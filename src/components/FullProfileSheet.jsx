import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function FullProfileSheet({ mentor, onClose, onRequest }) {
  if (!mentor) return null;

  // Support both old format and Firebase format
  const name = mentor.name || "Unknown";
  const age = mentor.age || "";
  const photo = mentor.photo || (
    // Fallback: Create a colored avatar background with initials
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='240'%3E%3Crect fill='${encodeURIComponent(mentor.color || "%231B5BE8")}' width='200' height='240'/%3E%3Ctext x='50%' y='50%' font-size='80' font-weight='bold' text-anchor='middle' dominant-baseline='central' fill='white' font-family='Sora'%3E${mentor.avatar || mentor.name?.slice(0, 2).toUpperCase() || "M"}%3C/text%3E%3C/svg%3E`
  );
  const field = mentor.field || "Field Not Specified";
  const aboutFull = mentor.aboutFull || mentor.bio || "";
  const hobbies = mentor.hobbies || [];
  const interests = mentor.interests || [];
  const skills = mentor.skills || [];
  const experience = mentor.experience || "";
  const education = mentor.education || "";
  const year = mentor.year || "";
  const availability = mentor.availability || "";

  return (
    <AnimatePresence>
      {mentor && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "#000",
              zIndex: 998,
            }}
          />

          {/* SLIDE-UP PANEL */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "80vh",
              background: "#EAE0CF",
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              boxShadow: "0 -8px 24px rgba(0,0,0,0.25)",
              padding: "20px 24px",
              overflowY: "auto",
              zIndex: 999,
            }}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 16,
                right: 20,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#213448",
              }}
            >
              <FiX size={26} />
            </button>

            {/* DRAG HANDLE */}
            <div
              style={{
                width: 50,
                height: 5,
                background: "#C8C8C8",
                borderRadius: 4,
                margin: "0 auto 16px",
              }}
            />

            {/* PHOTO */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <img
                src={photo}
                alt={name}
                style={{
                  width: 140,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 20,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                }}
              />
            </div>

            {/* NAME + FIELD */}
            <div
              style={{
                textAlign: "center",
                fontSize: 26,
                fontWeight: 700,
                color: "#213448",
                marginBottom: 4,
              }}
            >
              {name}{age ? `, ${age}` : ""}
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "#547792",
                marginBottom: 20,
              }}
            >
              {field}
            </div>

            {/* SECTIONS */}
            <Section title="About Me" text={aboutFull} />
            <Section title="Area of Study" text={field} />
            <Section title="Hobbies" text={hobbies.length > 0 ? hobbies.join(", ") : undefined} />
            <Section title="Interests" text={interests.length > 0 ? interests.join(", ") : undefined} />
            <Section title="Skills" text={skills.length > 0 ? skills.join(", ") : undefined} />
            <Section title="Experience" text={experience} />
            <Section title="Education" text={education} />
            <Section title="Year / Role" text={year} />
            <Section title="Availability" text={availability} />

            {/* REQUEST BUTTON */}
            <button
              onClick={onRequest}
              style={{
                width: "100%",
                padding: "14px 0",
                marginTop: 24,
                background: "#1C4D8D",
                color: "white",
                border: "none",
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              Request Mentorship
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ title, text }) {
  if (!text) return null;

  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#213448",
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 15,
          color: "#547792",
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
}
