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
  console.log(props.isbn);
  if (props.isbn) getReviewList();
  else getCommentList();
});

const getCommentList = async () => {
  const res = await axios.get(`/api/board/${props.boardId}/comment/list`);
  comments.value = res.data.data;
};

const getReviewList = async () => {
  console.log("getReviewList");
};

const setRating = (n) => {
  newRating.value = n;
};

const postComment = async () => {
  if (!newComment.value.trim()) return;

  if (props.isbn) {
    const body = {
      content: newComment.value,
      rate: newRating.value || 0,
    };
    console.log("postComment", body);

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
};
</script>

<template>
  <div class="mb-4">
    <div class="flex items-center mb-2">
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
      <div class="text-sm font-medium text-gray-800">
        {{ comment.username }}
      </div>
      <div class="text-sm text-gray-600 mb-1">
        {{ comment.comment }}
      </div>
      <div class="text-xs text-gray-400 mb-1">
        {{ comment.createdAt }}
      </div>
      <div class="text-xs text-yellow-500">별점: {{ comment.rating }}점</div>
    </li>
  </ul>
</template>
