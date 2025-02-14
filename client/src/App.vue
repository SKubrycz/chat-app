<script setup lang="ts">
import { ref } from 'vue'
import type { ToastMessageOptions } from 'primevue'
import AlertToast from './components/Info/AlertToast.vue'
</script>

<template>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
