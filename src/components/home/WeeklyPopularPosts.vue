<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer"
      >
        <h3 class="font-semibold text-lg mb-1 truncate">{{ post.title }}</h3>
        <p class="text-sm text-gray-600 mb-2">{{ post.author }}</p>
        <p class="text-sm text-gray-500 line-clamp-2">{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const posts = [
  {
    id: 1,
    title: "감명 깊은 문장을 공유해요",
    author: "김독자",
    content:
      "“나 자신을 믿는 것이야말로 진정한 용기의 시작이다.” 라는 문장이 와닿았어요.",
  },
  {
    id: 2,
    title: "이 책 정말 최고입니다",
    author: "책벌레",
    content:
      "올해 읽은 책 중에 가장 감동적인 책이었어요. 여러분께 강력 추천합니다!",
  },
  {
    id: 3,
    title: "같이 읽어요 😊",
    author: "책모임장",
    content: "이번 주 책모임에서 함께 읽을 책입니다. 미리 읽고 의견 나눠요!",
  },
];
</script>
