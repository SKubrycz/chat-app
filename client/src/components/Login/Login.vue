<script setup lang="ts"></script>

<template>
  <div class="content center-col">
    <h1><RouterLink to="/">Chat app</RouterLink></h1>
    <h3>login form</h3>
    <div>go to <RouterLink to="/register">Register</RouterLink></div>
  </div>
</template>

<style scoped>
h1 > a {
  color: var(--fontColor);
}
</style>
