<script setup lang="ts">
import Canvas from '../Canvas/Canvas.vue'
import { handleToast } from '@/plugins/AlertToast/handleToast'
import { Button, InputText, Password, type ToastMessageOptions } from 'primevue'
import { Form } from '@primevue/forms'
import { ref } from 'vue'
import AlertToast from '../Info/AlertToast.vue'

const toastPayload = ref<ToastMessageOptions | null>(null)
const loading = ref<boolean>(false)

const handleShowToast = (payload: ToastMessageOptions) => {
  toastPayload.value = payload
}

const onFormSubmit = async () => {
  loading.value = true
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
    })
    if (!res || !res.ok) {
      handleToast(handleShowToast, res.status, 'The data could not be fetched')
      throw new Error(`Status: ${res.status}`)
    }
    if (!res.ok) {
      const json = await res.json()
      handleToast(handleShowToast, res.status, json)
    }

    if (res.ok) handleToast(handleShowToast, res.status)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      handleToast(handleShowToast, 500, error.message)
    }
  }

  loading.value = false
}
</script>

<template>
  <Canvas></Canvas>
  <div class="center-col come-up">
    <h1><RouterLink to="/">Chat app</RouterLink></h1>
    <Form v-slot="$form" @submit="onFormSubmit">
      <div class="center-col">
        <InputText name="username" type="text" placeholder="Username" fluid required></InputText>
        <Password placeholder="Password" :feedback="false" toggle-mask fluid required></Password>
        <Button type="submit" label="Login" :loading="loading"></Button>
      </div>
    </Form>
    <div>go to <RouterLink to="/register">Register</RouterLink></div>
  </div>
  <AlertToast :toast-payload="toastPayload"></AlertToast>
</template>

<style scoped>
h1 > a {
  color: var(--fontColor);
}
h1 > a:hover {
  color: color-mix(in srgb, var(--fontColor) 50%, white);
}

input,
.p-password,
button {
  margin: 0.7em 0;
}
</style>
