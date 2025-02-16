<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button, type ToastMessageOptions } from 'primevue'

import Canvas from '../Canvas/Canvas.vue'
import AlertToast from '../Info/AlertToast.vue'
import { handleToast } from '@/plugins/AlertToast/handleToast'

const toastPayload = ref<ToastMessageOptions | null>(null)

const currentSubtitle = ref<string>('')
const timeout = ref<number | null>(null)
const subtitle = 'Connect, discuss, explore'

const handleShowToast = (payload: ToastMessageOptions) => {
  toastPayload.value = payload
}

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

const getHello = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, { method: 'GET' })
    if (!res) {
      handleToast(handleShowToast, 500, 'Could not fetch data')
      throw new Error('Could not fetch data')
    }
    if (res) {
      const json = await res.json()
      handleToast(handleShowToast, res.status, json.message)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      handleToast(handleShowToast, 500, error.message)
    }
  }
}

onMounted(() => {
  writeText(subtitle, 0)
  getHello()
})
</script>

<template>
  <Canvas></Canvas>
  <div class="center-col come-up">
    <h1>Chat app</h1>
    <h2>{{ `${currentSubtitle}${currentSubtitle.length < subtitle.length ? '|' : ''}` }}</h2>
    <h3>Join us:</h3>
    <Button
      as="router-link"
      label="Register"
      variant="outlined"
      id="register-link"
      to="/register"
      :raised="true"
    ></Button>
    <div :style="{ margin: 0, padding: 0 }">
      or
      <RouterLink to="/login">Login</RouterLink>
    </div>
  </div>
  <AlertToast :toast-payload="toastPayload"></AlertToast>
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
