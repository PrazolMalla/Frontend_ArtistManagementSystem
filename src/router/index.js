import { createRouter, createWebHistory } from 'vue-router'
import UserProfile from '@/views/UserProfilePage.vue'
import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';
import SignUp from '@/views/SignUpPage.vue';
import Artist from '@/views/explore/Artist.vue';
import Album from '@/views/explore/Album.vue';
import Music from '@/views/explore/Music.vue';
import Band from '@/views/explore/Band.vue';
import Genre from '@/views/explore/Genre.vue';
import AddMusic from '@/views/manage/artist/AddMusic.vue';
import AddAlbum from '@/views/manage/artist/AddAlbum.vue';
import AddGenre from '@/views/manage/staff/AddGenre.vue';
import AlbumDetail from '@/views/detail/AlbumDetail.vue'
import ArtistDetail from '@/views/detail/ArtistDetail.vue'
import MusicDetail from '@/views/detail/MusicDetail.vue'
import AdminPage from '@/views/stats/AdminStats.vue';
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
      path:'/genre',
      name:'Genre',
      component:Genre
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
