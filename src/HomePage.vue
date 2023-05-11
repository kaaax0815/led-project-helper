<script setup lang="ts">
import HomeLink from '@/components/HomeLink.vue'
import HomeResources from '@/components/HomeResources.vue'
</script>

<template>
  <div>
    <div class="my-8 flex flex-col items-center">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
        LED Project Helper
      </h1>
      <p class="text-xl">Choose your controller</p>
    </div>
    <div class="mx-4 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      <HomeLink
        internal="/dig2go"
        title="QuinLED-Dig2go"
        description="Single channel Plug&Play digital LED controller"
        external="https://quinled.info/quinled-dig2go/"
      />
      <HomeLink
        internal="/dig-uno"
        title="QuinLED-Dig-Uno"
        description="Dual channel digital LED controller"
        external="https://quinled.info/quinled-dig-uno/"
      />
      <HomeLink
        internal="/dig-quad"
        title="QuinLED-Dig-Quad"
        description="4 channel digital LED controller with easy power injection and protection"
        external="https://quinled.info/quinled-dig-quad/"
      />
    </div>
  </div>
  <HomeResources />
</template>
