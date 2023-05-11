import './styles.css'

import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import HomePage from '@/HomePage.vue'
import NotFound from './NotFound.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const ControllerPage = () => import('@/ControllerPage.vue')

const routes = [
  { path: '/', component: HomePage },
  {
    path: '/dig2go',
    component: ControllerPage,
    props: {
      controller: '2go'
    }
  },
  {
    path: '/dig-uno',
    component: ControllerPage,
    props: {
      controller: 'uno'
    }
  },
  {
    path: '/dig-quad',
    component: ControllerPage,
    props: {
      controller: 'quad'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
] satisfies RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.mount('#app')
