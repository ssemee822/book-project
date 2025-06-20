<script setup>
import { ref } from "vue";
import BaseButton from "../components/common/BaseButton.vue";
// Firebase 또는 API 연동을 위한 준비 (선택)
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase"; // 설정 시

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  try {
    // Firebase 또는 API 호출 예시
    // await createUserWithEmailAndPassword(auth, email.value, password.value);
    console.log("회원가입 성공:", email.value);
    errorMessage.value = "";
    // router.push("/login");
  } catch (error) {
    errorMessage.value = "회원가입에 실패했습니다. 다시 시도해 주세요.";
    console.error(error);
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-[#f7f5f0]">
    <div class="w-full max-w-md p-8 bg-white rounded shadow">
      <h2 class="text-2xl font-bold text-center mb-6 text-[#91a653]">회원가입</h2>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">이메일</label>
        <input
          type="email"
          v-model="email"
          class="w-full p-2 border rounded"
          placeholder="your@email.com"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">비밀번호</label>
        <input
          type="password"
          v-model="password"
          class="w-full p-2 border rounded"
          placeholder="비밀번호 입력"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">비밀번호 확인</label>
        <input
          type="password"
          v-model="confirmPassword"
          class="w-full p-2 border rounded"
          placeholder="비밀번호 재입력"
        />
      </div>

      <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

      <BaseButton @click="handleSignup" class="w-full bg-[#f6cf4b] text-white">
        회원가입
      </BaseButton>
    </div>
  </div>
</template>
