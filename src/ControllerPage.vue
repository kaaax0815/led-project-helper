<script setup lang="ts">
import AppGrid from '@/components/AppGrid.vue'

defineProps({
  controller: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div>
    <AppGrid :controller="controller" />
  </div>
</template>
