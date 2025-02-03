<script setup lang="ts">
import { Button, InputText } from 'primevue'
import { Form } from '@primevue/forms'
</script>

<template>
  <div class="content center-col">
    <h1><RouterLink to="/">Chat app</RouterLink></h1>
    <Form>
      <div>
        <InputText name="username" type="text" placeholder="Username" fluid></InputText>
        <Button type="submit" severity="secondary" label="Submit"></Button>
      </div>
    </Form>
    <div>go to <RouterLink to="/register">Register</RouterLink></div>
  </div>
</template>

<style scoped>
h1 > a {
  color: var(--fontColor);
}
</style>
