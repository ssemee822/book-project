<script setup>
import BookList from "../components/book/BookList.vue";
import SearchBar from "../components/common/SearchBar.vue";
import ProfileCard from "../components/common/ProfileCard.vue";
import BaseButton from "../components/common/BaseButton.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { searchBooks } from "../api/kakao.js";

const query = ref("");
const books = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 10;
const totalCount = ref(0);
const keyword = ref("");
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const urlQuery = route.query.query;
  if (urlQuery) {
    query.value = urlQuery;
  } else {
    query.value = "";
  }

  const page = parseInt(route.query.page) || 1;
  currentPage.value = page;
  search(page);
});

const search = async (page = 1) => {
  currentPage.value = page;
  router.replace({
    query: {
      ...route.query,
      query: query.value,
      page: page,
    },
  });

  const result = await searchBooks(query.value, page);
  books.value = result.documents;
  totalPages.value = Math.ceil(result.meta.pageable_count / pageSize);
  totalCount.value = result.meta.total_count;
  keyword.value = query.value;
};

const handleSearch = (value) => {
  search(1);
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    search(page);
  }
};
</script>

<template>
  <div class="flex">
    <div class="flex-1 p-4">
      <div class="p-4 border-b mb-4 flex gap-2 items-center">
        <SearchBar v-model="query" @search="handleSearch" class="flex-1" />
        <BaseButton @click="handleSearch">검색</BaseButton>
      </div>
      <div class="mb-4 text-lg font-semibold">
        <span class="text-[#9baa59] font-bold">'{{ keyword }}'</span>
        에 대한
        {{ totalCount.toLocaleString() }}개의 검색 결과
      </div>
      <BookList
        :books="books"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :pageSize="pageSize"
        @change-page="changePage"
      />
    </div>
    <div class="w-1/4 p-4 bg-[#f7f5f0]">
      <ProfileCard />
    </div>
  </div>
</template>
