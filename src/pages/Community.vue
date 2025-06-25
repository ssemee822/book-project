<script setup>
import SearchBar from "../components/common/SearchBar.vue";
import BaseButton from "../components/common/BaseButton.vue";
import ProfileCard from "../components/common/ProfileCard.vue";
import PostCard from "../components/community/PostCard.vue";
import axios from "../api/axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

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
  console.log(res.data.data.content);
  posts.value = res.data.data.content;
  totalCount.value = res.data.data.content.length;
  totalPages.value = Math.ceil(res.data.data.content.length / pageSize);
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const goPostCreate = () => {
  router.push("/postcreate");
};
</script>

<template>
  <div class="flex">
    <div class="flex-1 p-4">
      <div class="p-4 border-b mb-4 flex gap-2 items-center">
        <SearchBar v-model="query" @search="getCommunityList" class="flex-1" />
        <BaseButton @click="getCommunityList">검색</BaseButton>
      </div>

      <div class="mb-4 text-lg font-semibold flex justify-between">
        <div class="pl-4">
          총 <span class="text-[#9baa59]">{{ totalCount }}</span
          >개의 게시글이 있습니다
        </div>
        <BaseButton @click="goPostCreate">글쓰기</BaseButton>
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

    <div class="w-1/4 p-4 bg-[#f7f5f0]">
      <ProfileCard />
    </div>
  </div>
</template>
