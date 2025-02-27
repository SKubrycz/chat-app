<script setup lang="ts">
import { handleToast } from '@/plugins/AlertToast/handleToast'
import type { ToastMessageOptions } from 'primevue'
import { ProgressSpinner } from 'primevue'
import { onBeforeMount, ref } from 'vue'
import AlertToast from '../Info/AlertToast.vue'
import { useRouter } from 'vue-router'

const templateDisplay = ref<boolean>(false)
const loading = ref<boolean>(false)
const toastPayload = ref<ToastMessageOptions | null>(null)

const router = useRouter()

const setToast = (payload: ToastMessageOptions) => {
  toastPayload.value = payload
}

const getMainChat = async () => {
  loading.value = true
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res) {
      handleToast(setToast, 500, 'Could not fetch data')
      throw new Error('Could not fetch data')
    }

    if (res) {
      const json = await res.json()
      handleToast(setToast, res.status, json.message)
      if (res.status === 403) router.push('/')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      router.push('/')
    }
  } finally {
    templateDisplay.value = true
    loading.value = false
  }
}

onBeforeMount(async () => {
  await getMainChat()
})
</script>

<template>
  <ProgressSpinner v-if="loading" />
  <div v-if="!loading" :style="{ textAlign: `center` }">
    <h1>Hello from chat</h1>
    <h2>ok</h2>
    <AlertToast :toast-payload="toastPayload"></AlertToast>
  </div>
</template>
