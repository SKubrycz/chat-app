<script setup lang="ts">
import { Button } from 'primevue'
</script>

<template>
  <div class="content center-col">
    <h1>Chat app</h1>
    <div>
      <Button severity="primary" label="Click!"></Button>
      <RouterLink to="/login">Login</RouterLink>
      or
      <RouterLink to="/register">Register</RouterLink>
    </div>
  </div>
</template>
