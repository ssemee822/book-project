import axios from "axios";
import { useAuthStore } from "../stores/auth";

const apiClient = axios.create({
  baseURL: "http://localhost:8111/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
  }
);

export default apiClient;
