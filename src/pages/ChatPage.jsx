import React, { useState, useRef, useEffect } from "react";
import { useGlobal } from "../context/GlobalContext.jsx";

export default function ChatPage({ mentor, user, onBack }) {
  const { state, dispatch } = useGlobal();
  const [text, setText] = useState("");

  const matchId = mentor.id;
  const messages = state.messages?.[matchId] || [];

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
          id: Date.now(),
          text,
          senderId: user?.id, // FIXED
          timestamp: new Date().toISOString(),
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
        background: "#F0F7FF",
        color: "#1A1A1A",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "16px 20px",
          background: "#DCEBFF",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid #BBD7FF",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#1C4D8D",
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
        {messages.map((msg) => {
          const isMe = msg.senderId === user?.id; // FIXED

          return (
            <div
              key={msg.id}
              style={{
                alignSelf: isMe ? "flex-end" : "flex-start",
                background: isMe ? "#1C4D8D" : "#FFFFFF",
                color: isMe ? "white" : "#1A1A1A",
                padding: "10px 14px",
                borderRadius: 14,
                maxWidth: "70%",
                fontSize: 15,
                lineHeight: 1.4,
                border: isMe ? "none" : "1px solid #E2E8F0",
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
          background: "#DCEBFF",
          borderTop: "1px solid #BBD7FF",
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
            border: "1px solid #CBD5E0",
            outline: "none",
            fontSize: 15,
            background: "#FFFFFF",
            color: "#1A1A1A",
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
