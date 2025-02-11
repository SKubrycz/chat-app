<script setup lang="ts">
import { Toast, type ToastMessageOptions } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'

const props = defineProps<{ toastPayload: ToastMessageOptions | null }>()
const emit = defineEmits(['showToast'])
const toast = useToast()

watch(
  () => props.toastPayload,
  (newPayload) => {
    if (newPayload) {
      toast.add(newPayload)
    }
  },
)
</script>

<template>
  <Toast></Toast>
</template>

<style scoped></style>
