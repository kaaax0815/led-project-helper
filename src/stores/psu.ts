import { defineStore } from 'pinia'

export const usePSUStore = defineStore('psu', {
  state: () => {
    return {
      voltage: null as number | null,
      amperage: null as number | null
    }
  },
  actions: {
    setVoltage(value: number) {
      this.voltage = value
    },
    setAmperage(value: number) {
      this.amperage = value
    },
    resetPSU() {
      this.voltage = null
      this.amperage = null
    }
  }
})
