import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cGFsczU1NUBkYXVtLm5ldCIsImlhdCI6MTc1MDY2MjIwMCwiZXhwIjoxNzUwNjY1ODAwfQ._tcNN5_rvMCQrO6EPTh6a6pQDH-e01GmlOTE4tShJJM";

const instance = axios.create({
  baseURL: "http://localhost:8111",
});

instance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
