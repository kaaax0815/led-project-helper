<script setup lang="ts">
import { type Ref, ref } from 'vue'

defineProps({
  value: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const button = ref<HTMLInputElement | null>(null) as Ref<HTMLInputElement | null>

defineExpose({
  value: button
})
</script>

<template>
  <input
    class="bg-quin-light hover:bg-quin-dark disabled:bg-quin disabled:hover:bg-quin cursor-pointer rounded-lg border border-gray-600 p-2 disabled:cursor-not-allowed disabled:border-gray-900 disabled:text-gray-300"
    type="button"
    :value="value"
    :disabled="disabled"
    ref="button"
  />
</template>
