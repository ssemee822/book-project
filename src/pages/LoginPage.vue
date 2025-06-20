<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          로그인
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          계정이 없으신가요?
          <router-link to="/signup" class="font-medium text-indigo-600 hover:text-indigo-500">
            회원가입
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">이메일 주소</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="이메일 주소"
            />
          </div>
          <div>
            <label for="password" class="sr-only">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              비밀번호 찾기
            </a>
          </div>
        </div>

        <div>
          <BaseButton type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            로그인
          </BaseButton>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        <div class="mt-6">
          <BaseButton @click="handleKakaoLogin" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
            카카오 로그인
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Vue Router 임포트
import BaseButton from '../components/common/BaseButton.vue'; // BaseButton 컴포넌트 임포트
import * as kakaoApi from '../api/kakao.js'; // 카카오 API 모듈 임포트

const email = ref('');
const password = ref('');
const router = useRouter(); // useRouter 훅 사용

const handleLogin = async () => {
  // 여기에 실제 로그인 로직 (예: Firebase Auth 또는 백엔드 API 호출)
  console.log('로그인 시도:', email.value, password.value);
  alert('로그인 시도 (실제 로직은 백엔드 연동 필요)');

  // 로그인 성공 시 홈 페이지로 리다이렉트
  // router.push('/');
};

const handleKakaoLogin = async () => {
  try {
    // kakao.js에 정의된 카카오 로그인 시작 함수 호출
    await kakaoApi.loginWithKakao();
    console.log('카카오 로그인 성공!');
    alert('카카오 로그인 성공!');
    // 카카오 로그인 성공 후 필요한 로직 (예: 사용자 정보 가져오기, 서버에 토큰 전송)
    // router.push('/');
  } catch (error) {
    console.error('카카오 로그인 실패:', error);
    alert('카카오 로그인 실패: ' + error.message);
  }
};
</script>

<style scoped>
/* Tailwind CSS를 주로 사용하므로, 여기에 추가적인 커스텀 스타일만 작성 */
</style>