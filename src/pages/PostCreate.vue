<script setup>
import BookSearch from "../components/common/BookSearch.vue";
import BaseButton from "../components/common/BaseButton.vue";
import axios from "../api/axios";
import router from "../router";
import { ref } from "vue";

const title = ref("");
const content = ref("");
const isbn = ref("");
const previewImage = ref(null);

const onImageSelected = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleBookSelect = (book) => {
  isbn.value = book.isbn;
};

const submitPost = async () => {
  if (!title.value || !content.value || !isbn.value) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  await axios.post("/api/board/post", {
    type: "BOOK",
    title: title.value,
    content: content.value,
    isbn: isbn.value,
  });

  alert("작성 완료!");
  router.push("/community");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">📝 글 작성</h2>

      <BookSearch @select="handleBookSelect" />

      <div>
        <label class="text-sm font-medium text-gray-700">선택된 ISBN</label>
        <input
          v-model="isbn"
          type="text"
          readonly
          class="w-full border rounded-xl p-3 bg-gray-100 text-gray-600"
        />
      </div>

      <div>
        <label class="text-sm font-medium text-gray-700">제목</label>
        <input
          v-model="title"
          type="text"
          class="w-full border rounded-xl p-3"
          placeholder="제목을 입력하세요"
        />
      </div>

      <div>
        <label class="text-sm font-medium text-gray-700">내용</label>
        <textarea
          v-model="content"
          class="w-full border rounded-xl p-3"
          rows="8"
          placeholder="내용을 입력하세요"
        />
      </div>

      <!-- <div>
        <label class="text-sm font-medium text-gray-700">이미지 첨부</label>
        <input type="file" @change="onImageSelected" />
        <img
          v-if="previewImage"
          :src="previewImage"
          class="w-40 mt-2 rounded shadow"
        />
      </div> -->

      <div class="flex justify-end">
        <BaseButton @click="submitPost">작성 완료</BaseButton>
      </div>
    </div>
  </div>
</template>
