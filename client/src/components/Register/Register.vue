<script setup lang="ts">
import Canvas from '../Canvas/Canvas.vue'
import { Form } from '@primevue/forms'
import { Button, InputText, Password } from 'primevue'
</script>

<template>
  <Canvas></Canvas>
  <div class="center-col come-up">
    <h1><RouterLink to="/">Chat app</RouterLink></h1>
    <Form>
      <div class="center-col">
        <InputText name="username" type="text" placeholder="Username" fluid required></InputText>
        <InputText name="email" type="text" placeholder="Email" fluid required></InputText>
        <Password placeholder="Password" :feedback="false" toggle-mask fluid required></Password>
        <Button type="submit" label="Register"></Button>
      </div>
    </Form>
    <div>go to <RouterLink to="/login">Login</RouterLink></div>
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
