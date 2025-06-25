import apiClient from "./index";

export const loginUser = (credentials) => {
  return apiClient.post("/auth/login", credentials);
};

export const registerUser = (userData) => {
  return apiClient.post("/auth/signup", userData);
};

export const logoutUser = (userData) => {
  return apiClient.post("/auth/logout", userData);
};
