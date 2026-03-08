import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FiChevronUp } from "react-icons/fi";
import aishaPhoto from "../assets/Irene_[IG] update.jfif";

const BLUE_DARK = "#0A2463";
const BLUE_MID = "#1B5BE8";
const BLUE_PALE = "#D6E4FF";
const WHITE = "#FFFFFF";

export default function MentorCard({
  mentor,
  onExpand,
  onSwipeLeft,
  onSwipeRight,
}) {
  // Support both old format and Firebase format
  const name = mentor.name || "Unknown Mentor";
  const age = mentor.age || ""; // Ages not always available
  const photo = mentor.photo || (
    // Fallback: Create a colored avatar background with initials
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='${encodeURIComponent(mentor.color || "%231B5BE8")}' width='400' height='400'/%3E%3Ctext x='50%' y='50%' font-size='120' font-weight='bold' text-anchor='middle' dominant-baseline='central' fill='white' font-family='Sora'%3E${mentor.avatar || mentor.name?.slice(0, 2).toUpperCase() || "M"}%3C/text%3E%3C/svg%3E`
  );
  const aboutShort = mentor.aboutShort || mentor.bio || mentor.field || "Mentor";
  const compatibilityScore = mentor.compatibilityScore || 85;
  const skills = mentor.skills || [];
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const opacity = useTransform(x, [-300, 0, 300], [0.4, 1, 0.4]);

  const handleDragEnd = (_, info) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset > 120 || velocity > 800) {
      onSwipeRight();
      return;
    }
    if (offset < -120 || velocity < -800) {
      onSwipeLeft();
      return;
    }
  };

  return (
    <motion.div
      style={{
        width: "100%",
        maxWidth: 380,
        margin: "0 auto",
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(10,36,99,0.18)",
        background: WHITE,
        fontFamily: "'Sora', sans-serif",
        x,
        rotate,
        opacity,
        cursor: "grab",
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      onDragEnd={handleDragEnd}
    >
      {/* PHOTO — fixed height, face aligned to top */}
      <div
        style={{
          width: "100%",
          height: 380,
          overflow: "hidden",
          position: "relative",
          background: BLUE_PALE,
        }}
      >
        <img
          src={photo}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 15%",
            display: "block",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background: `linear-gradient(to top, ${BLUE_DARK}F0 0%, transparent 100%)`,
          }}
        />

        {/* Compatibility badge */}
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: BLUE_MID,
            borderRadius: 14,
            padding: "6px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 4px 14px rgba(27,91,232,0.5)",
          }}
        >
          <span
            style={{
              color: WHITE,
              fontWeight: 800,
              fontSize: 17,
              lineHeight: 1.1,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {compatibilityScore}%
          </span>
          <span
            style={{
              color: BLUE_PALE,
              fontWeight: 700,
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            Match
          </span>
        </div>

        {/* Name + title over photo */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 18,
            right: 18,
          }}
        >
          <div
            style={{
              fontSize: 21,
              fontWeight: 800,
              color: WHITE,
              letterSpacing: "-0.3px",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {name}{age ? `, ${age}` : ""}
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: BLUE_PALE,
              marginTop: 3,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {aboutShort}
          </div>
        </div>
      </div>

      {/* INFO SECTION */}
      <div style={{ padding: "14px 18px 18px", background: WHITE }}>
        {/* Tags */}
        {skills && skills.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 12,
            }}
          >
            {skills.map((tag) => (
              <span
                key={tag}
                style={{
                  background: BLUE_PALE,
                  color: BLUE_MID,
                  borderRadius: 20,
                  padding: "4px 11px",
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Short bio */}
        {aboutShort && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#4A5568",
              lineHeight: 1.6,
              marginBottom: 12,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {aboutShort}
          </div>
        )}

        {/* Expand button */}
        <button
          onClick={onExpand}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: BLUE_MID,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 700,
            padding: 0,
            fontFamily: "'Sora', sans-serif",
          }}
        >
          More Info <FiChevronUp size={16} />
        </button>
      </div>
    </motion.div>
  );
}