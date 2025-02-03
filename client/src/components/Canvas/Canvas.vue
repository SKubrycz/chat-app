<script setup lang="ts">
import { ref } from 'vue'

const width = ref(window.innerWidth)
const height = ref(window.innerHeight)
</script>

<template>
  <canvas :width="width" :height="height"></canvas>
</template>

<style scoped>
canvas {
  position: absolute;
  z-index: -1;
  background: transparent;
}
</style>
