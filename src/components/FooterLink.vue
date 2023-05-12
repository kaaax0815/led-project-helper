<script setup lang="ts">
defineProps<{
  link: string
}>()
</script>

<template>
  <a :href="link" target="_blank" class="hover:underline" rel="noopener noreferrer"><slot /></a>
</template>
