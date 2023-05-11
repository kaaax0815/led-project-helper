<script setup lang="ts">
import { computed, watch } from 'vue'
import CardLayout from './CardLayout.vue'
import CardTitle from './CardTitle.vue'
import { calculatePower } from '@/assets/Strips'
import { usePSUStore } from '@/stores/psu'
import { useStripsStore } from '@/stores/strips'

const strips = useStripsStore()
const psu = usePSUStore()

const stripExists = computed(() => {
  return !strips.strips.every((v) => v === null)
})

const power = computed(() => {
  return strips.strips.reduce(
    (prev, curr) => {
      if (!curr) {
        return prev
      }
      if (prev.wattage === null || prev.voltage === null || prev.amperage == null) {
        prev.wattage = 0
        prev.voltage = 0
        prev.amperage = 0
      }
      const power = calculatePower(curr.strip, curr.length)

      const newWattage = prev.wattage + power.wattage
      let newVoltage = prev.voltage
      if (prev.voltage !== curr.strip.voltage) {
        if (prev.voltage !== 0) {
          psu.setVoltageMismatch(true)
        }
        newVoltage = curr.strip.voltage
      }
      const newAmperage = newWattage / newVoltage
      return {
        wattage: newWattage,
        voltage: newVoltage,
        amperage: newAmperage
      }
    },
    {
      wattage: null as null | number,
      voltage: null as null | number,
      amperage: null as null | number
    }
  )
})

watch(power, (v) => {
  if (v.voltage === null || v.amperage === null) {
    return
  }
  psu.setVoltage(v.voltage)
  psu.setTotalAmps(v.amperage)
})

watch(stripExists, (v) => {
  if (!v) {
    psu.resetPSU()
  }
})
</script>

<template>
  <CardLayout>
    <CardTitle>Power Supply at (50% RGB White)</CardTitle>
    <div v-if="stripExists">
      <p>Wattage: {{ power.wattage?.toFixed(2) }}W</p>
      <p>Voltage: {{ power.voltage?.toFixed(0) }}V</p>
      <p>Amperage: {{ power.amperage?.toFixed(2) }}A</p>
    </div>
    <div v-else>
      <p>No strips added</p>
    </div>
  </CardLayout>
</template>
