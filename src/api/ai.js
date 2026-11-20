
import axios from "axios";

const API =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://protfoliobackend-hbuh.onrender.com/api";

// Optional: timeout so a cold Render backend doesn't hang the UI forever
const config = { timeout: 30000 };

export const getProfile = () => axios.get(`${API}/profile`, config);

export const sendMessage = (message) =>
  axios.post(`${API}/chat`, { message }, config);
