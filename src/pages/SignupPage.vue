<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          회원가입
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?
          <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            로그인
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">사용자 이름</label>
            <input
              id="username"
              name="username"
              type="text"
              autocomplete="username"
              required
              v-model="username"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="사용자 이름"
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
          <BaseButton type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            회원가입
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '../components/common/BaseButton.vue';

const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const router = useRouter();

const handleSignup = async () => {
  if (password.value !== passwordConfirm.value) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  // 여기에 실제 회원가입 로직 (예: Firebase Auth 또는 백엔드 API 호출)
  console.log('회원가입 시도:', {
    username: username.value,
    email: email.value,
    password: password.value,
  });
  alert('회원가입 시도 (실제 로직은 백엔드 연동 필요)');

  // 회원가입 성공 시 로그인 페이지로 리다이렉트
  // router.push('/login');
};
</script>

<style scoped>
/* Tailwind CSS를 주로 사용하므로, 여기에 추가적인 커스텀 스타일만 작성 */
</style>