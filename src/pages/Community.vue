<script setup>
import BaseButton from "../components/common/BaseButton.vue";
import PostCard from "../components/community/PostCard.vue";
import axios from "../api/axios";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { searchBooks } from "../api/kakao.js";

const query = ref("");
const posts = ref([]);
const totalPages = ref(1);
const totalCount = ref(0);
const pageSize = 10;
const isLoading = ref(true);
const route = useRoute();
const router = useRouter();
const currentPage = computed(() => {
  const pageParam = parseInt(route.query.page);
  return isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
});

watch(currentPage, () => {
  getCommunityList();
});

onMounted(() => {
  getCommunityList();
});

const currentGroupStart = computed(() => {
  return Math.floor((currentPage.value - 1) / pageSize) * pageSize + 1;
});

const pageGroup = computed(() => {
  return Array.from(
    { length: pageSize },
    (_, i) => currentGroupStart.value + i
  ).filter((page) => page <= totalPages.value);
});

const getCommunityList = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get("/api/board/list", {
      params: {
        page: currentPage.value - 1,
        size: pageSize,
      },
    });

    const rawPosts = res.data.data.content;
    const thumbnails = await Promise.all(
      rawPosts.map((post) => getImage(post.isbn))
    );

    rawPosts.forEach((post, index) => {
      post.thumbnail = thumbnails[index];
    });

    posts.value = rawPosts;
    totalCount.value = res.data.data.totalElements;
    totalPages.value = res.data.data.totalPages;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const changePage = (page) => {
  posts.value = [];
  if (page >= 1 && page <= totalPages.value) {
    router.push({ query: { ...route.query, page } });
  }
};

const getImage = async (isbn) => {
  const result = await searchBooks(isbn, 1, "isbn");
  if (result.meta.total_count > 0) {
    return result.documents[0].thumbnail;
  } else {
    return "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5291060%3Ftimestamp%3D20250623135402";
  }
};

const goPostCreate = () => {
  router.push("/postcreate");
};
</script>

<template>
  <div class="flex">
    <div class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div
        class="mb-4 text-base sm:text-lg font-semibold flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
      >
        <div class="pl-1 sm:pl-4">
          총 <span class="text-[#9baa59]">{{ totalCount }}</span
          >개의 게시글이 있습니다
        </div>
        <BaseButton @click="goPostCreate" class="w-[100%] sm:w-auto">
          글쓰기
        </BaseButton>
      </div>

      <div v-if="isLoading" class="flex justify-center py-10">
        <svg
          class="animate-spin h-8 w-8 text-[#9baa59]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>

      <transition name="fade-slide" mode="out-in">
        <div :key="currentPage" class="space-y-3">
          <div v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
          </div>
        </div>
      </transition>
      <div
        class="mt-6 flex justify-center gap-2"
        v-if="!isLoading && totalPages > 1"
      >
        <BaseButton
          @click="changePage(currentGroupStart - 1)"
          :disabled="currentGroupStart === 1"
        >
          이전
        </BaseButton>

        <button
          v-for="page in pageGroup"
          :key="page"
          @click="changePage(page)"
          class="px-3 py-1 border rounded"
          :class="{
            'bg-[#9baa59] text-white': page === currentPage,
            'hover:bg-gray-100': page !== currentPage,
          }"
        >
          {{ page }}
        </button>

        <BaseButton
          @click="changePage(currentGroupStart + pageSize)"
          :disabled="currentGroupStart + pageSize > totalPages"
        >
          다음
        </BaseButton>
      </div>
    </div>
  </div>
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
