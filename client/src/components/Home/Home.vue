<script setup lang="ts">
import { ref } from 'vue'

import Canvas from '../Canvas/Canvas.vue'

const currentSubtitle = ref<string>('')
const timeout = ref<number | null>(null)
const subtitle = 'Connect, discuss, explore'

const writeText = (source: string, currentIndex: number) => {
  if (timeout.value) clearTimeout(timeout.value)
  if (currentSubtitle.value.length < source.length) {
    currentSubtitle.value += source[currentIndex]

    const nextIndex = currentIndex + 1
    timeout.value = setTimeout(() => {
      writeText(source, nextIndex)
    }, 45)
  }
}

writeText(subtitle, 0)
</script>

<template>
  <Canvas></Canvas>
  <div class="center-col come-up">
    <h1>Chat app</h1>
    <h2>{{ `${currentSubtitle}${currentSubtitle.length < subtitle.length ? '|' : ''}` }}</h2>
    <div>
      <RouterLink to="/login">Login</RouterLink>
      or
      <RouterLink to="/register">Register</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
