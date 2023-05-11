<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  internal: {
    type: String,
    required: true
  },
  external: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex justify-center lg:block">
    <div class="bg-quin flex flex-col items-center rounded-lg border border-gray-700 p-4 shadow">
      <h2 class="text-4xl font-extrabold">{{ title }}</h2>
      <p class="my-2 text-lg text-gray-400">{{ description }}</p>
      <div class="flex flex-col items-center space-y-1">
        <router-link
          :to="internal"
          class="rounded-lg bg-blue-700 px-4 py-1 text-lg hover:bg-blue-800"
          >Get started ►</router-link
        >
        <a :href="external" class="text-lg text-blue-400" target="_blank" rel="noopener noreferrer"
          >More Information</a
        >
      </div>
    </div>
  </div>
</template>
