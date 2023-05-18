<script setup lang="ts">
import { computed } from 'vue'
import { useStripsStore } from '@/stores/strips'

const strips = useStripsStore()

const props = defineProps<{
  index: number
}>()

const strip = computed(() => {
  const slot = strips.slots[props.index]
  if (!slot) {
    return null
  }
  return slot.strip
})
</script>

<template>
  <div v-if="strip !== null">
    <p class="text-xl">Information</p>
    <ul>
      <li v-for="info in strip.information" :key="info" class="ml-4 list-disc">
        {{ info }}
      </li>
    </ul>

    <a
      :href="strip.buyLink"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-400 underline"
      >Buy Link (Affiliate) (Example)</a
    >
  </div>
</template>
