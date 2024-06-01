import { createRouter, createWebHistory } from 'vue-router'


import AdminPage from '@/views/AdminPage.vue';
import Dashboard from '@/views/Dashboard.vue';
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  
    {
      path: '/adminpage',
      name: 'AdminPage',
      component: AdminPage
    },
  




]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
