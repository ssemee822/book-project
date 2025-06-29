<script setup>
import Comment from "../components/common/Comment.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "../api/axios";
import { searchBooks } from "../api/kakao.js";

const route = useRoute();
const boardId = route.params.boardId;
const post = ref([]);
const book_img = ref("");
const isbn = ref("");
const router = useRouter();
const showMenu = ref(false);
const nickname = localStorage.getItem("nickname");
const isMe = ref(false);
const isLoading = ref(true);

onMounted(async () => {
  getPost();
});

const getPost = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get("/api/board/" + boardId);
    post.value = res.data.data;
    isbn.value = res.data.data.isbn;
    await getImage(isbn.value);
    isMe.value = nickname === post.value.username;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const getImage = async (isbn) => {
  const result = await searchBooks(isbn, 1, "isbn");
  if (result.meta.total_count > 0) {
    book_img.value = getHighQualityThumbnail(result.documents[0].thumbnail);
  } else {
    book_img.value =
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5291060%3Ftimestamp%3D20250623135402";
  }
};

const goPostDetail = (book) => {
  router.push({
    name: "BookDetail",
    params: { isbn: isbn.value },
  });
};

const getHighQualityThumbnail = (url) => {
  const match = url?.match(/fname=(.+)$/);
  return match ? decodeURIComponent(match[1]) : url;
};

const handleLike = async () => {
  const res = await axios.post(`/api/board/like/${boardId}`);
  getPost();
};

const handleDelete = async () => {
  const res = await axios.delete(`/api/board/delete/${boardId}`);
  router.push("/community");
};

function formatKoreanDateTime(isoString) {
  const date = new Date(isoString);
  const pad = (n) => String(n).padStart(2, "0");

  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());

  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}
</script>
<template>
  <div class="flex justify-center align-center">
    <div class="max-w-3xl mx-auto flex-1 mt-8">
      <div v-if="isMe" class="relative flex justify-end mr-4">
        <button
          @click="showMenu = !showMenu"
          class="text-2xl text-gray-600 hover:text-black px-2"
        >
          ⋯
        </button>
        <div
          v-if="showMenu"
          class="absolute right-0 mt-8 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <ul class="text-sm text-gray-700 divide-y divide-gray-100">
            <li>
              <button
                class="w-full flex items-center px-4 py-2 hover:bg-red-100 text-red-500"
                @click="handleDelete"
              >
                🗑️ <span class="ml-2">삭제</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="isLoading" class="flex py-40 justify-center">
        <svg
          class="animate-spin h-8 w-8 text-[#9baa59]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>
      <transition name="fade-slide" mode="out-in">
        <div
          v-if="!isLoading"
          :key="post.boardId"
          class="flex flex-col items-center"
        >
          <h1 class="text-2xl font-bold mb-2 mt-4 p-4 sm:p-0">
            {{ post.title }}
          </h1>
          <div class="text-sm text-gray-500 mb-1">{{ post.username }}</div>
          <div class="text-sm text-gray-500 mb-1">
            {{ formatKoreanDateTime(post.createdAt) }}
          </div>
          <div class="text-sm text-gray-500 mb-6 flex items-center gap-2">
            좋아요 {{ post.likeCount }}
            <button
              @click="handleLike"
              class="transition disabled:opacity-40 underline"
              :class="
                post.isLiked
                  ? 'text-red-500 hover:text-red-600 '
                  : 'text-black-500 hover:text-black-600 '
              "
            >
              {{ post.isLiked ? "❤️" : "🖤" }}
              좋아요
            </button>
          </div>
          <hr class="mb-16 border-t border-gray-300 w-4/5" />
          <img
            @click="goPostDetail"
            :src="book_img"
            class="w-1/4 max-h-96 object-cover cursor-pointer rounded mb-4"
          />
          <div class="text-base leading-relaxed whitespace-pre-line p-6 w-5/6">
            {{ post.content }}
          </div>

          <div class="w-full mt-12 px-6 mb-4">
            <h2 class="text-lg font-semibold mb-4">💬 댓글</h2>
            <Comment :boardId="boardId"></Comment>
          </div>
        </div>
      </transition>
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
