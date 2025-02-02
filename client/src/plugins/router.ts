import Home from '@/components/Home/Home.vue'
import Login from '@/components/Login/Login.vue'
import Register from '@/components/Register/Register.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
