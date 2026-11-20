import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// ✅ Global styles — REQUIRED
import "./index.css";   // :root variables, dark theme base
import "./App.css";     // global overrides + contact form fixes
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap grid & utilities

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);