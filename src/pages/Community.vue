<script setup>
import SearchBar from "../components/common/SearchBar.vue";
import BaseButton from "../components/common/BaseButton.vue";
import PostCard from "../components/community/PostCard.vue";
import axios from "../api/axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { searchBooks } from "../api/kakao.js";

const query = ref("");
const posts = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);
const pageSize = 5;
const router = useRouter();

onMounted(() => {
  getCommunityList();
});

const getCommunityList = async () => {
  const res = await axios.get("/api/board/list");
  const rawPosts = res.data.data.content;

  const thumbnailPromises = rawPosts.map((post) => getImage(post.isbn));
  const thumbnails = await Promise.all(thumbnailPromises);

  rawPosts.forEach((post, index) => {
    post.thumbnail = thumbnails[index];
  });

  posts.value = rawPosts;
  totalCount.value = rawPosts.length;
  totalPages.value = Math.ceil(rawPosts.length / pageSize);
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const getImage = async (isbn) => {
  const result = await searchBooks(isbn, 1, "isbn");
  if (result.meta.total_count > 0) {
    const thumbnailUrl = result.documents[0].thumbnail;
    return thumbnailUrl;
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

      <div class="space-y-3">
        <PostCard
          v-for="post in posts.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )"
          :key="post.id"
          :post="post"
        />
      </div>

      <div class="mt-6 flex justify-center gap-2">
        <BaseButton
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          >이전</BaseButton
        >
        <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
        <BaseButton
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          >다음</BaseButton
        >
      </div>
    </div>
  </div>
</template>
