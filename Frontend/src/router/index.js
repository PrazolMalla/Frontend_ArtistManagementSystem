import { createRouter, createWebHistory } from 'vue-router'



import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import TopArtist from '../components/TopArtist.vue'
import LandingPage from '../views/LandingPage.vue'


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
  path:'/topartist',
  name:'TopArtist',
  component:TopArtist
},
{
  path:'/landingpage',
  name:'LandingPage',
  component:LandingPage
}
 



  
    




]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
