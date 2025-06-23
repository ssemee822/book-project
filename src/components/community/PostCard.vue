<template>
  <div class="flex bg-white rounded-xl shadow p-4 gap-4" @click="goCommunity">
    <img
      :src="post.image"
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
            post.contents.length > 130
              ? post.contents.slice(0, 130) + "..."
              : post.contents
          }}</span>
        </div>
      </div>
      <div class="text-xs text-gray-400 text-right">
        조회수 {{ post.views }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  post: Object,
});

const router = useRouter();

const goCommunity = () => {
  router.push("/post");
};
</script>
