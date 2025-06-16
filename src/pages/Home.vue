<script setup>
import BookList from "../components/book/BookList.vue";
import SearchBar from "../components/common/SearchBar.vue";
import ProfileCard from "../components/common/ProfileCard.vue";
import { ref, onMounted } from "vue";
import { searchBooks } from "../api/kakao.js";

const query = ref("");
const books = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 10;

onMounted(() => {
  handleSearch("안녕");
});
const search = async (page = 1) => {
  currentPage.value = page;
  const result = await searchBooks(query.value, page);
  console.log(result);
  books.value = result.documents;
  totalPages.value = Math.ceil(result.meta.pageable_count / pageSize);
};

const handleSearch = (value) => {
  query.value = value;
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
      <SearchBar class="p-4 border-b mb-4" @search="handleSearch" />
      <BookList
        :books="books"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :pageSize="pageSize"
        @change-page="changePage"
      />
    </div>
    <div class="w-1/5 p-4 bg-[#f7f5f0]">
      <ProfileCard />
    </div>
  </div>
</template>
