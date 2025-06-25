<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  post: Object,
  type: String,
});

const goCommunity = (id) => {
  router.push({
    name: "PostDetail",
    params: { boardId: id },
  });
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
  <div
    class="flex bg-white rounded-xl shadow p-4 gap-4"
    @click="goCommunity(post.boardId)"
  >
    <img
      v-if="props.type != 'book'"
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
          <span>{{ formatKoreanDateTime(post.createdAt) }}</span>
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
