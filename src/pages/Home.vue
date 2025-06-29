<script setup>
import WeeklyPopularPosts from "../components/home/WeeklyPopularPosts.vue";
import BestsellerList from "../components/home/BestsellerList.vue";
import SearchBar from "../components/common/SearchBar.vue";
import BannerSlider from "../components/home/BannerSlider.vue";

import BaseButton from "../components/common/BaseButton.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const query = ref("");
const router = useRouter();

const handleSearch = () => {
  router.push({
    name: "Search",
    query: { page: 1, query: query.value },
  });
};
</script>
<template>
  <div class="flex justify-center">
    <div class="w-full max-w-screen-lg px-4 sm:px-6 py-6">
      <div class="w-full max-w-screen-lg">
        <BannerSlider />
      </div>

      <!-- 검색창 -->
      <div
        class="p-2 sm:p-4 border-b mb-4 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center"
      >
        <SearchBar
          v-model="query"
          @search="handleSearch"
          class="flex-1 w-full"
        />
        <BaseButton
          @click="handleSearch"
          class="h-[42px] px-4 sm:px-6 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-full shadow w-full sm:w-auto"
        >
          검색
        </BaseButton>
      </div>
      <WeeklyPopularPosts class="mb-10" />
      <BestsellerList />
    </div>
  </div>
</template>
