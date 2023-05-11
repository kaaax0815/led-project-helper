<script setup lang="ts">
import { ControllerTypes, Controllers } from '@/assets/Controllers'
import LedCard from '@/components/LedCard.vue'
import PsuCard from '@/components/PsuCard.vue'
import WarningsCard from '@/components/WarningsCard.vue'
import { ref } from 'vue'

const props = defineProps<{
  controller: ControllerTypes
}>()

const channels = Controllers[props.controller].channels

const lEDs = ref([...Array(channels).keys()])
</script>

<template>
  <div id="grid" class="grid grid-flow-row gap-4 p-4">
    <PsuCard id="psu" />
    <WarningsCard id="warnings" :controller="controller" />
    <LedCard
      v-for="led in lEDs"
      :key="led"
      :index="led"
      :style="`grid-column: span ${4 / channels}`"
    />
  </div>
</template>

<style scoped>
#grid {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 2fr;
  grid-template-areas:
    'a a b b'
    '. . . .';
}
#psu {
  grid-area: a;
}

#warnings {
  grid-area: b;
}
</style>
