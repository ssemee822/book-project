<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  books: Array,
  currentPage: Number,
  totalPages: Number,
  pageSize: Number,
});

const groupSize = 10;

const currentGroupStart = computed(() => {
  return Math.floor((props.currentPage - 1) / groupSize) * groupSize + 1;
});

const pageGroup = computed(() => {
  return Array.from(
    { length: groupSize },
    (_, i) => currentGroupStart.value + i
  ).filter((page) => page <= props.totalPages);
});

const router = useRouter();

const goToDetail = (book) => {
  router.push({
    name: "BookDetail",
    params: { isbn: book.isbn.split(" ")[1] },
  });
};
</script>

<template>
  <div>
    <transition name="fade-slide" mode="out-in">
      <div :key="currentPage" class="space-y-4 mb-6">
        <div
          v-for="(book, index) in books"
          @click="goToDetail(book)"
          :key="book.isbn"
          class="bg-white p-4 rounded-xl shadow flex gap-4 cursor-pointer transition hover:shadow-lg"
        >
          <div class="relative w-24 h-32">
            <img
              :src="
                book.thumbnail ||
                'https://via.placeholder.com/96x128?text=No+Image'
              "
              alt="cover"
              class="w-full h-full object-cover rounded"
            />
            <div
              class="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 rounded-br"
            >
              {{ (currentPage - 1) * pageSize + index + 1 }}
            </div>
          </div>
          <div class="flex-1">
            <div class="font-semibold leading-snug">
              {{ book.title }}
            </div>
            <div class="text-sm text-gray-700 mt-1">
              저자 {{ book.authors?.join(", ") || "-" }}<br />
              출판 {{ book.publisher }} •
              {{ book.datetime?.slice(0, 10) || "-" }}
            </div>
            <div class="text-sm text-gray-600 mt-1">
              정가: {{ book.price.toLocaleString() }}원
              <template v-if="book.sale_price > 0">
                / 구매가: {{ book.sale_price.toLocaleString() }}원
              </template>
            </div>
            <div class="text-sm text-gray-500 mt-1 line-clamp-2">
              {{ book.contents }}
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="flex justify-center gap-2" v-if="books[0]">
      <button
        @click="$emit('change-page', currentGroupStart - 1)"
        :disabled="currentGroupStart === 1"
        class="px-3 py-1 border rounded disabled:opacity-30"
      >
        이전
      </button>

      <button
        v-for="page in pageGroup"
        :key="page"
        @click="$emit('change-page', page)"
        class="px-3 py-1 border rounded"
        :class="{ 'bg-[#e3c02b] text-white': page === currentPage }"
      >
        {{ page }}
      </button>

      <button
        @click="$emit('change-page', currentGroupStart + groupSize)"
        :disabled="currentGroupStart + groupSize > totalPages"
        class="px-3 py-1 border rounded disabled:opacity-30"
      >
        다음
      </button>
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
