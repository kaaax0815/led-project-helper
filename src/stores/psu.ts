import { defineStore } from 'pinia'

export const usePSUStore = defineStore('psu', {
  state: () => {
    return {
      voltage: null as number | null,
      voltageMismatch: false,
      totalAmps: null as number | null
    }
  },
  actions: {
    setVoltageMismatch(value: boolean) {
      this.voltageMismatch = value
    },
    setVoltage(value: number) {
      this.voltage = value
    },
    setTotalAmps(value: number) {
      this.totalAmps = value
    },
    resetPSU() {
      this.voltage = null
      this.voltageMismatch = false
      this.totalAmps = null
    }
  }
})
