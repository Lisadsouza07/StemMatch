import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function FullProfileSheet({ mentor, onClose, onRequest }) {
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
                src={mentor.photo}
                alt={mentor.name}
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
              {mentor.name}, {mentor.age}
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "#547792",
                marginBottom: 20,
              }}
            >
              {mentor.field}
            </div>

            {/* SECTIONS */}
            <Section title="About Me" text={mentor.aboutFull} />
            <Section title="Area of Study" text={mentor.field} />
            <Section title="Hobbies" text={mentor.hobbies?.join(", ")} />
            <Section title="Interests" text={mentor.interests?.join(", ")} />
            <Section title="Skills" text={mentor.skills?.join(", ")} />
            <Section title="Experience" text={mentor.experience} />
            <Section title="Education" text={mentor.education} />
            <Section title="Year / Role" text={mentor.year} />
            <Section title="Availability" text={mentor.availability} />

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
