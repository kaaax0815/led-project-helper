<script setup lang="ts">
defineProps<{
  title: string
  link: string
}>()
</script>

<template>
  <a class="text-lg text-blue-400" target="_blank" rel="noopener noreferrer" :href="link">{{
    title
  }}</a>
</template>
