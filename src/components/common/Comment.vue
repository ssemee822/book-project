<template>
  <div class="mb-4 flex gap-2">
    <input
      v-model="newComment"
      type="text"
      placeholder="댓글을 입력하세요"
      class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
    />
    <BaseButton>등록</BaseButton>
  </div>

  <ul class="space-y-4 p-4">
    <li v-for="comment in comments" :key="comment.id" class="border-b pb-3">
      <div class="text-sm font-medium text-gray-800">
        {{ comment.author }}
      </div>
      <div class="text-sm text-gray-600 mb-1">
        {{ comment.content }}
      </div>
      <div class="text-xs text-gray-400">{{ comment.date }}</div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "./BaseButton.vue";

const comments = ref([
  {
    id: 1,
    author: "독서왕",
    content: "이 책 정말 감동적이었어요!",
    date: "2025-06-18",
  },
  {
    id: 2,
    author: "문장수집가",
    content: "좋은 문장 감사합니다 😊",
    date: "2025-06-18",
  },
  {
    id: 3,
    author: "책벌레",
    content: "궁금했던 내용이 잘 정리되어 있네요!",
    date: "2025-06-17",
  },
]);
</script>
