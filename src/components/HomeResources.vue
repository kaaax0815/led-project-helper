<script setup lang="ts">
import ResourceLink from './ResourceLink.vue'
</script>

<template>
  <div class="m-4 flex flex-col">
    <h2 class="mb-4 text-4xl font-extrabold">Resources (🚧 Under Construction)</h2>
    <ul class="ml-4 space-y-4">
      <li>
        <ResourceLink title="QuinLED Website" link="https://quinled.info/" />
      </li>
      <li>
        <ResourceLink title="QuinLED Discord Server" link="https://discord.gg/WdbAauG" />
      </li>
      <li>
        <ResourceLink
          title="Voltage Drop Calculator"
          link="https://www.rapidtables.com/calc/wire/voltage-drop-calculator.html"
        />
      </li>
      <li>
        <ResourceLink
          title="Worldwide QuinLED Controller Store"
          link="https://shop.allnetchina.cn/collections/quinled"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {
  list-style-type: '► ';
}
</style>
