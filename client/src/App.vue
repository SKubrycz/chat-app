<script setup lang="ts"></script>

<template>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.content {
  animation: 700ms comeUp 1;
}

@keyframes comeUp {
  0% {
    opacity: 0;
    transform: translate(0%, 50%);
  }
  100% {
    opacity: 1;
    transform: translate(0%, 0%);
  }
}
</style>
