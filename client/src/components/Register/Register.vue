<script setup lang="ts">
import Canvas from '../Canvas/Canvas.vue'
import { Form } from '@primevue/forms'
import { Button, InputText, Password } from 'primevue'
</script>

<template>
  <div class="content center-col">
    <Canvas></Canvas>
    <h1><RouterLink to="/">Chat app</RouterLink></h1>
    <Form>
      <div class="center-col">
        <InputText name="username" type="text" placeholder="Username" fluid></InputText>
        <InputText name="email" type="text" placeholder="Email" fluid></InputText>
        <Password placeholder="Password" :feedback="false" toggle-mask fluid></Password>
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

input,
.p-password,
button {
  margin: 0.7em 0;
}
</style>
