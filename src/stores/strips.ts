import type { Strip } from '@/assets/Strips'
import { defineStore } from 'pinia'

export const useStripsStore = defineStore('strips', {
  state: () => {
    return {
      /** WARNING: Array can be empty or have `empty` values */
      slots: new Array() as StripsValue[]
    }
  },
  actions: {
    addStrip(index: number, strip: Strip, length: number) {
      this.slots[index] = {
        strip,
        length
      }
    },
    removeStrip(index: number) {
      delete this.slots[index]
    }
  }
})

export type StripsValue = {
  strip: Strip
  length: number
}
