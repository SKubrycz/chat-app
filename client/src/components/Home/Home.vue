<script setup lang="ts">
import Canvas from '../Canvas/Canvas.vue'
import { Button } from 'primevue'
</script>

<template>
  <Canvas></Canvas>
  <div class="center-col come-up">
    <h1>Chat app</h1>
    <div>
      <RouterLink to="/login">Login</RouterLink>
      or
      <RouterLink to="/register">Register</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
