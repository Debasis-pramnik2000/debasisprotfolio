import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaDownload, FaArrowRight } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import profileImg from '../assets/Debasis.png';
import './Hero.css';
import resumePdf from '../assets/resume.pdf';  
export default function Hero() {
  // ---------- Typing effect ----------
  const roles = ['Full Stack Developer', 'BCA Student', 'Problem Solver'];
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text === current) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text === '') {
          setDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  return (
    <section id="home" className="hero-section text-light">
      {/* Animated background blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center min-vh-100 py-5 g-4">

          {/* ---------------- LEFT SIDE ---------------- */}
          <div className="col-lg-7 text-center text-lg-start order-2 order-lg-1">
            {/* Badge */}
            <span className="badge-pill mb-3">
              <HiOutlineSparkles className="me-1" /> Available for Opportunities
            </span>

            {/* Greeting + Name */}
            <h1 className="hero-title fw-bold mb-3">
              Hi, I'm{' '}
              <span className="gradient-text">Debasis Pramanik</span>
            </h1>

            {/* Typing role */}
            <h2 className="hero-role mb-4">
              {text}
              <span className="cursor">|</span>
            </h2>

            {/* Description */}
            <p className="hero-desc text-secondary mb-4">
  I craft elegant digital experiences with clean code and modern design.
  Currently pursuing <strong>BCA at TIMT</strong> under{' '}
  <strong>MAKAUT</strong>, passionate about building
  responsive, user-friendly web apps.
</p>

            {/* CTA Buttons */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-4 cta-group">
              <Link to="/contact" className="btn btn-gradient px-4 py-2 fw-semibold">
                Hire Me <FaArrowRight className="ms-2" />
              </Link>
              <a
  href={resumePdf}
  download="Debasis-Pramanik-Resume.pdf"
  className="btn btn-outline-glow px-4 py-2 fw-semibold"
>
  <FaDownload className="me-2" /> Resume
</a>
            </div>

            {/* Social Icons */}
            <div className="d-flex gap-3 justify-content-center justify-content-lg-start mb-4 social-row">
              <a
                href="https://github.com/Debasis-pramnik2000/"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/debasis-pramanik-17492535b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>

            {/* Stats */}
            <div className="stats-row d-flex flex-wrap gap-4 justify-content-center justify-content-lg-start">
              <div className="stat-card">
                <h3 className="fw-bold mb-0 gradient-text">8+</h3>
                <p className="text-secondary mb-0 small">Technologies</p>
              </div>
              <div className="stat-card">
                <h3 className="fw-bold mb-0 gradient-text">3</h3>
                <p className="text-secondary mb-0 small">Projects</p>
              </div>
              <div className="stat-card">
                <h3 className="fw-bold mb-0 gradient-text">100%</h3>
                <p className="text-secondary mb-0 small">Dedication</p>
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT SIDE ---------------- */}
          <div className="col-lg-5 text-center order-1 order-lg-2 mb-4 mb-lg-0">
            <div className="profile-wrapper">
              <div className="profile-ring"></div>
              <img
                src={profileImg}
                alt="Debasis Pramanik"
                className="profile-img"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}