<script setup lang="ts">
import Canvas from '../Canvas/Canvas.vue'
import { Button, InputText, Password } from 'primevue'
import { Form } from '@primevue/forms'
</script>

<template>
  <Canvas></Canvas>
  <div class="center-col come-up">
    <h1><RouterLink to="/">Chat app</RouterLink></h1>
    <Form>
      <div class="center-col">
        <InputText name="username" type="text" placeholder="Username" fluid></InputText>
        <Password placeholder="Password" :feedback="false" toggle-mask fluid></Password>
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
input,
.p-password,
button {
  margin: 0.7em 0;
}
</style>
