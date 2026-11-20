
import { Routes, Route } from "react-router-dom";

import AIWidget from "./components/AIWidget.jsx";
import Navbar from "./Components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Projects from "./pages/Project.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/skills" element={<Skills />} />

        <Route path="/projects" element={<Projects />} />

        <Route
          path="/project/:slug"
          element={<ProjectDetail />}
        />

        <Route path="/contact" element={<Contact />} />
      </Routes>

      <AIWidget />
    </>
  );
}

export default App;
