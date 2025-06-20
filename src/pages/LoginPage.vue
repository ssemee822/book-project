<script setup>
import { ref } from "vue";
import BaseButton from "../components/common/BaseButton.vue";

// 새로 만들거나 사용할 Input 컴포넌트
// import BaseInput from "../components/common/BaseInput.vue";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const handleLogin = async () => {
  try {
    // 예시: Firebase 로그인 또는 API 요청
    // await signInWithEmailAndPassword(auth, email.value, password.value);

    console.log("로그인 성공:", email.value);
    errorMessage.value = "";
    // 라우터 이동 (예: 메인 페이지)
    // router.push("/");
  } catch (error) {
    errorMessage.value = "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-[#f7f5f0]">
    <div class="w-full max-w-md p-8 bg-white rounded shadow">
      <h2 class="text-2xl font-bold text-center mb-6 text-[#91a653]">로그인</h2>

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
          placeholder="●●●●●●"
        />
      </div>

      <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

      <BaseButton @click="handleLogin" class="w-full bg-[#f6cf4b] text-white">
        로그인
      </BaseButton>
    </div>
  </div>
</template>
