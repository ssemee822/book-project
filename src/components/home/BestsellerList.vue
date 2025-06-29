<script setup>
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import axios from "../../api/axios.js";
import { searchBooks } from "../../api/kakao.js";

const bookList = ref([]);
const topBooks = ref();
const books = ref();
const isbnList = ref([]);

onMounted(() => {
  getBestsellerList();
});

const getBestsellerList = async () => {
  try {
    const res = await axios.get("/api/book/best");
    console.log(res.data.item);
    res.data.item.forEach(async (data, index) => {
      isbnList.value[index] = data.isbn13;
    });
  } catch {
    isbnList.value = [
      9788936439743, 9791141602376, 9788901294742, 9791142319730, 9791197221989,
      9791162544259, 9791194413394, 9791142316760, 9791191114768, 9791194156222,
    ];
  }
  isbnList.value.forEach(async (data, index) => {
    const res = await searchBooks(data, 1, "isbn");
    bookList.value[index] = res.documents[0];
    topBooks.value = bookList.value.slice(0, 3);
    books.value = bookList.value.slice(3);
  });
};
const router = useRouter();

const goToDetail = (book) => {
  router.push({
    name: "BookDetail",
    params: { isbn: book.isbn.split(" ")[1] },
  });
};

const getHighQualityThumbnail = (url) => {
  const match = url?.match(/fname=(.+)$/);
  return match ? decodeURIComponent(match[1]) : url;
};
</script>

<template>
  <div class="space-y-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(book, idx) in topBooks"
        :key="idx"
        @click="goToDetail(book)"
        class="relative cursor-pointer group"
      >
        <img
          :src="
            getHighQualityThumbnail(book?.thumbnail) ||
            'https://via.placeholder.com/300x400?text=No+Image'
          "
          class="w-full h-[300px] object-contain rounded-xl shadow-lg group-hover:shadow-2xl transition"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 rounded-b-xl"
        >
          <h3 class="text-xl font-semibold truncate">{{ book?.title }}</h3>
          <p class="text-sm">{{ book?.authors?.join(", ") || "-" }}</p>
        </div>
        <div
          class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-xl text-xs shadow"
        >
          베스트셀러 {{ idx + 1 }}위
        </div>
      </div>
    </div>

    <hr class="border-t border-gray-200" />
    <div class="space-y-4">
      <div
        v-for="(book, index) in books"
        :key="index"
        @click="goToDetail(book)"
        class="bg-white p-4 rounded-xl shadow flex gap-4 cursor-pointer hover:shadow-md"
      >
        <div class="relative w-24 h-32">
          <img
            :src="book?.thumbnail"
            alt="cover"
            class="w-full h-full object-cover rounded"
          />
          <div
            class="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 rounded-br"
          >
            {{ index + 4 }}위
          </div>
        </div>
        <div class="flex-1">
          <div class="font-semibold leading-snug text-lg">
            {{ book?.title }}
          </div>
          <div class="text-sm text-gray-700 mt-1">
            저자 {{ book?.authors?.join(", ") || "-" }}<br />
            출판 {{ book?.publisher }} •
            {{ book?.datetime?.slice(0, 10) || "-" }}
          </div>
          <div class="text-sm text-gray-600 mt-1">
            정가: {{ book?.price.toLocaleString() }}원
            <template v-if="book?.sale_price > 0">
              / 구매가: {{ book?.sale_price.toLocaleString() }}원
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
