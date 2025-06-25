import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8111",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default instance;
