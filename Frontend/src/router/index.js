import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue';
import SlideBar from '@/components/SlideBar.vue';
import AdminData from '@/components/AdminData.vue';

const routes = [
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path:'/SlideBar',
    name: 'SlideBar',
    component:SlideBar
  },
  {
    path:'/AdminData',
    name:'AdminData',
    component:AdminData
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
