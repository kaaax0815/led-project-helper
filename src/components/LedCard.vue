<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { type Strip, StripTypes, Strips, calculateInjections } from '@/assets/Strips.js'
import CardLayout from './CardLayout.vue'
import CardTitle from './CardTitle.vue'
import LedButton from './LedButton.vue'
import { useStripsStore } from '@/stores/strips'

const props = defineProps({
  index: { type: Number, required: true }
})

const strips = useStripsStore()

const stripType = ref<HTMLSelectElement | null>(null)
const stripVoltage = ref<HTMLSelectElement | null>(null)
const stripLEDsPerMeter = ref<HTMLSelectElement | null>(null)
const stripLength = ref<HTMLSelectElement | null>(null)
const stripSubmit = ref(null) as Ref<Ref<HTMLInputElement | null> | null>

const availableStrips = ref<Strip[]>([])
const stripInjections = ref<string[] | null>(null)

const handleTypeChange = () => {
  const type = stripType.value
  const voltage = stripVoltage.value
  if (!type || !voltage) {
    return
  }
  type.disabled = true
  voltage.disabled = false
  availableStrips.value = Strips.filter((item) => item.type === type.value)
}

const handleVoltageChange = () => {
  const voltage = stripVoltage.value
  const lEDsPerMeter = stripLEDsPerMeter.value
  if (!voltage || !lEDsPerMeter) {
    return
  }
  voltage.disabled = true
  lEDsPerMeter.disabled = false
  availableStrips.value = availableStrips.value.filter(
    (item) => item.voltage === Number.parseInt(voltage.value)
  )
}

const handlePerMeterChange = () => {
  const lEDsPerMeter = stripLEDsPerMeter.value
  const length = stripLength.value
  const submit = stripSubmit.value?.value
  if (!lEDsPerMeter || !length || !submit) {
    return
  }
  lEDsPerMeter.disabled = true
  length.disabled = false
  submit.disabled = false
  availableStrips.value = availableStrips.value.filter(
    (item) => item.lEDsPerMeter === Number.parseInt(lEDsPerMeter.value)
  )
}

const handleCalculate = () => {
  if (availableStrips.value.length === 0 || availableStrips.value.length > 1) {
    return
  }
  const length = stripLength.value?.value
  if (!length) {
    return
  }
  const parsedLength = Number.parseFloat(length)
  if (Number.isNaN(parsedLength) || parsedLength <= 0) {
    return
  }
  strips.addStrip(props.index, availableStrips.value[0], parsedLength)

  stripInjections.value = calculateInjections(availableStrips.value[0], parsedLength)
}

const handleReset = () => {
  const type = stripType.value
  const voltage = stripVoltage.value
  const lEDsPerMeter = stripLEDsPerMeter.value
  const length = stripLength.value
  const submit = stripSubmit.value?.value
  if (!type || !voltage || !lEDsPerMeter || !length || !submit) {
    return
  }
  type.selectedIndex = 0
  type.disabled = false
  voltage.selectedIndex = 0
  voltage.disabled = true
  lEDsPerMeter.selectedIndex = 0
  lEDsPerMeter.disabled = true
  length.value = '5'
  length.disabled = true
  submit.disabled = true
  availableStrips.value = []
  stripInjections.value = null
  strips.removeStrip(props.index)
}
</script>

<template>
  <CardLayout>
    <CardTitle>LED {{ props.index + 1 }}</CardTitle>
    <div>
      <label for="stripType">Type: </label>
      <select id="stripType" @change="handleTypeChange" ref="stripType">
        <option selected value>Select an option</option>
        <option v-for="stripType in StripTypes" :key="stripType" :value="stripType">
          {{ stripType }}
        </option>
      </select>
    </div>
    <div>
      <label for="stripVoltage">Voltage: </label>
      <select id="stripVoltage" disabled @change="handleVoltageChange" ref="stripVoltage">
        <option selected value>Select an option</option>
        <option v-for="{ voltage } in availableStrips" :key="voltage">{{ voltage }}V</option>
      </select>
    </div>
    <div>
      <label for="stripLEDsPerMeter">LEDs/m: </label>
      <select
        id="stripLEDsPerMeter"
        disabled
        @change="handlePerMeterChange"
        ref="stripLEDsPerMeter"
      >
        <option selected value>Select an option</option>
        <option v-for="{ lEDsPerMeter } in availableStrips" :key="lEDsPerMeter">
          {{ lEDsPerMeter }}LEDs/m
        </option>
      </select>
    </div>
    <div>
      <label for="stripLength">Length: </label>
      <input
        id="stripLength"
        disabled
        type="number"
        ref="stripLength"
        min="1"
        max="100"
        step="0.5"
        value="5"
      />
    </div>
    <div class="flex justify-around">
      <LedButton value="Calculate" disabled ref="stripSubmit" @click="handleCalculate" />
      <LedButton value="Reset" @click="handleReset" />
    </div>
    <div v-if="stripInjections !== null">
      <label>Injections: </label>
      <ul>
        <li v-for="injection in stripInjections" :key="injection">
          {{ injection }}
        </li>
      </ul>
    </div>
  </CardLayout>
</template>
