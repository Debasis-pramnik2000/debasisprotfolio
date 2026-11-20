import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot field — real users never touch this
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post(
        "https://render-backend-ygjf.onrender.com/api/contact",
        formData
      );

      // Backend returns { success: true, message: "Email Sent Successfully" }
      setStatus(res.data.message);

      // Clear form after successful send
      setFormData({
        name: "",
        email: "",
        message: "",
        website: "",
      });
    } catch (err) {
      console.error(err);

      // Show the backend's specific message when available (e.g. rate limit notice)
      if (err.response?.data?.message) {
        setStatus(err.response.data.message);
      } else {
        setStatus("Failed to send message. hii");
      }
    }
  };

  return (
    <div className="contact-container" style={styles.container}>
      <h2 style={styles.heading}>Contact Me</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
          className="contact-input"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
          className="contact-input"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          style={styles.textarea}
          className="contact-input"
        />

        {/* Honeypot field: hidden from real users via CSS + off-screen positioning.
            Bots that auto-fill every input will fill this too, tripping the
            backend's spam check. Must stay out of normal tab flow and be
            invisible to screen readers as well. */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          style={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>

      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    margin: "50px auto",
    padding: "clamp(16px, 4vw, 28px)",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(8px)",
    boxSizing: "border-box",
  },
  heading: {
    marginBottom: "20px",
    color: "#fff",
    fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
    fontWeight: 700,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    caretColor: "#00ff88",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    caretColor: "#00ff88",
    fontSize: "0.95rem",
    minHeight: "120px",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  honeypot: {
    position: "absolute",
    left: "-9999px",
    width: "1px",
    height: "1px",
    overflow: "hidden",
  },
  button: {
    padding: "12px",
    background: "linear-gradient(135deg, #00ff88, #00c3ff)",
    color: "#0d0d0d",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.95rem",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  status: {
    marginTop: "15px",
    fontWeight: "bold",
    color: "#00ff88",
    fontSize: "0.92rem",
    wordBreak: "break-word",
  },
};

export default Contact;