import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MatchToast({ show, mentorName, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 1800);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            position: "fixed",
            bottom: 90,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1C4D8D",
            color: "white",
            padding: "14px 22px",
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 600,
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            zIndex: 9999,
          }}
        >
          You matched with {mentorName}!
        </motion.div>
      )}
    </AnimatePresence>
  );
}
