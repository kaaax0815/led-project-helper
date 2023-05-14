<script setup lang="ts">
import CardLayout from './CardLayout.vue'
import CardTitle from './CardTitle.vue'
import { calculatePower } from '@/assets/Strips'
import { computed } from 'vue'
import { usePSUStore } from '@/stores/psu'
import { useStripsStore } from '@/stores/strips'

const strips = useStripsStore()
const psu = usePSUStore()

const stripExists = computed(() => {
  const slots = strips.slots.filter((v) => v)
  if (slots.length === 0) {
    return false
  }
  return true
})

const power = computed(() => {
  if (!stripExists.value) {
    psu.$reset()
    return null
  }

  const { wattage, voltage } = strips.slots.reduce(
    (prev, curr) => {
      if (!curr) {
        return prev
      }
      const power = calculatePower(curr.strip, curr.length)

      const maxVoltage = Math.max(prev.voltage, power.voltage)

      return {
        wattage: prev.wattage + power.wattage,
        voltage: maxVoltage
      }
    },
    {
      wattage: 0,
      voltage: 0
    }
  )

  const amperage = wattage / voltage

  psu.setVoltage(voltage)
  psu.setAmperage(amperage)

  return {
    wattage,
    voltage,
    amperage
  }
})
</script>

<template>
  <CardLayout>
    <CardTitle>Power Supply at (50% RGB White)</CardTitle>
    <div v-if="stripExists">
      <p>Wattage: {{ power?.wattage?.toFixed(2) }}W</p>
      <p>Voltage: {{ power?.voltage?.toFixed(0) }}V</p>
      <p>Amperage: {{ power?.amperage?.toFixed(2) }}A</p>
    </div>
    <div v-else>
      <p>No strips added</p>
    </div>
  </CardLayout>
</template>
