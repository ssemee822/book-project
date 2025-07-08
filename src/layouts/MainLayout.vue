<script setup>
import Sidebar from "../components/common/Sidebar.vue";
import ProfileCard from "../components/common/History.vue";
import { RouterView } from "vue-router";
import { ref, watch, onMounted } from "vue"; // watch와 onMounted 임포트 추가

// ⭐ Pinia 스토어 임포트 추가
import { useFavoriteStore } from '../stores/favorite';
import { useAuthStore } from '../stores/auth';

const showSidebar = ref(false);
const showProfile = ref(false);

// ⭐ Pinia 스토어 인스턴스 생성
const favoriteStore = useFavoriteStore();
const authStore = useAuthStore();

// ⭐ 핵심 로직: 로그인 상태 변화 감지 및 즐겨찾기 스토어 업데이트
// MainLayout이 마운트될 때 (앱 시작 또는 새로고침 시), 그리고 로그인 상태가 변경될 때마다 실행됩니다.
watch(() => authStore.isAuthenticated, async (newVal, oldVal) => {
  console.log(`[MainLayout] Auth state changed: ${oldVal} -> ${newVal}`); // 디버깅 로그
  if (newVal) {
    // 사용자가 로그인되었을 때
    console.log("[MainLayout] User logged in, fetching favorites..."); // 디버깅 로그
    await favoriteStore.fetchFavorites(); // 즐겨찾기 목록을 불러옵니다.
  } else {
    // 사용자가 로그아웃되었을 때
    console.log("[MainLayout] User logged out, clearing favorites..."); // 디버깅 로그
    favoriteStore.clearFavorites(); // 즐겨찾기 목록(Set)을 비웁니다.
  }
}, { immediate: true }); // ⭐ immediate: true는 컴포넌트 초기화 시에도 watch 콜백을 한 번 실행하도록 합니다.

// onMounted 훅은 watch의 immediate: true가 초기 로딩을 처리하므로,
// 여기서는 필수적이지 않지만, 다른 초기화 로직이 있다면 추가할 수 있습니다.
// onMounted(() => {
//   console.log("[MainLayout] Component mounted.");
//   // 이미 watch 로직에서 initial fetchFavorites()를 처리합니다.
// });
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <div
      class="hidden sm:block w-1/5 bg-[#f7f5f0] p-4 h-full sticky top-0 overflow-y-auto"
    >
      <Sidebar />
    </div>
    <div
      class="fixed top-0 left-0 w-64 bg-[#f7f5f0] p-4 z-40 h-full transform transition-transform sm:hidden"
      :class="showSidebar ? 'translate-x-0' : '-translate-x-full'"
    >
      <Sidebar @close-sidebar="showSidebar = false" />
    </div>
    <div class="flex-1 overflow-y-auto h-full bg-[#fafafa] pt-14 sm:pt-0">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div
      class="hidden sm:block w-1/4 bg-[#f7f5f0] p-4 h-full sticky top-0 overflow-y-auto"
    >
      <ProfileCard />
    </div>
    <div
      class="fixed top-0 right-0 w-64 bg-[#f7f5f0] p-4 z-40 h-full transform transition-transform sm:hidden"
      :class="showProfile ? 'translate-x-0' : 'translate-x-full'"
    >
      <ProfileCard />
    </div>
    <div
      class="fixed top-0 left-0 w-full h-14 flex items-center justify-between px-4 bg-white shadow z-50 sm:hidden"
    >
      <button
        @click="
          () => {
            showSidebar = !showSidebar;
            if (showSidebar) showProfile = false;
          }
        "
        class="text-gray-800 font-semibold"
      >
        메뉴
      </button>
      <span class="text-gray-800 font-bold text-lg">쭉정이</span>
      <button
        @click="
          () => {
            showProfile = !showProfile;
            if (showProfile) showSidebar = false;
          }
        "
        class="text-gray-800 font-semibold"
      >
        내 서재
      </button>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>