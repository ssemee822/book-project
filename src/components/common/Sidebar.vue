<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goHome = () => {
  router.push("/");
};

const goMyPage = () => {
  router.push("/mypage");
};

const goCommunity = () => {
  router.push("/community");
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
        class="text-[#e3c02b] font-semibold cursor-pointer p-2 text-center"
        @click="goHome"
      >
        Home
      </li>
      <li
        class="text-[#9baa59] hover:font-semibold cursor-pointer p-2 text-center"
        @click="goCommunity"
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
  </div>
</template>
