import { createRouter, createWebHistory } from 'vue-router'
import UserProfile from '../views/UserProfile.vue'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import SignUp from '@/views/SignUp.vue'
import MusicDetail from '../views/MusicDetailPage.vue'

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
    path: '/user-profile',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/music/:id',
    name: 'musicDetail',
    component: MusicDetail,
    meta: { auth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
