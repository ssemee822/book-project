<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

console.log(route);

const goHome = () => {
  router.push("/");
};

const goMyPage = () => {
  router.push("/mypage");
};

const goCommunity = () => {
  router.push("/community");
};

const goLogin = () => {
  router.push("/login");
};

const goSignup = () => {
  router.push("/signup");
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
        class="cursor-pointer p-2 text-center"
        :class="
          route.name == 'Home' || route.name == 'BookDetail'
            ? 'text-[#e3c02b] font-semibold'
            : 'text-[#9baa59] hover:font-semibold'
        "
        @click="goHome"
      >
        Home
      </li>
      <li
        class="cursor-pointer p-2 text-center"
        :class="
          route.name == 'Community' || route.name == 'PostDetail'
            ? 'text-[#e3c02b] font-semibold'
            : 'text-[#9baa59] hover:font-semibold'
        "
        @click="goCommunity"
      >
        Community
      </li>
      <li
        class="cursor-pointer p-2 text-center"
        :class="
          route.name == 'MyPage'
            ? 'text-[#e3c02b] font-semibold'
            : 'text-[#9baa59] hover:font-semibold'
        "
        @click="goMyPage"
      >
        내 서재
      </li>
      <li
        class="text-[#9baa59] hover:font-semibold cursor-pointer p-2 text-center"
        @click="goLogin"
      >
        로그인
      </li>
      <li
        class="text-[#9baa59] hover:font-semibold cursor-pointer p-2 text-center"
        @click="goSignup"
      >
        회원가입
      </li>
    </ul>
  </div>
</template>