import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './plugins/router'
import { definePreset } from '@primevue/themes'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const primary = 'blue'
const colors = {
  50: `{${primary}.50}`,
  100: `{${primary}.100}`,
  200: `{${primary}.200}`,
  300: `{${primary}.300}`,
  400: `{${primary}.400}`,
  500: `{${primary}.500}`,
  600: `{${primary}.600}`,
  700: `{${primary}.700}`,
  800: `{${primary}.800}`,
  900: `{${primary}.900}`,
  950: `{${primary}.950}`,
}

const customPreset = definePreset(Aura, {
  semantic: {
    primary: colors,
    colorScheme: {
      light: {
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
      dark: {
        formField: {
          background: '{blue.950}',
          hoverBorderColor: '{primary.color}',
        },
      },
    },
  },
})

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: customPreset,
  },
})
app.mount('#app')
