<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @keyup.enter="$emit('search', modelValue)"
    class="w-full p-2 border rounded"
    placeholder="검색어 입력"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
defineEmits(["update:modelValue", "search"]);
</script>
