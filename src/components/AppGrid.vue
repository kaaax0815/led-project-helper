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
  <div class="space-y-4 p-4">
    <div class="flex flex-col justify-around gap-4 lg:flex-row">
      <PsuCard />
      <WarningsCard :controller="controller" />
    </div>
    <div class="flex flex-col justify-around gap-4 lg:flex-row">
      <LedCard v-for="led in lEDs" :key="led" :index="led" />
    </div>
  </div>
</template>
