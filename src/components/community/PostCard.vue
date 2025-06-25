<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  post: Object,
});

const router = useRouter();

const goCommunity = (id) => {
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
      :src="post.thumbnail"
      alt="thumbnail"
      class="w-20 h-28 object-cover rounded-md border"
    />
    <div class="flex flex-col justify-between flex-1">
      <div>
        <h2 class="font-semibold leading-snug text-gray-800 mb-1 truncate">
          {{ post.title }}
        </h2>
        <div class="text-sm text-gray-500 mb-1">
          <span class="mr-2">{{ post.username }}</span>
          <span>{{ post.createdAt }}</span>
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
        좋아요 {{ post.likeCount }}
      </div>
    </div>
  </div>
</template>
