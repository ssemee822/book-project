<template>
  <button
    class="px-4 py-2 bg-[#86994f] hover:bg-[#6e7d40] text-white font-semibold rounded transition duration-200 disabled:opacity-50"
    :disabled="disabled"
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
