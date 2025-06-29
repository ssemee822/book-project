<script setup>
import axios from "../../api/axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const posts = ref([]);
const isLoading = ref(true);

onMounted(() => {
  getPopularPostList();
});

const goCommunity = (id) => {
  router.push({
    name: "PostDetail",
    params: { boardId: id },
  });
};

const getPopularPostList = async () => {
  const res = await axios.get("/api/board/like/list");
  posts.value = res.data.data.bookBoards.slice(0, 3);
  isLoading.value = false;
};
</script>
<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!isLoading">
      <h2 class="text-lg sm:text-xl font-bold mb-4">🔥 인기글</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="post in posts"
          @click="goCommunity(post.boardId)"
          :key="post.id"
          class="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer"
        >
          <h3 class="font-semibold text-lg mb-1 truncate">{{ post.title }}</h3>
          <p class="text-sm text-gray-600 mb-2">{{ post.author }}</p>
          <p class="text-sm text-gray-500 line-clamp-2">{{ post.content }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
