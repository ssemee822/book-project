<script setup>
import axios from "../../api/axios";
import { ref, onMounted } from "vue";

const posts = ref([]);

onMounted(() => {
  getPopularPostList();
});

const getPopularPostList = async () => {
  const res = await axios.get("/api/board/list?size=3");
  posts.value = res.data.data.content;
};
</script>
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
