<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const selectedClickedItem = ref(null);

const goHome = () => {
  router.push("/");
  selectedClickedItem.value = "home";
};

const goMyPage = () => {
  router.push("/mypage");
  selectedClickedItem.value = "myPage";
};

const goCommunity = () => {
  router.push("/community");
  selectedClickedItem.value = "community";
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
        :class="{
          'text-[#e3c02b] font-semibold':
            route.name === 'Home' || route.name === 'BookDetail',
          'text-[#9baa59] hover:font-semibold': !(
            route.name === 'Home' || route.name === 'BookDetail'
          ),
          'bg-gray-200': selectedClickedItem === 'home',
        }"
        @click="goHome"
      >
        홈
      </li>
      <li
        class="cursor-pointer p-2 text-center"
        :class="{
          'text-[#e3c02b] font-semibold':
            route.name === 'Community' ||
            route.name === 'PostDetail' ||
            route.name === 'PostCreate',
          'text-[#9baa59] hover:font-semibold': !(
            route.name === 'Community' ||
            route.name === 'PostDetail' ||
            route.name === 'PostCreate'
          ),
          'bg-gray-200': selectedClickedItem === 'community',
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
          'bg-gray-200': selectedClickedItem === 'myPage',
        }"
        @click="goMyPage"
      >
        내 서재
      </li>
    </ul>
  </div>
</template>
