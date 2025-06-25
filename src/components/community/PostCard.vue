<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { searchBooks } from "../../api/kakao.js";

const props = defineProps({
  post: Object,
});

const router = useRouter();
const thumbnail = ref("");

const getImage = async (isbn) => {
  const result = await searchBooks(isbn, 1, "isbn");
  if (result.meta.total_count > 0) {
    thumbnail.value = result.documents[0].thumbnail;
  } else {
    thumbnail.value =
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5291060%3Ftimestamp%3D20250623135402";
  }
};

onMounted(() => {
  getImage(props.post.isbn);
});

const goCommunity = (id) => {
  console.log("id", id);
  router.push({
    name: "PostDetail",
    params: { boardId: id },
  });
};
</script>

<template>
  <div
    class="flex bg-white rounded-xl shadow p-4 gap-4"
    @click="goCommunity(post.boardId)"
  >
    <img
      :src="thumbnail"
      alt="thumbnail"
      class="w-20 h-28 object-cover rounded-md border"
    />
    <div class="flex flex-col justify-between flex-1">
      <div>
        <h2 class="font-semibold leading-snug text-gray-800 mb-1 truncate">
          {{ post.title }}
        </h2>
        <div class="text-sm text-gray-500 mb-1">
          <span class="mr-2">{{ post.author }}</span>
          <span>{{ post.date }}</span>
        </div>
        <div class="text-sm text-gray-500">
          <span class="mr-2">{{
            post.content.length > 130
              ? post.content.slice(0, 130) + "..."
              : post.content
          }}</span>
        </div>
      </div>
      <div class="text-xs text-gray-400 text-right">
        조회수 {{ post.views }}
      </div>
    </div>
  </div>
</template>
