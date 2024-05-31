import { createRouter, createWebHistory } from 'vue-router'
import SignUp  from '../view/SignUp.vue';

const routes= [
    {
      path:'/SignUp',
      name:'SignUp',
      component:SignUp
    },
    
]
const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
export default router
