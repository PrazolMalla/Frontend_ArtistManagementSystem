import { createRouter, createWebHistory } from 'vue-router'
import UserProfile from '../views/UserProfile.vue'
import LoginPage from '../views/LoginPage.vue';
import HomePage from '../views/HomePage.vue';
import SignUp from '@/views/SignUp.vue';
import Artist from '@/views/Artist.vue';
import Album from '@/views/Album.vue';
import Music from '@/views/Music.vue';
import Band from '@/views/Band.vue'

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
      path:'/SignUp',
      name:'SignUp',
      component:SignUp
    },

    {
      path:'/artist',
      name:'Artist',
      component:Artist
    },

    {
      path:'/album',
      name:'Album',
      component:Album
    },

    {
      path:'/music',
      name:'Music',
      component:Music
    },

    {
      path:'/band',
      name:'Band',
      component:Band
    },

];


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
