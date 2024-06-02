import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue';
import HomePage from '../views/HomePage.vue';
import SignUp from '@/views/SignUp.vue';

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
      path:'/SignUp',
      name:'SignUp',
      component:SignUp
    },

];



const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
