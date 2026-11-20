import React, { useState, useEffect, useRef } from "react";
import "./AIWidget.css";
import { sendMessage } from "../api/ai";
import { useNavigate } from "react-router-dom";

const SUGGESTIONS = [
  "What are his skills?",
  "Tell me about his projects",
  "What is his education?",
  "How can I contact him?",
  "Is he available for hire?",
];

export default function AIWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const navigate = useNavigate();

  // Auto scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;

    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await sendMessage(q);

      if (data.type === "contact") {
        setMessages((m) => [
          ...m,
          { role: "ai", text: data.reply, action: data.action },
        ]);
      } else {
        setMessages((m) => [...m, { role: "ai", text: data.reply }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: "The assistant is temporarily unavailable. Please try again shortly.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleSuggestionClick = (s) => {
    setInput(s);
  };

  const handleClear = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <button className="aiw-btn" onClick={() => setOpen(!open)}>
        {open ? "✕" : "🤖"}
      </button>

      {/* Panel */}
      {open && (
        <div className="aiw-panel">
          {/* Header */}
          <div className="aiw-header">
            <div>
              <h3>🤖 Debasis's AI Assistant</h3>
              <p className="aiw-subtitle">Professional Portfolio Assistant</p>
            </div>
            <button className="aiw-close" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          {/* Chat messages */}
          <div className="aiw-chat-box" ref={chatRef}>
            {messages.length === 0 && (
              <p className="aiw-empty">
                Hello. I am the AI assistant representing Debasis Pramanik, a
                MERN Stack Developer. Ask me about his skills, projects,
                education, or how to contact him.
              </p>
            )}

            {messages.map((m, i) => (
              <div key={i} className="aiw-msg">
                <p className="aiw-msg-text">
                  <b>{m.role === "user" ? "You" : "AI"}:</b> {m.text}
                </p>
                {m.action && (
                  <button
                    className="aiw-action-btn"
                    onClick={() => {
                      navigate(m.action);
                      setOpen(false);
                    }}
                  >
                    📧 Go to Contact Page
                  </button>
                )}
              </div>
            ))}

            {loading && (
              <p className="aiw-msg-text">
                <b>AI:</b> typing...
              </p>
            )}
          </div>

          {/* Suggestion chips */}
          <div className="aiw-suggestions">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                className="aiw-chip"
                onClick={() => handleSuggestionClick(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="aiw-chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
            />
            <button onClick={() => handleSend()}>Send</button>
          </div>

          {/* Clear chat */}
          <div className="aiw-footer">
            <button className="aiw-clear" onClick={handleClear}>
              🗑 Clear Chat
            </button>
          </div>
        </div>
      )}
    </>
  );
}