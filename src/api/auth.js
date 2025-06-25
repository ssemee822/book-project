import apiClient from "./index";

export const loginUser = (credentials) => {
  return apiClient.post("/auth/login", credentials);
};

export const registerUser = (userData) => {
  console.log(userData);
  return apiClient.post("/auth/signup", userData);
};
