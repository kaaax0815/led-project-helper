<script setup lang="ts">
import { computed, ref } from 'vue'
import CardLayout from './CardLayout.vue'
import CardTitle from './CardTitle.vue'
import { calculatePower } from '@/assets/Strips'
import { calculateVoltageDropPercentage } from '@/utils/voltageDrop'
import { usePSUStore } from '@/stores/psu'
import { useStripsStore } from '@/stores/strips'

const strips = useStripsStore()
const psu = usePSUStore()

const wireLength = ref('0')
const wireAwg = ref<number | null>(null)

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

const handleInput = () => {
  if (!wireLength.value) {
    return
  }
  const parsedLength = parseFloat(wireLength.value)
  if (Number.isNaN(parsedLength) || parsedLength <= 0 || parsedLength > 100) {
    return
  }

  const amperage = power.value?.amperage
  const voltage = power.value?.voltage

  if (!amperage || !voltage) {
    return
  }

  let awg = 22
  let percentage = calculateVoltageDropPercentage(amperage, parsedLength, awg, voltage)
  while (percentage > 10) {
    awg--
    percentage = calculateVoltageDropPercentage(amperage, parsedLength, awg, voltage)
  }

  wireAwg.value = awg
}
</script>

<template>
  <CardLayout>
    <CardTitle>Power Supply at (50% RGB White)</CardTitle>
    <div class="flex justify-around" v-if="stripExists">
      <div>
        <p>Wattage: {{ power?.wattage.toFixed(2) }}W</p>
        <p>Voltage: {{ power?.voltage.toFixed(0) }}V</p>
        <p>Amperage: {{ power?.amperage.toFixed(2) }}A</p>
      </div>
      <div>
        <label for="wireLength">Wire Length (m): </label>
        <input
          id="wireLength"
          type="number"
          min="0"
          max="100"
          step="0.1"
          v-model="wireLength"
          @input="handleInput"
        />
        <p>AWG: {{ wireAwg ?? '?' }}</p>
      </div>
    </div>
    <div v-else>
      <p>No strips added</p>
    </div>
  </CardLayout>
</template>
