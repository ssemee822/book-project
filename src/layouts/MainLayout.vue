<script setup>
import Sidebar from "../components/common/Sidebar.vue";
import ProfileCard from "../components/common/History.vue";
import { RouterView } from "vue-router";
import { ref } from "vue";

const showSidebar = ref(false);
const showProfile = ref(false);
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
