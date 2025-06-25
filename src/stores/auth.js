import { defineStore } from "pinia";
import { loginUser, registerUser, logoutUser } from "../api/auth";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => {
    let accessToken = null;
    let isLogin = null;
    try {
      const storedToken = localStorage.getItem("accessToken");
      isLogin = localStorage.getItem("isLogin");

      if (storedToken) {
        accessToken = storedToken;
      }
    } catch (e) {
      console.error(
        "Error parsing user data or accessToken from localStorage:",
        e
      );
      localStorage.removeItem("accessToken");
      localStorage.setItem("isLogin", false);
      accessToken = null;
    }

    return {
      accessToken: accessToken,
      isLogin: isLogin,
      isAuthenticated: !!accessToken,
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
        const { accessToken, nickname } = response.data;

        this.accessToken = accessToken;
        this.isAuthenticated = true;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("nickname", nickname);

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

    async logout() {
      const response = await logoutUser();

      this.accessToken = null;
      this.isAuthenticated = false;

      localStorage.removeItem("accessToken");
      localStorage.setItem("isLogin", false);
      localStorage.removeItem("nickname");

      alert("로그아웃되었습니다.");
    },
  },
});
