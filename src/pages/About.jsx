import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaReact, FaNodeJs, FaPython, FaCode, FaGraduationCap,
  FaLaptopCode, FaRocket, FaHeart, FaBriefcase, FaCalendarAlt
} from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";
import { HiOutlineSparkles } from "react-icons/hi";
import profileImg from "../assets/Debasis.png";
import "./About.css";

const About = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const highlights = [
    { icon: <FaGraduationCap />, label: "BCA Student", sub: "TIMT • MAKAUT" },
    { icon: <FaLaptopCode />, label: "MERN Developer", sub: "Full-Stack" },
    { icon: <FaBriefcase />, label: "Intern", sub: "Taliinq Pvt Ltd" },
    { icon: <FaHeart />, label: "Passionate", sub: "About Coding" },
  ];

  const techStack = [
    { icon: <FaReact />, color: "#61dafb", name: "React" },
    { icon: <FaNodeJs />, color: "#339933", name: "Node.js" },
    { icon: <SiExpress />, color: "#ffffff", name: "Express" },
    { icon: <SiMongodb />, color: "#47a248", name: "MongoDB" },
    { icon: <FaPython />, color: "#3776ab", name: "Python" },
    { icon: <FaCode />, color: "#00ff88", name: "FastAPI" },
  ];

  return (
    <section id="about" ref={sectionRef} className="about-section text-light py-5">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-5">
          <span className="section-tag">
            <HiOutlineSparkles className="me-1" /> GET TO KNOW ME
          </span>
          <h2 className="fw-bold display-5 mt-3">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="row g-5 align-items-center">
          {/* ---------- LEFT: IMAGE ---------- */}
          <div className="col-lg-5 text-center">
            <div className={`about-img-wrapper ${visible ? "show" : ""}`}>
              <div className="about-img-ring"></div>
              <img
                src={profileImg}
                alt="Debasis Pramanik"
                className="about-img"
              />
            </div>
          </div>

          {/* ---------- RIGHT: CONTENT ---------- */}
          <div className="col-lg-7">
            <div className={`about-content ${visible ? "show" : ""}`}>
              <h3 className="about-name mb-3">
                Hi, I'm <span className="gradient-text">Debasis Pramanik</span>
              </h3>

              <p className="about-text mb-4">
                I'm a passionate <strong>MERN Stack Developer</strong> currently
                pursuing <strong>BCA from TIMT under MAKAUT</strong>. I love
                building full-stack web applications that solve real-world
                problems using modern technologies like{" "}
                <strong>React, Node.js, Express, MongoDB, Python, and FastAPI</strong>.
              </p>

              <p className="about-text mb-4">
                Recently, I completed a <strong>2-month internship at Taliinq
                Private Limited</strong>, where I gained hands-on industry
                experience working on real projects, collaborating with a team,
                and strengthening my full-stack development skills.
              </p>

              {/* Highlights grid */}
              <div className="row g-3 mb-4">
                {highlights.map((h, i) => (
                  <div key={i} className="col-6 col-md-3">
                    <div className="highlight-card">
                      <div className="highlight-icon">{h.icon}</div>
                      <p className="highlight-label">{h.label}</p>
                      <p className="highlight-sub">{h.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ============ EXPERIENCE ============ */}
              <h5 className="mb-3 fw-bold">Experience</h5>
              <div className="experience-card mb-4">
                <div className="d-flex justify-content-between flex-wrap align-items-start">
                  <div>
                    <h6 className="experience-role mb-1">
                      <FaBriefcase className="me-2" />
                      Full Stack Developer Intern
                    </h6>
                    <p className="experience-company mb-0">
                      Taliinq Private Limited
                    </p>
                  </div>
                  <span className="experience-date">
                    <FaCalendarAlt className="me-1" /> 2 Months
                  </span>
                </div>
                <p className="experience-desc mt-3 mb-0">
                  Worked on real-world full-stack projects, collaborating with
                  the development team to build and maintain modern web
                  applications using the MERN stack. Gained hands-on experience
                  in API integration, responsive UI development, and agile
                  workflows.
                </p>
              </div>

              {/* Tech stack */}
              <h5 className="mb-3 fw-bold">Tech I Work With</h5>
              <div className="d-flex flex-wrap gap-3">
                {techStack.map((t) => (
                  <div
                    key={t.name}
                    className="tech-pill"
                    style={{ color: t.color }}
                    title={t.name}
                  >
                    <span className="tech-pill-icon">{t.icon}</span>
                    <span className="tech-pill-name">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;