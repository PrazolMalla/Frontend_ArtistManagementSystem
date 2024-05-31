import { createRouter, createWebHistory } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import NewArtist from '../components/NewArtist.vue'
import Dashboard from '../view/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sidebar',
      name: 'SideBar',
      component: Sidebar,
    },

  ]
})

export default router
