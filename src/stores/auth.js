import { defineStore } from "pinia";
import { loginUser, registerUser } from "../api/auth";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => {
    let token = null;
    let isLogin = null;
    try {
      const storedToken = localStorage.getItem("token");
      isLogin = localStorage.getItem("isLogin");

      if (storedToken) {
        token = storedToken;
      }
    } catch (e) {
      console.error("Error parsing user data or token from localStorage:", e);
      localStorage.removeItem("token");
      localStorage.setItem("isLogin", false);
      token = null;
    }

    return {
      token: token,
      isLogin: isLogin,
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
        const { token } = response.data;

        this.token = token;
        this.isAuthenticated = true;

        localStorage.setItem("token", token);
        localStorage.setItem("isLogin", true);

        alert("로그인 성공!");
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "로그인 실패. 이메일 또는 비밀번호를 확인해주세요.";
        console.error("Login error:", err);
      } finally {
        this.isLoading = false;
      }
    },

    async register(userData) {
      this.isLoading = true;
      this.error = null;
      try {
        await registerUser(userData);
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        router.push("/login");
      } catch (err) {
        this.error =
          err.response?.data?.message || "회원가입 실패. 다시 시도해주세요.";
        console.error("Register error:", err);
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.token = null;
      this.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.setItem("isLogin", false);

      alert("로그아웃되었습니다.");
    },
  },
});
