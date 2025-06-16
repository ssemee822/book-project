<script setup>
import Sidebar from "../components/common/Sidebar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar class="w-1/6 bg-[#f7f5f0] p-4" />
    <div class="flex-1 flex flex-col bg-[#fafafa]">
      <RouterView class="flex-1 p-4 overflow-auto" />
    </div>
  </div>
</template>
