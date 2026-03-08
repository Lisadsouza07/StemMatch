import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import CompatibilityBar from "./CompatibilityBar.jsx";
import { FiChevronUp } from "react-icons/fi";

export default function MentorCard({
  mentor,
  onExpand,
  onSwipeLeft,
  onSwipeRight,
}) {
  const x = useMotionValue(0);

  // Tilt the card based on drag direction
  const rotate = useTransform(x, [-200, 200], [-12, 12]);

  // Opacity fades slightly as card moves away
  const opacity = useTransform(x, [-300, 0, 300], [0.4, 1, 0.4]);

  const handleDragEnd = (_, info) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    // Swipe Right (Request)
    if (offset > 120 || velocity > 800) {
      onSwipeRight();
      return;
    }

    // Swipe Left (Skip)
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
        boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
        background: "#1A1F2B",
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
      {/* PHOTO */}
      <div style={{ width: "100%", height: 420, overflow: "hidden" }}>
        <img
          src={mentor.photo}
          alt={mentor.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px 20px 0 0",
          }}
        />
      </div>

      {/* FLOATING INFO CARD */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "18px 20px 26px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* NAME + AGE */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#F7F8F0",
            marginBottom: 6,
          }}
        >
          {mentor.name}, {mentor.age}
        </div>

        {/* COMPATIBILITY BAR */}
        <CompatibilityBar value={mentor.compatibility} />

        {/* SHORT ABOUT ME */}
        <div
          style={{
            marginTop: 10,
            fontSize: 14,
            color: "#D0D6E0",
            lineHeight: 1.4,
            maxHeight: 40,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {mentor.aboutShort}
        </div>

        {/* EXPAND ARROW */}
        <button
          onClick={onExpand}
          style={{
            marginTop: 14,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#BDE8F5",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          More Info <FiChevronUp size={18} />
        </button>
      </div>
    </motion.div>
  );
}
