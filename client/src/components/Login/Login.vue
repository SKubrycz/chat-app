<script setup lang="ts">
import Canvas from '../Canvas/Canvas.vue'
import { Button, InputText, Password } from 'primevue'
import { Form } from '@primevue/forms'

const emit = defineEmits(['showToast'])

const handleToast = (severity: string, status: number, message: string) => {
  if (status < 400) {
    emit('showToast', {
      severity: severity,
      summary: 'Information',
      detail: message,
      life: 3000,
    })
  } else if (status >= 300 && status < 400) {
    emit('showToast', {
      severity: severity,
      summary: 'Warning',
      detail: message,
      life: 3000,
    })
  } else if (status >= 400) {
    emit('showToast', {
      severity: severity,
      summary: 'Error',
      detail: message,
      life: 3000,
    })
  }
}

const onFormSubmit = () => {
  handleToast('info', 200, 'Hello') // test
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
        <Button type="submit" label="Login"></Button>
      </div>
    </Form>
    <div>go to <RouterLink to="/register">Register</RouterLink></div>
  </div>
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
