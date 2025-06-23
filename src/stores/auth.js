import { defineStore } from 'pinia';
import { loginUser, registerUser } from '../api/auth';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => {
    let user = null;
    let token = null;

    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser) {
        user = JSON.parse(storedUser);
      }
      if (storedToken) {
        token = storedToken;
      }
    } catch (e) {
      console.error("Error parsing user data or token from localStorage:", e);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      user = null;
      token = null;
    }

    return {
      user: user,
      token: token,
      isAuthenticated: !!token,
      isLoading: false,
      error: null,
    };
  },
  actions: {
    async login(credentials) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await loginUser(credentials);
        const { user, token } = response.data; 

        this.user = user;
        this.token = token;
        this.isAuthenticated = true;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        alert('로그인 성공!');
        router.push('/'); 
      } catch (err) {
        this.error = err.response?.data?.message || '로그인 실패. 이메일 또는 비밀번호를 확인해주세요.';
        console.error('Login error:', err);
      } finally {
        this.isLoading = false;
      }
    },

    async register(userData) {
      this.isLoading = true;
      this.error = null;
      try {
        await registerUser(userData);
        alert('회원가입 성공! 로그인 페이지로 이동합니다.');
        router.push('/login');
      } catch (err) {
        this.error = err.response?.data?.message || '회원가입 실패. 다시 시도해주세요.';
        console.error('Register error:', err);
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      localStorage.removeItem('user');
      localStorage.removeItem('token');

      alert('로그아웃되었습니다.');
      router.push('/login');
    },
  },
});