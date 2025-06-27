<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth.js";

const router = useRouter();
const route = useRoute();
const isLogin = localStorage.getItem("isLogin");
const authStore = useAuthStore();
const isRoute = (...names) => names.includes(route.name);

const goHome = () => router.push("/");
const goCommunity = () => router.push("/community");
const goMyPage = () => router.push("/mypage");
const nickname = localStorage.getItem("nickname");

const logout = async () => {
  await authStore.logout();
  window.location.reload();
};
</script>

<template>
  <div
    class="px-0 sm:px-1 md:px-2 py-0 md:py-2 sm:py-4 bg-[#f7f5f0] text-[#9baa59] font-medium"
  >
    <div
      class="mb-8 flex justify-center cursor-pointer opacity-0 sm:opacity-100 h-10 sm:h-auto"
      @click="
        () => {
          goHome();
          $emit('close-sidebar');
        }
      "
    >
      <img src="/logo.png" class="w-36" />
    </div>

    <div
      class="mb-6 flex flex-col items-center bg-white rounded-lg py-4 shadow"
    >
      <img src="/default_profile.png" class="w-12 h-12 rounded-full mb-2" />
      <div class="text-sm font-bold text-black">{{ nickname }}</div>
      <div class="text-xs text-gray-400">오늘도 좋은 독서 되세요 📖</div>
      <div class="flex justify-end mt-2" v-if="isLogin == 'true'">
        <div
          class="text-xs underline text-gray-400 cursor-pointer hover:text-red-600"
          @click="logout"
        >
          로그아웃
        </div>
      </div>
    </div>

    <hr class="border-gray-300 my-4" />

    <ul class="space-y-2 text-base">
      <li
        class="cursor-pointer px-4 py-2 rounded-md transition-all duration-150 flex items-center space-x-2"
        :class="{
          'bg-[#e3c02b] text-white font-bold shadow': isRoute(
            'Home',
            'BookDetail'
          ),
          'hover:bg-[#e3c02b]/10 hover:text-[#e3c02b]': !isRoute(
            'Home',
            'BookDetail'
          ),
        }"
        @click="
          () => {
            goHome();
            $emit('close-sidebar');
          }
        "
      >
        <span>🏠</span>
        <span>홈</span>
      </li>

      <li
        class="cursor-pointer px-4 py-2 rounded-md transition-all duration-150 flex items-center space-x-2"
        :class="{
          'bg-[#e3c02b] text-white font-bold shadow': isRoute(
            'Community',
            'PostDetail',
            'PostCreate'
          ),
          'hover:bg-[#e3c02b]/10 hover:text-[#e3c02b]': !isRoute(
            'Community',
            'PostDetail',
            'PostCreate'
          ),
        }"
        @click="
          () => {
            goCommunity();
            $emit('close-sidebar');
          }
        "
      >
        <span>💬</span>
        <span>커뮤니티</span>
      </li>

      <li
        class="cursor-pointer px-4 py-2 rounded-md transition-all duration-150 flex items-center space-x-2"
        :class="{
          'bg-[#e3c02b] text-white font-bold shadow': isRoute('MyPage'),
          'hover:bg-[#e3c02b]/10 hover:text-[#e3c02b]': !isRoute('MyPage'),
        }"
        @click="
          () => {
            goMyPage();
            $emit('close-sidebar');
          }
        "
      >
        <span>📚</span>
        <span>내 서재</span>
      </li>
    </ul>

    <div class="mt-10 text-xs text-gray-500 text-center px-2">
      “쭉정이와 함께 30권 달성 중 🎯”
    </div>
    <!-- <img src="../../../public/coo.png" class="mt-10" /> -->
  </div>
</template>
