<script setup>
import Sidebar from "../components/common/Sidebar.vue";
import ProfileCard from "../components/common/ProfileCard.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar class="w-1/5 bg-[#f7f5f0] p-4" />
    <div class="flex-1 flex flex-col bg-[#fafafa]">
      <RouterView class="flex-1 overflow-auto" />
    </div>
    <div class="w-1/4 p-4 bg-[#f7f5f0]">
      <ProfileCard />
    </div>
  </div>
</template>
