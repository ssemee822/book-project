<script setup>
import { computed } from "vue";
// ⭐ BookListItem 컴포넌트 임포트: 동일 폴더 내에 있으므로 './BookListItem.vue'
import BookListItem from "./BookListItem.vue"; 

const props = defineProps({
  books: Array,
  currentPage: Number,
  totalPages: Number,
  pageSize: Number,
});

const emit = defineEmits(['change-page']);

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
</script>

<template>
  <div>
    <transition name="fade-slide" mode="out-in">
      <div :key="currentPage" class="space-y-4 mb-6">
        <BookListItem
          v-for="(book, index) in books"
          :key="book.isbn"
          :book="book"
          :itemIndex="(currentPage - 1) * pageSize + index"
        />
      </div>
    </transition>

    <div class="flex justify-center gap-2" v-if="books && books.length > 0">
      <button
        @click="emit('change-page', currentGroupStart - 1)"
        :disabled="currentGroupStart === 1"
        class="px-3 py-1 border rounded disabled:opacity-30"
      >
        이전
      </button>

      <button
        v-for="page in pageGroup"
        :key="page"
        @click="emit('change-page', page)"
        class="px-3 py-1 border rounded"
        :class="{ 'bg-[#e3c02b] text-white': page === currentPage }"
      >
        {{ page }}
      </button>

      <button
        @click="emit('change-page', currentGroupStart + groupSize)"
        :disabled="currentGroupStart + groupSize > totalPages"
        class="px-3 py-1 border rounded disabled:opacity-30"
      >
        다음
      </button>
    </div>
    <div v-else class="text-center text-gray-500 mt-10">
      검색 결과가 없습니다.
    </div>
  </div>
</template>

<style scoped>
/* 기존 스타일 */
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
