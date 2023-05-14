<script setup lang="ts">
defineProps<{value: string}>()
</script>

<template>
  <input
    class="bg-quin-light hover:bg-quin-dark disabled:bg-quin disabled:hover:bg-quin cursor-pointer rounded-lg border border-gray-600 p-2 disabled:cursor-not-allowed disabled:border-gray-900 disabled:text-gray-300"
    type="button"
    :value="value"
    ref="button"
  />
</template>
