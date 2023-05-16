<script setup lang="ts">
import type { InjectionPoint } from '@/assets/Strips'
import { calculateVoltageDropPercentage } from '@/utils/voltageDrop'
import { debounce } from '@/utils/debounce'
import { ref } from 'vue'

const props = defineProps<{ injection: InjectionPoint; voltage: number }>()

const length = ref('0')
const wireAwg = ref<number | null>(null)

const handleInput = debounce(() => {
  if (!length.value) {
    return
  }
  const parsedLength = Number.parseFloat(length.value)
  if (Number.isNaN(parsedLength) || parsedLength <= 0 || parsedLength > 100) {
    return
  }
  const stripAmps = props.injection.amperage
  const stripLength = parsedLength
  const stripVoltage = props.voltage
  let awg = 22
  let percentage = calculateVoltageDropPercentage(stripAmps, stripLength, awg, stripVoltage)
  while (percentage > 10) {
    percentage = calculateVoltageDropPercentage(stripAmps, stripLength, awg, stripVoltage)
    awg--
  }
  wireAwg.value = awg
}, 300)
</script>

<template>
  <div class="flex justify-around">
    <p>{{ injection.position }}</p>
    <p>{{ injection.amperage }}A</p>
  </div>
  <div>
    <label :for="injection.position">Wire Length (m): </label>
    <input
      :id="injection.position"
      type="number"
      v-model="length"
      @input="handleInput"
      min="0"
      max="100"
      step="0.1"
    />
  </div>
  <p>AWG: {{ wireAwg ?? '?' }}</p>
</template>
