<template>
  <div class="space-y-2">
    <label class="text-gray-700 font-medium">도서 검색</label>
    <div class="flex gap-2">
      <input
        v-model="query"
        @keyup.enter="handleSearch"
        placeholder="책 제목을 입력하세요"
        class="flex-1 h-10 border rounded-xl p-3 focus:outline-none focus:ring focus:ring-yellow-300"
      />
      <BaseButton @click="handleSearch">검색</BaseButton>
    </div>

    <ul
      v-if="results.length"
      class="bg-gray-50 p-2 rounded-xl max-h-60 overflow-y-auto space-y-2"
    >
      <li
        v-for="book in results"
        :key="book.isbn"
        @click="selectBook(book)"
        class="p-2 hover:bg-yellow-100 rounded cursor-pointer flex items-center gap-2"
      >
        <img
          :src="book.thumbnail"
          alt="thumb"
          class="w-10 h-14 object-cover rounded"
        />
        <div>
          <div class="font-medium">{{ book.title }}</div>
          <div class="text-sm text-gray-500">{{ book.authors.join(", ") }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { searchBooks } from "../../api/kakao";
import BaseButton from "../../components/common/BaseButton.vue";

const query = ref("");
const results = ref([]);
const emit = defineEmits(["select"]);

const handleSearch = async () => {
  if (!query.value.trim()) return;

  const data = await searchBooks(query.value);
  results.value = data.documents.map((book) => ({
    title: book.title,
    authors: book.authors,
    isbn: book.isbn.split(" ").pop(),
    thumbnail: book.thumbnail,
  }));
};

const selectBook = (book) => {
  emit("select", book);
  results.value = [];
  query.value = book.title;
};
</script>
