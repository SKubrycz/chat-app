<script setup lang="ts">
import Canvas from '../Canvas/Canvas.vue'
import { Form } from '@primevue/forms'
import { Button, InputText, Password, type ToastMessageOptions } from 'primevue'
import { ref } from 'vue'
import AlertToast from '../Info/AlertToast.vue'
import { handleToast } from '@/plugins/AlertToast/handleToast'

interface RegisterForm {
  login: string
  email: string
  password: string
  passwordAgain: string
}

const toastPayload = ref<ToastMessageOptions | null>(null)
const loading = ref<boolean>(false)
const registerForm = ref<RegisterForm>({
  login: '',
  email: '',
  password: '',
  passwordAgain: '',
})

const setToast = (payload: ToastMessageOptions) => {
  toastPayload.value = payload
}

const postRegister = async () => {
  loading.value = true
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(registerForm.value),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res) {
      throw new Error('Could not fetch data')
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
</script>

<template>
  <Canvas></Canvas>
  <div class="center-col come-up">
    <h1><RouterLink to="/">Chat app</RouterLink></h1>
    <Form v-slot="$form" :initial-values="registerForm" @submit="postRegister">
      <div class="center-col">
        <InputText
          v-model="registerForm.login"
          name="login"
          type="text"
          placeholder="Username"
          fluid
          required
        ></InputText>
        <InputText
          v-model="registerForm.email"
          name="email"
          type="email"
          placeholder="Email"
          fluid
          required
        ></InputText>
        <Password
          v-model="registerForm.password"
          name="password"
          placeholder="Password"
          :feedback="false"
          toggle-mask
          fluid
          required
        ></Password>
        <Password
          v-model="registerForm.passwordAgain"
          name="passwordAgain"
          placeholder="Password again"
          :feedback="false"
          toggle-mask
          fluid
          required
        ></Password>
        <Button type="submit" label="Register" :loading="loading"></Button>
      </div>
    </Form>
    <div>go to <RouterLink to="/login">Login</RouterLink></div>
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
