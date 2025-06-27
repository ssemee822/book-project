<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "../../api/axios.js";
import { searchBooks } from "../../api/kakao.js";

const router = useRouter();
const bookList = ref();

onMounted(() => {
  getTodoList();
});

const getTodoList = async () => {
  const res = await axios.get(`/api/user/me/books`);
  bookList.value = res.data.data;
  for (const book of bookList.value) {
    book.thumbnail = await getImage(book.isbn);
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

const goPostDetail = async (isbn) => {
  await router.push({
    name: "BookDetail",
    params: { isbn: isbn },
  });
  window.location.reload();
};
</script>

<template>
  <div>
    <div class="p-1 sm:p-4">
      <h2 class="text-lg font-bold mb-4">📚 내 서재</h2>
      <hr class="border-gray-300 my-4" />
      <div class="text-sm text-gray-500 mb-2">
        읽은 책: {{ bookList ? bookList.length : "" }}권
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto">
        <div
          v-for="book in bookList"
          :key="book.historyId"
          class="relative group cursor-pointer"
          @click="goPostDetail(book.isbn)"
        >
          <img
            :src="book.thumbnail"
            class="object-cover rounded shadow transition duration-200"
          />

          <div
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 rounded flex items-center justify-center transition duration-200"
          >
            <p
              class="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition duration-200 text-center px-2"
            >
              {{ book.memo }}
            </p>
          </div>
        </div>
      </div>

      <!-- <img src="../../../public/ho.png" class="mt-10" /> -->
    </div>
  </div>
</template>
