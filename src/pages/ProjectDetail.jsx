import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import "./ProjectDetail.css";

import portfolioImg from "../assets/portfolio.png";
import schoolImg from "../assets/digital-school.png";
import farmerImg from "../assets/farmer-bondhu.png";

// ✅ Keys MUST match the `slug` values in Project.jsx / Projects.jsx
const projectsData = {
  // ==================== PROJECT 1: PORTFOLIO ====================
  portfolio: {
    title: "MERN Portfolio",
    subtitle: "Personal portfolio website — MERN Stack",
    image: portfolioImg,
    live: "https://your-portfolio.vercel.app", // 🔴 update with real link
    github: "https://debasisprotfolio-ygmz-three.vercel.app/", // 🔴 update
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Bootstrap", "JWT Auth"],
    overview:
      "A fully responsive personal portfolio website that showcases my projects, skills, and contact information. Built with the MERN stack, it includes a working contact form that stores messages in MongoDB and an admin authentication system for managing content.",
    features: [
      "Responsive design that works on all devices",
      "Contact form with email",
      "Smooth scroll animations and typing effects",
      "Project showcase with filtering",
      "Dark theme with glassmorphism UI",
    ],
    challenges:
      "Balancing rich animations with mobile performance required optimizing CSS transitions and lazy-loading images.",
  },

  // ==================== PROJECT 2: DIGITAL SCHOOL ====================
  "digital-school": {
    title: "Digital School Management",
    subtitle: "Complete school management system — MERN Stack",
    image: schoolImg,
    live: "https://mansinghabarh-mvh.vercel.app/", // 🔴 verify this link
    github: "https://github.com/Debasis-pramnik2000/digital-school-management", // 🔴 update
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Bootstrap", "Role-based Auth"],
    overview:
      "A comprehensive school management system with separate dashboards for admins, teachers, and students. It handles attendance, fee tracking, class schedules, and announcements — all built on the MERN stack.",
    features: [
      "Role-based authentication (Admin / Teacher / Student,parents)",
      "Student and teacher management and parents mangement",
      "Attendance tracking with date-wise records",
      "Class and subject scheduling",
      "Announcement board for each role",
    ],
    challenges:
      "Designing a relational-style schema in MongoDB that supports complex links between students, teachers, classes, and fees while keeping queries efficient.",
  },

  // ==================== PROJECT 3: KRISHI BONDHU ====================
  "farmer-bondhu": {
    title: "Krishi Bondhu",
    subtitle: "AI-powered smart agriculture platform — MERN + Python + FastAPI",
    image: farmerImg,
    live: "https://farmer-bondhu.vercel.app/", // 🔴 currently 404 — redeploy
    github: "https://github.com/Debasis-pramnik2000/farmer-bondhu", // 🔴 update
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Python", "FastAPI", "Hybrid AI Vision"],
    overview:
      "Krishi Bondhu (meaning \"Farmer's Friend\") is an all-in-one, AI-powered smart agriculture platform built for Indian farmers — bringing live mandi prices, crop disease diagnosis, soil testing, profit forecasting, weather updates, and government schemes into a single, easy-to-use dashboard. It bridges the information gap by combining Hybrid AI Vision, regional agronomic data, and live APMC market intelligence into a simple, mobile-friendly interface.",
    features: [
      "🤖 AI Crop Disease Detection — Upload a leaf photo and get instant diagnosis, symptoms, chemical dosage, and organic remedies in English, Bengali, or Hindi.",
      "🧪 AI Soil Health & Crop Advisor — Analyze topsoil photos with state, district, and moisture feel for crop suggestions and per-bigha fertilizer schedules.",
      "📈 AI Crop Profit Predictor — Calculate cultivation costs, expected yield, selling prices, and net profit by district and season.",
      "💰 Today's Rice & Vegetable Mandi Rates — Live AgMarknet APMC prices (min, max, modal rates per kg) across Indian states and districts.",
      "🏛️ Government Schemes — State-specific subsidies, crop insurance, and farmer welfare schemes with eligibility and direct apply links.",
      "🌦️ Live Weather & Nearby Agri Shops — Real-time local forecasts and a map to locate nearby seed, fertilizer, and pesticide shops.",
      "📱 Multi-language support — English, Bengali, and Hindi",
      "🔐 Simple registration — name, 10-digit mobile number, state, district, and village",
    ],
    challenges:
      "Integrating three separate services (React, Node, FastAPI) into one seamless experience, training the Hybrid AI Vision model for accurate leaf/soil diagnosis, and keeping ML prediction latency low enough for a smooth mobile experience for rural users.",
  },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projectsData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Friendly error page if slug is wrong
  if (!project) {
    return (
      <section
        className="project-detail-section text-light d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="container text-center">
          <h2>Project not found</h2>
          <p className="text-secondary">
            The project "<b>{slug}</b>" does not exist.
          </p>
          <Link to="/projects" className="btn btn-gradient mt-3">
            <FaArrowLeft className="me-2" /> Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="project-detail-section text-light py-5">
      <div className="container">
        {/* Back link */}
        <Link to="/projects" className="back-link mb-4 d-inline-flex align-items-center">
          <FaArrowLeft className="me-2" /> Back to Projects
        </Link>

        <div className="row g-5 align-items-start">
          {/* ============ LEFT: IMAGE + BUTTONS ============ */}
          <div className="col-lg-7">
            <div className="detail-img-wrapper">
              <img src={project.image} alt={project.title} className="detail-img" />
            </div>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gradient px-4 py-2"
              >
                <FaExternalLinkAlt className="me-2" /> view website
              </a>
             
            </div>
          </div>

          {/* ============ RIGHT: DETAILS ============ */}
          <div className="col-lg-5">
            <h1 className="detail-title">{project.title}</h1>
            <p className="detail-subtitle">{project.subtitle}</p>

            {/* Tech badges */}
            <div className="tech-stack mb-4">
              {project.tech.map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>

            {/* Overview */}
            <h4 className="section-heading">Overview</h4>
            <p className="detail-text">{project.overview}</p>

            {/* Features */}
            <h4 className="section-heading">Key Features</h4>
            <ul className="feature-list">
              {project.features.map((f, i) => (
                <li key={i}>
                  <FaCheckCircle className="feature-icon" /> <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* Challenges */}
            <h4 className="section-heading">What I Learned</h4>
            <p className="detail-text">{project.challenges}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;