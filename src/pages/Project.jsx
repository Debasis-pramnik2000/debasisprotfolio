import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import portfolioImg from "../assets/portfolio.png";
import schoolImg from "../assets/digital-school.png";
import farmerImg from "../assets/farmer-bondhu.png";
import "./Projects.css";
const Projects = () => {
  const projects = [
    {
      title: "MERN Portfolio",
      slug: "portfolio",                    // 👈 matches projectsData key
      desc: "Personal portfolio built with MongoDB, Express, React & Node.js. Includes contact form, admin auth, and animations.",
      image: portfolioImg,
      tech: ["MongoDB", "Express.js", "React", "Node.js"],
    },
    {
      title: "Digital School Management",
      slug: "digital-school",               // 👈 matches projectsData key
      desc: "Full MERN school system with role-based dashboards for admin, teachers, and students — attendance, fees, and schedules.",
      image: schoolImg,
      tech: ["MongoDB", "Express.js", "React", "Node.js"],
    },
    {
      title: "Farmer Bondhu",
      slug: "farmer-bondhu",                // 👈 matches projectsData key
      desc: "Smart farming assistant using MERN + Python + FastAPI for crop recommendations, disease detection, and a marketplace.",
      image: farmerImg,
      tech: ["MongoDB", "React", "Node.js", "Python", "FastAPI"],
    },
  ];

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

  return (
    <section id="projects" ref={sectionRef} className="projects-section text-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag"><HiOutlineSparkles className="me-1" /> MY WORK</span>
          <h2 className="fw-bold display-5 mt-3">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            A collection of real-world applications I've built using modern web technologies.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {projects.map((p, i) => (
            <div key={p.slug} className="col-lg-4 col-md-6">
              <Link
                to={`/project/${p.slug}`}          // 👈 internal route to detail page
                className={`project-card ${visible ? "show" : ""}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="project-img-wrapper">
                  <img src={p.image} alt={p.title} className="project-img" />
                  <div className="project-overlay">
                    <span className="view-btn">View Details <FaExternalLinkAlt className="ms-1" /></span>
                  </div>
                </div>
                <div className="project-body">
                  <h5 className="project-title">{p.title}</h5>
                  <p className="project-desc">{p.desc}</p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {p.tech.map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>
                  <div className="d-flex align-items-center gap-3 mt-auto">
                    <span className="project-link">Read More <FaArrowRight className="ms-1" /></span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;