import axios from 'axios';
import router from '../router';
import { useAuthStore } from '../stores/auth';

const apiClient = axios.create({
  baseURL: 'http://localhost:8111/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const authStore = useAuthStore();
    if (error.response && error.response.status === 401) {
      console.warn('API 응답 401 Unauthorized 감지. 자동 로그아웃 처리.');
      authStore.logout();
      try {
        router.push('/login');
      } catch (e) {
        console.error('라우터 리다이렉트 실패:', e);
      }
      alert('인증이 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.');
    } else {
      console.error('API 응답 에러:', error.response || error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;