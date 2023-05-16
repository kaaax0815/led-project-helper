<script setup lang="ts">
import { type InjectionPoint, type Strip, Strips, calculateInjections } from '@/assets/Strips.js'
import { ref, watch } from 'vue'
import CardLayout from './CardLayout.vue'
import CardTitle from './CardTitle.vue'
import LedButton from './LedButton.vue'
import LedInjection from './LedInjection.vue'
import { useStripsStore } from '@/stores/strips'

const props = defineProps({
  index: { type: Number, required: true }
})

const strips = useStripsStore()

const stripType = ref('')
const stripVoltage = ref('')
const stripLEDsPerMeter = ref('')
const stripLength = ref('5')

const availableStrips = ref<Strip[]>(Strips)
const injectionData = ref<{ points: InjectionPoint[]; voltage: number } | null>(null)

watch([stripType, stripVoltage, stripLEDsPerMeter], ([type, voltage, lEDsPerMeter]) => {
  let strips = [...Strips]

  if (type) {
    strips = strips.filter((strip) => strip.type === type)
  }

  if (voltage) {
    const parsedVoltage = Number.parseInt(voltage)
    if (!Number.isNaN(parsedVoltage) && parsedVoltage > 0) {
      strips = strips.filter((strip) => strip.voltage === parsedVoltage)
    }
  }

  if (lEDsPerMeter) {
    const parsedLEDsPerMeter = Number.parseInt(lEDsPerMeter)
    if (!Number.isNaN(parsedLEDsPerMeter) && parsedLEDsPerMeter > 0) {
      strips = strips.filter((strip) => strip.lEDsPerMeter === parsedLEDsPerMeter)
    }
  }

  availableStrips.value = strips
})

const handleCalculate = () => {
  if (availableStrips.value.length === 0 || availableStrips.value.length > 1) {
    return
  }

  const length = stripLength.value
  if (!length) {
    return
  }

  const parsedLength = Number.parseFloat(length)
  if (Number.isNaN(parsedLength) || parsedLength <= 0) {
    return
  }

  strips.addStrip(props.index, availableStrips.value[0], parsedLength)

  injectionData.value = {
    points: calculateInjections(availableStrips.value[0], parsedLength),
    voltage: availableStrips.value[0].voltage
  }
}

const handleReset = () => {
  stripType.value = ''
  stripVoltage.value = ''
  stripLEDsPerMeter.value = ''
  stripLength.value = '5'
  availableStrips.value = Strips
  injectionData.value = null
  strips.removeStrip(props.index)
}

const getUniqueArray = <T extends keyof Strip>(key: T) => {
  const uniqueArray = new Set<Strip[T]>()
  availableStrips.value.forEach((item) => {
    uniqueArray.add(item[key])
  })
  return Array.from(uniqueArray)
}
</script>

<template>
  <CardLayout>
    <CardTitle>LED {{ props.index + 1 }}</CardTitle>
    <div>
      <label for="stripType">Type: </label>
      <select id="stripType" v-model="stripType">
        <option selected value>Select an option</option>
        <option v-for="stripType in getUniqueArray('type')" :key="stripType" :value="stripType">
          {{ stripType }}
        </option>
      </select>
    </div>
    <div>
      <label for="stripVoltage">Voltage: </label>
      <select id="stripVoltage" v-model="stripVoltage">
        <option selected value>Select an option</option>
        <option v-for="voltage in getUniqueArray('voltage')" :key="voltage">{{ voltage }}V</option>
      </select>
    </div>
    <div>
      <label for="stripLEDsPerMeter">LEDs/m: </label>
      <select id="stripLEDsPerMeter" v-model="stripLEDsPerMeter">
        <option selected value>Select an option</option>
        <option v-for="lEDsPerMeter in getUniqueArray('lEDsPerMeter')" :key="lEDsPerMeter">
          {{ lEDsPerMeter }}LEDs/m
        </option>
      </select>
    </div>
    <div>
      <label for="stripLength">Strip Length (m): </label>
      <input id="stripLength" type="number" v-model="stripLength" min="1" max="100" step="0.5" />
    </div>
    <div class="flex justify-around">
      <LedButton value="Calculate" @click="handleCalculate" />
      <LedButton value="Reset" @click="handleReset" />
    </div>
    <div v-if="injectionData !== null">
      <p class="mb-2 text-xl">Injections</p>
      <ul>
        <li
          v-for="injectionPoint in injectionData.points"
          :key="injectionPoint.position"
          class="mb-4"
        >
          <LedInjection :injection="injectionPoint" :voltage="injectionData.voltage" />
        </li>
      </ul>
    </div>
  </CardLayout>
</template>
