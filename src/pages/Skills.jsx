import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPython, FaReact, FaNodeJs, FaGithub, FaHtml5, FaCss3Alt,
  FaJs, FaBootstrap, FaDatabase, FaServer
} from "react-icons/fa";
import {
  SiExpress, SiMongodb, SiMysql, SiPostman, SiVercel, SiFastapi
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import "./Skills.css";

const Skills = () => {
  // ---------------- THEME STATE ----------------
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "dark"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // ---------------- SKILL DATA ----------------
  const skills = [
    { name: "HTML5",      color: "#e34f26", icon: <FaHtml5 />,      category: "Frontend" },
    { name: "CSS3",       color: "#1572b6", icon: <FaCss3Alt />,    category: "Frontend" },
    { name: "JavaScript", color: "#f7df1e", icon: <FaJs />,         category: "Frontend" },
    { name: "React",      color: "#61dafb", icon: <FaReact />,      category: "Frontend" },
    { name: "Bootstrap",  color: "#7952b3", icon: <FaBootstrap />,  category: "Frontend" },

    { name: "Node.js",    color: "#339933", icon: <FaNodeJs />,     category: "Backend" },
    { name: "Express.js", color: "#ffffff", lightColor: "#0d0d0d",  icon: <SiExpress />, category: "Backend" },
    { name: "Python",     color: "#3776ab", icon: <FaPython />,     category: "Backend" },
    { name: "FastAPI",    color: "#009688", icon: <SiFastapi />,    category: "Backend" },

    { name: "MongoDB",    color: "#47a248", icon: <SiMongodb />,    category: "Database" },
    { name: "MySQL",      color: "#00758f", icon: <SiMysql />,      category: "Database" },

    { name: "GitHub",     color: "#ffffff", lightColor: "#181717",  icon: <FaGithub />,  category: "Tools" },
    { name: "VS Code",    color: "#007acc", icon: <VscVscode />,    category: "Tools" },
    { name: "Postman",    color: "#ff6c37", icon: <SiPostman />,    category: "Tools" },
    { name: "Vercel",     color: "#ffffff", lightColor: "#000000",  icon: <SiVercel />,  category: "Tools" },
    { name: "Render",     color: "#46e3b7", icon: <FaServer />,     category: "Tools" },
  ];

  const categories = ["All", "Frontend", "Backend", "Database", "Tools"];
  const [activeTab, setActiveTab] = useState("All");
  const filtered = activeTab === "All" ? skills : skills.filter((s) => s.category === activeTab);

  // ---------------- SCROLL ANIMATION + COUNTERS ----------------
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, tech: 0, passion: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          const targets = { projects: 3, tech: skills.length, passion: 100 };
          const duration = 1500;
          const start = performance.now();

          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            setCounts({
              projects: Math.floor(p * targets.projects),
              tech: Math.floor(p * targets.tech),
              passion: Math.floor(p * targets.passion),
            });
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [skills.length]);

  return (
    <section id="skills" ref={sectionRef} className="skills-section text-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">MY EXPERTISE</span>
          <h2 className="fw-bold display-5 mt-2">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            A stack of tools I use to build modern, scalable, and elegant web applications.
          </p>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`tab-btn ${activeTab === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {filtered.map((skill, i) => {
            const iconColor =
              theme === "light" && skill.lightColor ? skill.lightColor : skill.color;

            return (
              <div key={skill.name} className="col-lg-3 col-md-4 col-6">
                <div
                  className={`skill-card ${visible ? "show" : ""}`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div
                    className="skill-icon"
                    style={{
                      color: iconColor,
                      boxShadow: `0 0 18px ${skill.color}40`,
                    }}
                  >
                    {skill.icon}
                  </div>
                  <h6 className="skill-name mt-3 mb-0">{skill.name}</h6>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row mt-5 pt-4 g-4">
          {[
            { label: "Projects", value: `${counts.projects}+` },
            { label: "Technologies", value: `${counts.tech}+` },
            { label: "Passion", value: `${counts.passion}%` },
          ].map((item, i) => (
            <div key={i} className="col-md-4 col-12">
              <div className="counter-card">
                <h3 className="fw-bold gradient-text mb-1">{item.value}</h3>
                <p className="text-secondary mb-0 small text-uppercase">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;