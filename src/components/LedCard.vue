<script setup lang="ts">
import { type InjectionPoint, type Strip, Strips, calculateInjections } from '@/assets/Strips.js'
import CardLayout from './CardLayout.vue'
import CardTitle from './CardTitle.vue'
import LedButton from './LedButton.vue'
import LedInformation from './LedInformation.vue'
import LedInjection from './LedInjection.vue'
import { ref } from 'vue'
import { useStripsStore } from '@/stores/strips'

const props = defineProps({
  index: { type: Number, required: true }
})

const strips = useStripsStore()

const stripType = ref('')
const stripVoltage = ref('')
const stripLEDsPerMeter = ref('')
const stripLength = ref('5')

const injectionData = ref<{ points: InjectionPoint[]; voltage: number } | null>(null)

const handleCalculate = () => {
  let availableStrips = [...Strips]

  const type = stripType.value
  const voltage = stripVoltage.value
  const lEDsPerMeter = stripLEDsPerMeter.value

  if (type) {
    availableStrips = availableStrips.filter((strip) => strip.type === type)
  }

  if (voltage) {
    const parsedVoltage = Number.parseInt(voltage)
    if (!Number.isNaN(parsedVoltage) && parsedVoltage > 0) {
      availableStrips = availableStrips.filter((strip) => strip.voltage === parsedVoltage)
    }
  }

  if (lEDsPerMeter) {
    const parsedLEDsPerMeter = Number.parseInt(lEDsPerMeter)
    if (!Number.isNaN(parsedLEDsPerMeter) && parsedLEDsPerMeter > 0) {
      availableStrips = availableStrips.filter((strip) => strip.lEDsPerMeter === parsedLEDsPerMeter)
    }
  }

  if (availableStrips.length === 0 || availableStrips.length > 1) {
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

  strips.addStrip(props.index, availableStrips[0], parsedLength)

  injectionData.value = {
    points: calculateInjections(availableStrips[0], parsedLength),
    voltage: availableStrips[0].voltage
  }
}

const handleReset = () => {
  stripType.value = ''
  stripVoltage.value = ''
  stripLEDsPerMeter.value = ''
  stripLength.value = '5'
  injectionData.value = null
  strips.removeStrip(props.index)
}

const getUniqueArray = <A extends Strip[], K extends keyof Strip>(array: A, key: K) => {
  const uniqueArray = new Set<A[number][K]>()
  array.forEach((item) => {
    uniqueArray.add(item[key])
  })
  return Array.from(uniqueArray)
}

const getSelectValues = (key: 'type' | 'voltage' | 'lEDsPerMeter') => {
  let strips = [...Strips]

  const type = stripType.value
  const voltage = stripVoltage.value
  const lEDsPerMeter = stripLEDsPerMeter.value

  if (key !== 'type') {
    if (type) {
      strips = strips.filter((strip) => strip.type === type)
    }
  }
  if (key !== 'voltage') {
    if (voltage) {
      const parsedVoltage = Number.parseInt(voltage)
      if (!Number.isNaN(parsedVoltage) && parsedVoltage > 0) {
        strips = strips.filter((strip) => strip.voltage === parsedVoltage)
      }
    }
  }
  if (key !== 'lEDsPerMeter') {
    if (lEDsPerMeter) {
      const parsedLEDsPerMeter = Number.parseInt(lEDsPerMeter)
      if (!Number.isNaN(parsedLEDsPerMeter) && parsedLEDsPerMeter > 0) {
        strips = strips.filter((strip) => strip.lEDsPerMeter === parsedLEDsPerMeter)
      }
    }
  }

  return getUniqueArray(strips, key)
}
</script>

<template>
  <CardLayout>
    <CardTitle>LED {{ props.index + 1 }}</CardTitle>
    <div>
      <label for="stripType">Type: </label>
      <select id="stripType" v-model="stripType">
        <option selected value>Select an option</option>
        <option v-for="stripType in getSelectValues('type')" :key="stripType" :value="stripType">
          {{ stripType }}
        </option>
      </select>
    </div>
    <div>
      <label for="stripVoltage">Voltage: </label>
      <select id="stripVoltage" v-model="stripVoltage">
        <option selected value>Select an option</option>
        <option v-for="voltage in getSelectValues('voltage')" :key="voltage">{{ voltage }}V</option>
      </select>
    </div>
    <div>
      <label for="stripLEDsPerMeter">LEDs/m: </label>
      <select id="stripLEDsPerMeter" v-model="stripLEDsPerMeter">
        <option selected value>Select an option</option>
        <option v-for="lEDsPerMeter in getSelectValues('lEDsPerMeter')" :key="lEDsPerMeter">
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
    <LedInformation :index="index" />
  </CardLayout>
</template>
