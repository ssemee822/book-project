<script setup>
import { ref, onMounted } from "vue";
import BaseButton from "./BaseButton.vue";
import axios from "../../api/axios";

const newComment = ref("");
const comments = ref([]);

const props = defineProps({
  boardId: String,
});

onMounted(async () => {
  getCommentList();
});

const getCommentList = async () => {
  const res = await axios.get(`/api/board/${props.boardId}/comment/list`);
  comments.value = res.data.data;
};

const postComment = async () => {
  const body = {
    content: newComment.value,
  };
  const res = await axios.post(
    `/api/board/${props.boardId}/comment/post`,
    body
  );
  getCommentList();
};
</script>
<template>
  <div class="mb-4 flex gap-2">
    <input
      v-model="newComment"
      type="text"
      placeholder="댓글을 입력하세요"
      class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
    />
    <BaseButton @click="postComment">등록</BaseButton>
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
      <div class="text-xs text-gray-400">
        {{ comment.createdAt }}
      </div>
    </li>
  </ul>
</template>
