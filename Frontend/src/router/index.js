import { createRouter, createWebHistory } from 'vue-router'


import AdminPage from '@/views/AdminPage.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  
 
  // {
  //   path:'/AdminData',
  //   name:'AdminData',
  //   component:AdminData
  // },
  {
    path:'/',
    name:'AdminPage',
    component:AdminPage
  },
  {
    path:'/dashboard',
    name:'Dashboard',
    component:Dashboard
  }
  // {
  //   path:'/AdminStats',
  //   name:'/AdminStats',
  //   component:AdminStats
  // }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router