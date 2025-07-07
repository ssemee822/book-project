<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  await authStore.login({ email: email.value, password: password.value });
  await router.push("/");
  window.location.reload();
};
</script>
<template>
  <div class="flex min-h-screen">
    <div
      class="w-1/2 bg-[#1a1d21] text-white flex flex-col justify-between p-8"
    >
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="text-4xl font-light tracking-widest mb-3">쭉정이</div>
        <p class="text-sm text-gray-400">
          읽었다는 말 대신, 어떻게 읽었는지를 묻습니다.
        </p>
        <p class="text-xs text-gray-500 mt-2">
          그 물음에 함께 고민하는 사람들을 모읍니다.
        </p>
      </div>
    </div>

    <div class="w-1/2 flex items-center justify-center bg-white">
      <div class="w-3/4 max-w-md">
        <h2 class="text-xl font-bold mb-1">안녕하세요,</h2>
        <p class="text-sm text-gray-500 mb-6">
          로그인하여 당신의 이야기를 들려주세요
        </p>

        <form @submit.prevent="handleLogin">
          <input
            v-model="email"
            type="text"
            placeholder="아이디 또는 이메일"
            class="w-full border px-4 py-2 mb-3 rounded text-sm"
          />
          <input
            v-model="password"
            type="password"
            placeholder="비밀번호"
            class="w-full border px-4 py-2 mb-3 rounded text-sm"
          />

          <button
            type="submit"
            class="w-full bg-[#1a1d21] text-white py-2 rounded hover:bg-[#2e3238]"
          >
            로그인
          </button>
        </form>

        <div class="flex justify-center text-sm text-gray-600 space-x-2 my-4">
          <RouterLink to="/signup" class="text-blue-500">회원가입</RouterLink>
          <span>|</span>
          <RouterLink to="/forgot-password" class="text-blue-500"
            >비밀번호 찾기</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
