import React, { useState, useRef, useEffect } from "react";
import { useGlobal } from "../context/GlobalContext.jsx";

export default function ChatPage({ mentor, onBack }) {
  const { state, dispatch } = useGlobal();
  const [text, setText] = useState("");

  const matchId = mentor.id; // unique chat ID per mentor
  const messages = state.messages[matchId] || [];

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    dispatch({
      type: "SEND_MESSAGE",
      payload: {
        matchId,
        message: {
          senderId: state.currentUser.id,
          text,
          timestamp: Date.now(),
        },
      },
    });

    setText("");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#1A2533",
        color: "white",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "16px 20px",
          background: "#213448",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#BDE8F5",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <img
          src={mentor.photo}
          alt={mentor.name}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div style={{ fontSize: 18, fontWeight: 700 }}>{mentor.name}</div>
      </div>

      {/* MESSAGES */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {messages.map((msg, i) => {
          const isMe = msg.senderId === state.currentUser.id;

          return (
            <div
              key={i}
              style={{
                alignSelf: isMe ? "flex-end" : "flex-start",
                background: isMe ? "#1C4D8D" : "rgba(255,255,255,0.1)",
                padding: "10px 14px",
                borderRadius: 14,
                maxWidth: "70%",
                fontSize: 15,
                lineHeight: 1.4,
              }}
            >
              {msg.text}
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* INPUT BAR */}
      <div
        style={{
          padding: "14px 20px",
          display: "flex",
          gap: 10,
          background: "#213448",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: 12,
            border: "none",
            outline: "none",
            fontSize: 15,
            background: "rgba(255,255,255,0.1)",
            color: "white",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            border: "none",
            background: "#1C4D8D",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
