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

onMounted(async () => {
  getPost();
});

const getPost = async () => {
  const res = await axios.get("/api/board/" + boardId);
  post.value = res.data.data;
  isbn.value = res.data.data.isbn;
  getImage(isbn.value);
  console.log(post.value);
};

const getImage = async (isbn) => {
  const result = await searchBooks(isbn, 1, "isbn");
  if (result.meta.total_count > 0) {
    book_img.value = result.documents[0].thumbnail;
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
  <div class="flex">
    <div class="max-w-3xl mx-auto flex-1">
      <button
        @click="$emit('go-back')"
        class="text-[#9baa59] text-sm mb-4 hover:underline"
      >
        <!-- ← 목록으로 돌아가기 -->
      </button>
      <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold mb-2 mt-4">{{ post.title }}</h1>
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
          :src="getHighQualityThumbnail(book_img)"
          class="w-1/4 max-h-96 object-cover cursor-pointer rounded mb-4"
        />
        <div class="text-base leading-relaxed whitespace-pre-line p-6 w-5/6">
          {{ post.content }}
        </div>

        <div class="w-full mt-12 px-6">
          <h2 class="text-lg font-semibold mb-4">💬 댓글</h2>
          <Comment :boardId="boardId"></Comment>
        </div>
      </div>
    </div>
  </div>
</template>
