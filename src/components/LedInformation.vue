<script setup lang="ts">
import { computed } from 'vue'
import { useStripsStore } from '@/stores/strips'

const strips = useStripsStore()

const props = defineProps<{
  index: number
}>()

const information = computed(() => {
  const slot = strips.slots[props.index]
  if (!slot) {
    return null
  }
  const lEDs = slot.strip.lEDsPerMeter * slot.length
  const pixels = lEDs / slot.strip.addressableBy
  /** @Unit cm */
  const pixelLength = (1 / slot.strip.lEDsPerMeter) * slot.strip.addressableBy * 100
  return {
    information: slot.strip.information,
    buyLink: slot.strip.buyLink,
    lEDs,
    pixels,
    pixelLength
  }
})
</script>

<template>
  <div v-if="information !== null">
    <p class="text-xl">Information</p>
    <ul>
      <li v-for="info in information.information" :key="info" class="ml-4 list-disc">
        {{ info }}
      </li>
    </ul>
    <div>
      <p>LEDs: {{ information.lEDs }}</p>
      <p>Pixels: {{ information.pixels }}</p>
      <p>Pixel Length: {{ information.pixelLength.toFixed(1) }}cm</p>
    </div>
    <a
      :href="information.buyLink"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-400 underline"
      >Buy Link (Affiliate) (Example)</a
    >
  </div>
</template>
