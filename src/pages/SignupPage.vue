<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import axios from "../api/axios";
import BaseButton from "../components/common/BaseButton.vue";

const nickname = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const router = useRouter();
const authStore = useAuthStore();
const checkEmail = ref("");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const shouldShake = ref(false);

const triggerShake = () => {
  shouldShake.value = false;
  requestAnimationFrame(() => {
    shouldShake.value = true;
  });
};

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

const checkEmailDuplicate = async () => {
  if (!email.value) {
    checkEmail.value = "이메일을 입력해주세요.";
    triggerShake();
  } else if (!emailRegex.test(email.value)) {
    checkEmail.value = "올바른 이메일 형식이 아닙니다.";
    triggerShake();
  } else {
    const response = await axios.get("api/auth/email", {
      params: { email: email.value },
    });
    if (response.data) {
      checkEmail.value = "이미 사용 중인 이메일입니다.";
      triggerShake();
    } else {
      shouldShake.value = false;
      checkEmail.value = "사용할 수 있는 이메일입니다.";
    }
  }
};
</script>

<style scoped></style>

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
        <h2 class="text-xl font-bold mb-1">환영합니다!</h2>
        <p class="text-sm text-gray-500 mb-6">
          저희에게 당신의 이야기를 들려주세요
        </p>
        <form @submit.prevent="handleSignup" class="gap-12">
          <div class="items-center mb-3">
            <div class="flex justify-center h-[38px]">
              <input
                v-model="email"
                type="text"
                placeholder="아이디 또는 이메일"
                class="w-full border px-4 py-2 rounded text-sm"
              />
              <BaseButton
                type="button"
                @click="checkEmailDuplicate"
                class="border self-center h-[100%] ml-3 bg-black text-white hover:bg-gray-700 rounded text-[12px] px-[2px] w-32 font-light"
              >
                중복 확인
              </BaseButton>
            </div>
            <p
              class="text-green-500 text-sm pl-1 mt-1"
              :class="[
                { shake: shouldShake },
                shouldShake ? 'text-red-500' : 'text-green-500',
              ]"
            >
              {{ checkEmail }}
            </p>
          </div>
          <div>
            <input
              v-model="nickname"
              type="text"
              placeholder="닉네임"
              class="w-full border px-4 py-2 mb-3 rounded text-sm"
            />
          </div>
          <input
            v-model="password"
            type="password"
            placeholder="비밀번호"
            class="w-full border px-4 py-2 mb-3 rounded text-sm"
          />
          <input
            v-model="passwordConfirm"
            type="password"
            placeholder="비밀번호"
            class="w-full border px-4 py-2 mb-3 rounded text-sm"
          />

          <button
            type="submit"
            class="w-full bg-[#1a1d21] text-white py-2 rounded hover:bg-[#2e3238]"
          >
            회원가입
          </button>
        </form>

        <div class="flex justify-center text-sm text-gray-600 space-x-2 my-4">
          <RouterLink to="/login" class="text-blue-500">로그인</RouterLink>
          <span>|</span>
          <RouterLink to="/forgot-password" class="text-blue-500"
            >비밀번호 찾기</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-3px);
  }
  40% {
    transform: translateX(3px);
  }
  60% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(3px);
  }
  100% {
    transform: translateX(0);
  }
}

.shake {
  animation: shake 0.3s ease-in-out;
}
</style>
