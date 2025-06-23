<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">📝 글 작성</h2>

      <div class="space-y-2">
        <label class="text-gray-700 font-medium">제목</label>
        <input
          v-model="title"
          type="text"
          placeholder="제목을 입력하세요"
          class="w-full border rounded-xl p-3 focus:outline-none focus:ring focus:ring-yellow-300"
        />
      </div>

      <div class="space-y-2">
        <label class="text-gray-700 font-medium">내용</label>
        <textarea
          v-model="content"
          placeholder="내용을 작성하세요"
          rows="8"
          class="w-full border rounded-xl p-3 focus:outline-none focus:ring focus:ring-yellow-300"
        />
      </div>

      <div class="space-y-2">
        <label class="text-gray-700 font-medium">이미지 첨부</label>
        <br />
        <input
          type="file"
          accept="image/*"
          @change="onImageSelected"
          class="text-sm"
        />
        <div v-if="previewImage" class="mt-2">
          <img :src="previewImage" class="w-40 rounded-lg shadow" />
        </div>
      </div>

      <div class="flex justify-end">
        <BaseButton @click="submitPost">작성 완료</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "../components/common/BaseButton.vue";

const title = ref("");
const content = ref("");
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

const submitPost = () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert("제목과 내용을 입력해주세요.");
    return;
  }
  alert("작성 완료! (임시)");
};
</script>
