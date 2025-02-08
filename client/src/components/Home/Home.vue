<script setup lang="ts">
import { ref } from 'vue'
import { Button } from 'primevue'

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
    <h3>Join us:</h3>
    <Button variant="outlined" id="register-button"
      ><RouterLink to="/register" id="register-link">Register</RouterLink></Button
    >
    <div>
      or
      <RouterLink to="/login">Login</RouterLink>
    </div>
  </div>
</template>

<style scoped>
#register-link {
  color: var(--fontColor);
}

.p-button {
  background: color-mix(in srgb, var(--p-blue-900) 40%, transparent 100%);
}
.p-button-outlined:not(:disabled):hover {
  background: color-mix(in srgb, var(--p-blue-950) 40%, transparent 100%);
}
</style>
