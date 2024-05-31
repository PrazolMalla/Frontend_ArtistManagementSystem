import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../vue/SignUp.vue'
import Sidebar from '../components/Sidebar.vue'
import NewArtist from '../components/NewArtist.vue'
import Dashboard from '../view/Dashboard.vue'

import AdminData from '@/components/AdminData.vue';

const routes = [
  
 
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
