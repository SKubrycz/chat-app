<script setup lang="ts">
import Canvas from '../Canvas/Canvas.vue'
import { Button, InputText, Password } from 'primevue'
import { Form } from '@primevue/forms'

const emit = defineEmits(['showToast'])

const handleToast = () => {
  emit('showToast', {
    severity: 'info',
    summary: 'Information',
    detail: 'MEssage somfweaor',
    life: 3000,
  })
}
</script>

<template>
  <Canvas></Canvas>
  <div class="center-col come-up">
    <h1><RouterLink to="/">Chat app</RouterLink></h1>
    <Form>
      <div class="center-col">
        <InputText name="username" type="text" placeholder="Username" fluid required></InputText>
        <Password placeholder="Password" :feedback="false" toggle-mask fluid required></Password>
        <Button type="submit" label="Login" @click="handleToast()"></Button>
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
