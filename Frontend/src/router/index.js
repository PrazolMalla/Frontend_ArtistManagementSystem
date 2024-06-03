import { createRouter, createWebHistory } from 'vue-router'
import UserProfile from '../views/UserProfile.vue'
import LoginPage from '../views/LoginPage.vue';
import HomePage from '../views/HomePage.vue';
import SignUp from '@/views/SignUp.vue';
import Artist from '@/views/Artist.vue';
import Album from '@/views/Album.vue';
import Music from '@/views/Music.vue';
import Band from '@/views/Band.vue';
import AddMusic from '@/views/AddMusic.vue';
import AddAlbum from '@/views/AddAlbum.vue';
import AddGenre from '@/views/AddGenre.vue';
import AlbumDetail from '@/views/Detail/AlbumDetail.vue'
import ArtistDetail from '@/views/Detail/ArtistDetail.vue'
import MusicDetail from '@/views/Detail/MusicDetail.vue'
import AdminPage from '@/views/AdminPage.vue';
import Dashboard from '@/views/Dashboard.vue';
import NewSong from '@/components/NewSong.vue';
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
    {
      path:'/music/add/',
      name:'AddMusic',
      component:AddMusic
    },
    {
      path:'/album/add/',
      name:'AddAlbum',
      component:AddAlbum
    },
 {
      path:'/genre/add/',
      name:'AddGenre',
      component:AddGenre
    },
    ,{
      path: '/album/:id',
      name: 'albumDetail',
      component: AlbumDetail,
      meta: {auth:true}
    },{
      path: '/music/:id',
      name: 'musicDetail',
      component:  MusicDetail,
      meta: {auth:true}
    },{
      path: '/artist/:id',
      name: 'artistDetail',
      component: ArtistDetail,
      meta: {auth:true}
    },

    {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  
    {
      path: '/adminpage',
      name: 'AdminPage',
      component: AdminPage
    },
];


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
