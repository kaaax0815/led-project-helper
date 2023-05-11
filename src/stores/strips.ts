import type { Strip } from '@/assets/Strips'
import { defineStore } from 'pinia'

export const useStripsStore = defineStore('strips', {
  state: () => {
    return {
      strips: Array.from([null, null, null, null]) as (StripsValue | null)[]
    }
  },
  actions: {
    addStrip(index: number, strip: Strip, length: number) {
      this.strips[index] = {
        strip,
        length
      }
    },
    removeStrip(index: number) {
      this.strips[index] = null
    }
  }
})

export type StripsValue = {
  strip: Strip
  length: number
}
