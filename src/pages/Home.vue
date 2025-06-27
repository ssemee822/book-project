<script setup>
import WeeklyPopularPosts from "../components/home/WeeklyPopularPosts.vue";
import BestsellerList from "../components/home/BestsellerList.vue";
import SearchBar from "../components/common/SearchBar.vue";
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
  <div class="flex flex-col sm:flex-row">
    <div class="flex-1 p-4 sm:p-6">
      <div
        class="relative bg-black text-white rounded-xl overflow-hidden mb-4 sm:mb-6"
      >
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
          class="w-full h-48 sm:h-72 object-cover opacity-40"
        />
        <div
          class="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
        >
          <h1 class="text-2xl sm:text-3xl font-bold mb-2">
            쭉정이에 오신 걸 환영합니다 📚
          </h1>
          <p class="text-base sm:text-lg mb-4">
            좋은 책을 발견하고, 리뷰를 나누세요.
          </p>
          <router-link to="/community">
            <button
              class="bg-yellow-400 text-black font-bold px-4 py-2 sm:px-6 sm:py-2 rounded-xl hover:bg-yellow-300"
            >
              ✍ 리뷰 쓰기
            </button>
          </router-link>
        </div>
      </div>

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

      <h2 class="text-lg sm:text-xl font-bold mb-4">🔥 인기글</h2>
      <WeeklyPopularPosts class="mb-10" />
      <h2 class="text-lg sm:text-xl font-bold mb-4">📅 베스트셀러</h2>
      <BestsellerList />
    </div>
  </div>
</template>
