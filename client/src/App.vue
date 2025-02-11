<script setup lang="ts">
import { ref } from 'vue'
import type { ToastMessageOptions } from 'primevue'
import AlertToast from './components/Info/AlertToast.vue'

const toastPayload = ref<ToastMessageOptions | null>(null)

const handleShowToast = (payload: ToastMessageOptions) => {
  toastPayload.value = payload
}
</script>

<template>
  <div class="container">
    <RouterView @showToast="handleShowToast"></RouterView>
    <AlertToast :toast-payload="toastPayload"></AlertToast>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
