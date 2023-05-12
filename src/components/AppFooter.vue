<script setup lang="ts">
import FooterLink from './FooterLink.vue'
</script>

<template>
  <footer class="bg-quin">
    <div
      class="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between p-4 text-center lg:flex-row"
    >
      <span class="text-sm text-gray-400"
        >© 2023 <FooterLink link="https://kaaaxcreators.de">Bernd Storath</FooterLink>. All Rights
        Reserved.
      </span>
      <span class="text-sm text-gray-400">
        <FooterLink link="https://github.com/kaaax0815/led-project-helper">Source Code</FooterLink>
      </span>
      <span class="text-sm text-gray-400">
        Disclaimer: This site is not in any way affiliated with
        <FooterLink link="https://quinled.info/">QuinLED</FooterLink>
        or <FooterLink link="https://intermit.tech/">Intermittent Technology</FooterLink>.
      </span>
    </div>
  </footer>
</template>
