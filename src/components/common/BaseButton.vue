<template>
  <button
    class="px-4 py-2 bg-[#e3c02b] hover:bg-[#c4a323] text-white font-semibold rounded transition duration-200 disabled:opacity-50"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
