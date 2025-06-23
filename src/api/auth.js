import apiClient from './index';

export const loginUser = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const socialLoginUser = (accessToken) => {
  return apiClient.post('/auth/social', { accessToken, provider: 'kakao' });
};