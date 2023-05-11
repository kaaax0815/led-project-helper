<script setup lang="ts">
import { type ControllerTypes, Controllers, isVoltageSupported } from '@/assets/Controllers'
import CardLayout from './CardLayout.vue'
import CardTitle from './CardTitle.vue'
import { computed } from 'vue'
import { usePSUStore } from '@/stores/psu'

const props = defineProps<{
  controller: ControllerTypes
}>()

const psu = usePSUStore()

const controller = Controllers[props.controller]

const voltageMismatch = computed(() => {
  if (psu.voltage === null) {
    return false
  }
  return !isVoltageSupported(props.controller, psu.voltage)
})

const exceededAmperage = computed(() => {
  if (psu.totalAmps === null) {
    return false
  }
  return psu.totalAmps > controller.maxAmperage
})
</script>

<template>
  <CardLayout>
    <CardTitle>Warnings</CardTitle>
    <div v-if="psu.voltageMismatch">
      <p class="text-lg underline">Voltage Mismatch</p>
      <p>You will need Buck Converters</p>
    </div>
    <div v-if="exceededAmperage">
      <p class="text-lg underline">Amperage too high</p>
      <p>You will need a different controller</p>
    </div>
    <div v-if="voltageMismatch">
      <p class="text-lg underline">Voltage not supported</p>
      <p>You will need a different controller</p>
      <p>Expected: {{ controller.supportedVoltages.join('V or ') }}V</p>
    </div>
    <div v-if="!psu.voltageMismatch && !exceededAmperage && !voltageMismatch">
      <p>Everything looks fine</p>
    </div>
  </CardLayout>
</template>
