<template>
  <div class="bg-white rounded-xl px-4 py-2 shadow-sm">
    <input
      v-model="input"
      @keydown.enter="$emit('search', input)"
      type="text"
      placeholder="책 제목을 검색해보세요..."
      class="w-full focus:outline-none text-gray-700"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
const input = ref("");
</script>
