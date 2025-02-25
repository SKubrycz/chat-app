<script setup lang="ts">
import { useRoute } from 'vue-router'
import Canvas from './components/Canvas/Canvas.vue'
import { computed } from 'vue'

const canvasPaths = ['/', '/login', '/register']
const route = useRoute()
const displayCanvas = computed(() => {
  if (canvasPaths.includes(route.path)) return true
  else return false
})
</script>

<template>
  <div class="container">
    <Canvas v-if="displayCanvas"></Canvas>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
