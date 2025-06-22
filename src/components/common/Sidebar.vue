\<script setup>
import { ref, computed } from 'vue'; // computed를 추가로 import합니다.
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

console.log(route);

const selectedClickedItem = ref(null);

const goHome = () => {
  router.push("/");
  selectedClickedItem.value = 'home';
};

const goMyPage = () => {
  router.push("/mypage");
  selectedClickedItem.value = 'myPage';
};

const goCommunity = () => {
  router.push("/community");
  selectedClickedItem.value = 'community';
};

// 로그인 페이지로 이동하는 함수
const goLogin = () => {
  router.push("/login");
  selectedClickedItem.value = 'loginSignupBanner'; // 로그인/회원가입 배너가 선택된 것으로 간주
};

// 회원가입 페이지로 이동하는 함수 (로그인/회원가입 배너와 같은 ID 사용)
const goSignup = () => {
  router.push("/signup");
  selectedClickedItem.value = 'loginSignupBanner'; // 로그인/회원가입 배너가 선택된 것으로 간주
};

// 로그인/회원가입 배너의 활성 상태를 계산하는 computed 속성
// 현재 라우트가 'Login' 또는 'Signup'일 때 활성화됩니다.
const isLoginSignupBannerActive = computed(() => {
  return route.name === 'Login' || route.name === 'Signup';
});

// 로그인/회원가입 배너 클릭 시 동작하는 함수
// 로그인 페이지로 이동하도록 설정 (혹은 필요에 따라 첫 클릭 시 선택 페이지를 보여줄 수도 있습니다)
const clickLoginSignupBanner = () => {
  // 사용자가 배너를 클릭했을 때 어떤 페이지로 갈지 결정합니다.
  // 여기서는 로그인 페이지로 이동하도록 설정합니다.
  // 필요에 따라 회원가입 페이지로 직접 이동시키거나, 선택 팝업을 띄울 수도 있습니다.
  router.push("/login");
  selectedClickedItem.value = 'loginSignupBanner';
};
</script>

<template>
  <div>
    <div
      class="text-[#e3c02b] text-xl font-bold mb-4 flex justify-center cursor-pointer"
      @click="goHome"
    >
      <img src="/logo.png" class="w-40 inline-block mr-2" />
    </div>
    <ul class="space-y-2 text-lg">
      <li
        class="cursor-pointer p-4 rounded-lg mb-4"
        :class="{
          'bg-gray-800 text-white': isLoginSignupBannerActive, // 라우트 기반 활성 스타일 (배너 전체에 적용)
          'bg-gray-700 text-gray-200 hover:bg-gray-600': !isLoginSignupBannerActive, // 기본/호버 스타일
          'border-2 border-yellow-400': selectedClickedItem === 'loginSignupBanner' // 클릭 시 테두리 또는 다른 스타일 (선택 효과)
        }"
        @click="clickLoginSignupBanner"
      >
        <div class="font-bold text-xl mb-1">쭉정이 시작하기</div>
        <div class="text-sm">로그인 / 회원가입</div>
      </li>

      <li
        class="cursor-pointer p-2 text-center"
        :class="{
          'text-[#e3c02b] font-semibold': route.name === 'Home' || route.name === 'BookDetail',
          'text-[#9baa59] hover:font-semibold': !(route.name === 'Home' || route.name === 'BookDetail'),
          'bg-gray-200': selectedClickedItem === 'home'
        }"
        @click="goHome"
      >
        홈
      </li>
      <li
        class="cursor-pointer p-2 text-center"
        :class="{
          'text-[#e3c02b] font-semibold': route.name === 'Community' || route.name === 'PostDetail',
          'text-[#9baa59] hover:font-semibold': !(route.name === 'Community' || route.name === 'PostDetail'),
          'bg-gray-200': selectedClickedItem === 'community'
        }"
        @click="goCommunity"
      >
        Community
      </li>
      <li
        class="cursor-pointer p-2 text-center"
        :class="{
          'text-[#e3c02b] font-semibold': route.name === 'MyPage',
          'text-[#9baa59] hover:font-semibold': !(route.name === 'MyPage'),
          'bg-gray-200': selectedClickedItem === 'myPage'
        }"
        @click="goMyPage"
      >
        내 서재
      </li>
      </ul>
  </div>
</template>