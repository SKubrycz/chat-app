<script setup lang="ts">
import Canvas from '../Canvas/Canvas.vue'
import { handleToast } from '@/plugins/AlertToast/handleToast'
import { Button, InputText, Password, type ToastMessageOptions } from 'primevue'
import { Form } from '@primevue/forms'
import { onMounted, ref } from 'vue'
import AlertToast from '../Info/AlertToast.vue'

interface LoginForm {
  login: string
  password: string
}

const toastPayload = ref<ToastMessageOptions | null>(null)
const loading = ref<boolean>(false)
const loginForm = ref<LoginForm>({
  login: '',
  password: '',
})

const setToast = (payload: ToastMessageOptions) => {
  toastPayload.value = payload
}

const getLogin = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, { method: 'GET' })
    if (!res) {
      handleToast(setToast, 500, 'Could not fetch data')
      throw new Error('Could not fetch data')
    }
    if (res) {
      const json = await res.json()
      handleToast(setToast, res.status, json.message)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      handleToast(setToast, 500, error.message)
    }
  }
}

const postLogin = async () => {
  loading.value = true
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(loginForm.value),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res) {
      throw new Error(`Could not fetch data`)
    }
    if (res) {
      const json = await res.json()
      handleToast(setToast, res.status, json.message)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      handleToast(setToast, 500, error.message)
    }
  }

  loading.value = false
}

onMounted(() => {
  getLogin()
})
</script>

<template>
  <div class="center-col come-up">
    <h1><RouterLink to="/">Chat app</RouterLink></h1>
    <Form v-slot="$form" :initial-values="loginForm" @submit="postLogin">
      <div class="center-col">
        <InputText
          v-model="loginForm.login"
          name="login"
          type="text"
          placeholder="Username"
          fluid
          required
        ></InputText>
        <Password
          v-model="loginForm.password"
          name="password"
          placeholder="Password"
          :feedback="false"
          toggle-mask
          fluid
          required
        ></Password>
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
