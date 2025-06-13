<script setup>
import Sidebar from "../components/common/Sidebar.vue";
import SearchBar from "../components/common/SearchBar.vue";
import ProfileCard from "../components/common/ProfileCard.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar class="w-1/6 bg-[#f5f5f5] p-4" />
    <div class="flex-1 flex flex-col bg-[#fafafa]">
      <SearchBar class="p-4 border-b" />
      <RouterView class="flex-1 p-4 overflow-auto" />
    </div>
    <div class="w-1/5 p-4 bg-[#f5f5f5]">
      <ProfileCard />
    </div>
  </div>
</template>
