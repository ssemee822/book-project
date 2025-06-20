<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goHome = () => {
  router.push("/");
};

const goMyPage = () => {
  router.push("/mypage");
};

const goLogin = () => {
  router.push("/login");
};

const goSignup = () => {
  router.push("/signup");
};
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- 로고 -->
    <div
      class="text-[#e3c02b] text-xl font-bold mb-4 flex justify-center cursor-pointer"
      @click="goHome"
    >
      <img src="/logo.png" class="w-40 inline-block mr-2" />
    </div>

    <!-- 네비게이션 메뉴 -->
    <ul class="space-y-2 text-lg w-full">
      <li
        class="text-[#e3c02b] font-semibold cursor-pointer p-2 text-center"
        @click="goHome"
      >
        Home
      </li>
      <li
        class="text-[#9baa59] hover:font-semibold cursor-pointer p-2 text-center"
      >
        Community
      </li>
      <li
        class="text-[#9baa59] hover:font-semibold cursor-pointer p-2 text-center"
        @click="goMyPage"
      >
        내 서재
      </li>
    </ul>

    <!-- 로그인 / 회원가입 배너 -->
    <div class="mt-8 p-4 bg-[#f7f5f0] rounded-lg shadow w-full text-center">
      <p class="text-gray-700 mb-2 font-semibold">로그인이 필요합니다</p>
      <button
        @click="goLogin"
        class="bg-[#f6cf4b] text-white px-4 py-2 rounded w-full mb-2 hover:bg-[#e3c02b] transition"
      >
        로그인
      </button>
      <button
        @click="goSignup"
        class="border border-[#9baa59] text-[#9baa59] px-4 py-2 rounded w-full hover:bg-[#e8f0d9] transition"
      >
        회원가입
      </button>
    </div>
  </div>
</template>
