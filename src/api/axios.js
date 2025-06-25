import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cGFsczU1NUBkYXVtLm5ldCIsImlhdCI6MTc1MDgxNTY3MSwiZXhwIjoxNzUwODE5MjcxfQ.b7IqrDguZaTPEST28pRj2SCOEZ4fjA2UyaUvqggx4_k";

const instance = axios.create({
  baseURL: "http://localhost:8111",
});

instance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
