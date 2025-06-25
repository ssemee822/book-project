<script setup>
import ProfileCard from "../components/common/ProfileCard.vue";
import Comment from "../components/common/Comment.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "../api/axios";
import { searchBooks } from "../api/kakao.js";

const route = useRoute();
const boardId = route.params.boardId;
const post = ref([]);
const book_img = ref("");

onMounted(async () => {
  getPost();
});

const getPost = async () => {
  const res = await axios.get("/api/board/" + boardId);
  post.value = res.data.data;
  getImage(res.data.data.isbn);
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

const getHighQualityThumbnail = (url) => {
  const match = url?.match(/fname=(.+)$/);
  return match ? decodeURIComponent(match[1]) : url;
};

const handleLike = async () => {
  const res = await axios.post(`/api/board/like/${boardId}`);
  getPost();
};
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
          {{ post.createdAt }}
        </div>
        <div class="text-sm text-gray-500 mb-6 flex items-center gap-2">
          좋아요 {{ post.likeCount }}
          <button
            @click="handleLike"
            :disabled="liked"
            class="text-red-500 hover:text-red-600 transition disabled:opacity-40"
          >
            ❤️ 좋아요
          </button>
        </div>
        <hr class="mb-16 border-t border-gray-300 w-4/5" />
        <img
          :src="getHighQualityThumbnail(book_img)"
          class="w-1/4 max-h-96 object-cover rounded mb-4"
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
    <div class="w-1/4 p-4 bg-[#f7f5f0]">
      <ProfileCard />
    </div>
  </div>
</template>
