<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          회원가입
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?
          <router-link
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            로그인
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="nickname" class="sr-only">닉네임</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              autocomplete="nickname"
              required
              v-model="nickname"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="닉네임"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">이메일 주소</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="이메일 주소"
            />
          </div>
          <div>
            <label for="password" class="sr-only">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              v-model="password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호"
            />
          </div>
          <div>
            <label for="password-confirm" class="sr-only">비밀번호 확인</label>
            <input
              id="password-confirm"
              name="password-confirm"
              type="password"
              autocomplete="new-password"
              required
              v-model="passwordConfirm"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호 확인"
            />
          </div>
        </div>

        <div>
          <BaseButton
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {{ authStore.isLoading ? "가입 중..." : "회원가입" }}
          </BaseButton>
        </div>
        <p v-if="authStore.error" class="text-red-500 text-sm text-center mt-2">
          {{ authStore.error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "../components/common/BaseButton.vue";
import { useAuthStore } from "../stores/auth";

const nickname = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleSignup = async () => {
  if (password.value !== passwordConfirm.value) {
    authStore.error = "비밀번호가 일치하지 않습니다.";
    return;
  }
  authStore.error = null;

  await authStore.register({
    nickname: nickname.value,
    email: email.value,
    password: password.value,
  });
};
</script>

<style scoped></style>
