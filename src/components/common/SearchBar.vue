<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "search"]);

const showClear = computed(() => props.modelValue.trim().length > 0);

const clear = () => {
  emit("update:modelValue", "");
};
</script>

<template>
  <div
    class="flex items-center w-full rounded-full border-2 border-yellow-400 bg-white px-4 py-2 shadow-lg transition focus-within:ring-2 focus-within:ring-yellow-400"
  >
    <span class="text-yellow-400 mr-2 text-lg">🔍</span>

    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="$emit('search', modelValue)"
      placeholder="책 제목, 저자, 키워드 검색"
      class="flex-1 text-sm placeholder-gray-400 bg-transparent focus:outline-none"
    />

    <button
      v-if="showClear"
      @click="clear"
      class="text-gray-400 hover:text-red-400 ml-2 text-lg"
      aria-label="입력 지우기"
    >
      ❌
    </button>
  </div>
</template>
