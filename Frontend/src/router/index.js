import { createRouter, createWebHistory } from 'vue-router'

import AdminData from '@/components/AdminData.vue';
import AdminStats from '@/components/AdminStats.vue';
import AdminPage from '@/views/AdminPage.vue';

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

export default router;
