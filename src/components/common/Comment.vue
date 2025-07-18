<script setup>
import { ref, onMounted } from "vue";
import BaseButton from "./BaseButton.vue";
import axios from "../../api/axios";

const newComment = ref("");
const newRating = ref(0);
const hoverRating = ref(0);
const comments = ref([]);

const props = defineProps({
  boardId: String,
  isbn: String,
});

onMounted(async () => {
  if (props.isbn) getReviewList();
  else getCommentList();
});

const getCommentList = async () => {
  const res = await axios.get(`/api/board/${props.boardId}/comment/list`);
  comments.value = res.data.data;
};

const getReviewList = async () => {
  const res = await axios.get(`/api/book/comment/${props.isbn}/list`);
  comments.value = res.data.data;
};

const setRating = (n) => {
  newRating.value = n;
};

const postComment = async () => {
  if (!newComment.value.trim()) return;

  if (props.isbn) {
    const body = {
      isbn: props.isbn,
      content: newComment.value,
      rate: newRating.value || 0,
    };
    const res = await axios.post(`/api/book/comment/post`, body);

    getReviewList();
  } else {
    const body = {
      content: newComment.value,
    };
    await axios.post(`/api/board/${props.boardId}/comment/post`, body);
    getCommentList();
  }

  newComment.value = "";
  newRating.value = 0;
  hoverRating.value = 0;
  window.location.reload();
};

const handleLike = async (commentId, type) => {
  const res = await axios.post(
    `/api/board/${props.boardId}/comment/${commentId}/${type}`
  );
  getCommentList();
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
  <div class="mb-4">
    <div class="flex items-center mb-2" v-if="props.isbn">
      <span
        v-for="n in 5"
        :key="n"
        @click="setRating(n)"
        @mouseover="hoverRating = n"
        @mouseleave="hoverRating = 0"
        class="cursor-pointer text-2xl"
        :class="{
          'text-yellow-400': n <= (hoverRating || newRating),
          'text-gray-300': n > (hoverRating || newRating),
        }"
      >
        ★
      </span>
      <span class="ml-2 text-sm text-gray-600">{{ newRating }}점</span>
    </div>

    <div class="flex gap-2">
      <input
        v-model="newComment"
        type="text"
        placeholder="댓글을 입력하세요"
        class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
      />
      <BaseButton @click="postComment">등록</BaseButton>
    </div>
  </div>

  <ul class="space-y-4 p-4">
    <li
      v-for="comment in comments"
      :key="comment.boardCid"
      class="border-b pb-3"
    >
      <div class="text-m font-medium text-gray-800 mb-1">
        {{ comment.username }}
        <span v-if="props.isbn" class="ml-1">
          <span
            v-for="n in 5"
            class="text-sm"
            :class="{
              'text-yellow-400': n <= comment.rate,
              'text-gray-300': n > comment.rate,
            }"
          >
            ★
          </span>
        </span>
      </div>
      <div v-if="props.isbn">
        <div class="text-sm text-gray-600 mb-1">
          {{ comment.content }}
        </div>
      </div>
      <div v-else class="text-sm text-gray-600 mb-1">
        {{ comment.comment }}
      </div>
      <div class="text-xs text-gray-400 mb-1">
        {{ formatKoreanDateTime(comment.createdAt) }}
      </div>
      <div
        v-if="!props.isbn"
        class="text-xs text-gray-400 text-right mt-2 sm:mt-0"
      >
        <button
          @click="handleLike(comment.boardCid, 'LIKE')"
          class="transition disabled:opacity-40 mr-2"
          :class="
            comment.reaction == 'LIKE'
              ? 'text-red-500 hover:text-red-600 '
              : 'text-black-500 hover:text-black-600 '
          "
        >
          좋아요 {{ comment.likeCount }}
        </button>
        <button
          @click="handleLike(comment.boardCid, 'DISLIKE')"
          class="transition disabled:opacity-40"
          :class="
            comment.reaction == 'DISLIKE'
              ? 'text-blue-500 hover:text-blue-600 '
              : 'text-black-500 hover:text-black-600 '
          "
        >
          싫어요 {{ comment.hateCount }}
        </button>
      </div>
    </li>
  </ul>
</template>
