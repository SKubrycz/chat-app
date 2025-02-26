import App from '@/App.vue'
import MainChat from '@/components/Chat/MainChat.vue'
import Home from '@/components/Home/Home.vue'
import Login from '@/components/Login/Login.vue'
import Register from '@/components/Register/Register.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // { path: '/', component: Home },
  // { path: '/login', component: Login },
  // { path: '/register', component: Register },
  {
    path: '/',
    component: App,
    children: [
      { path: '', component: Home },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },

  {
    /* temporarily */
    path: '/chat',
    component: MainChat,
    children: [],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
