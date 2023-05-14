<script setup lang="ts">
import { type ControllerTypes, Controllers, isVoltageSupported } from '@/assets/Controllers'
import CardLayout from './CardLayout.vue'
import CardTitle from './CardTitle.vue'
import { computed } from 'vue'
import { usePSUStore } from '@/stores/psu'
import { useStripsStore } from '@/stores/strips'

const props = defineProps<{
  controller: ControllerTypes
}>()

const strips = useStripsStore()
const psu = usePSUStore()

const controller = Controllers[props.controller]

const voltageMismatch = computed(() => {
  return strips.strips.filter((v) => v !== null).some((v) => v!.strip.voltage !== psu.voltage)
})

const unsupportedVoltage = computed(() => {
  if (psu.voltage === null) {
    return false
  }
  return !isVoltageSupported(props.controller, psu.voltage)
})

const exceededAmperage = computed(() => {
  if (psu.amperage === null) {
    return false
  }
  return psu.amperage > controller.maxAmperage
})
</script>

<template>
  <CardLayout>
    <CardTitle>Warnings</CardTitle>
    <div v-if="voltageMismatch">
      <p class="text-lg underline">Voltage Mismatch</p>
      <p>You will need Buck Converters</p>
    </div>
    <div v-if="exceededAmperage">
      <p class="text-lg underline">Amperage too high</p>
      <p>You will need a different controller</p>
    </div>
    <div v-if="unsupportedVoltage">
      <p class="text-lg underline">Voltage not supported</p>
      <p>You will need a different controller</p>
      <p>Expected: {{ controller.supportedVoltages.join('V or ') }}V</p>
    </div>
    <div v-if="!voltageMismatch && !exceededAmperage && !unsupportedVoltage">
      <p>Everything looks fine</p>
    </div>
  </CardLayout>
</template>
