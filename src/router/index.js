import { createRouter, createWebHistory } from 'vue-router'
import UserProfile from '@/views/UserProfilePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import HomePage from '@/views/HomePage.vue'
import SignUp from '@/views/SignUpPage.vue'
import Artist from '@/views/explore/Artist.vue'
import Album from '@/views/explore/Album.vue'
import Music from '@/views/explore/Music.vue'
import Band from '@/views/explore/Band.vue'
import Genre from '@/views/explore/Genre.vue'
import ArtistManage from '@/views/manage/ArtistManage.vue'
import StaffManage from '@/views/manage/StaffManage.vue'
import MusicManage from '@/views/manage/MusicManage.vue'
import AlbumDetail from '@/views/detail/AlbumDetailPage.vue'
import ArtistDetail from '@/views/detail/ArtistDetail.vue'
import MusicDetail from '@/views/detail/MusicDetailPage.vue'
import Like from '@/views/library/Like.vue'
import History from '@/views/library/Histore.vue'
import Follow from '@/views/library/Follow.vue'
import StaffStats from '@/views/stats/StaffStats.vue'
import ArtistStats from '@/views/stats/ArtistStats.vue'
import UserStats from '@/views/stats/UserStats.vue'
import Settings from '@/views/Settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'loginPage',
      component: LoginPage,
      meta: { auth: false }
    },
    {
      path: '/',
      name: 'homePage',
      component: HomePage,
      meta: { auth: false }
    },
    {
      path: '/user/profile',
      name: 'userProfile',
      component: UserProfile,
      meta: { auth: true }
    },
    {
      path: '/user/settings',
      name: 'settings',
      component: Settings,
      meta: { auth: true }
    },
    {
      path: '/signup',
      name: 'signUp',
      component: SignUp,
      meta: { auth: false }
    },

    // Explore
    {
      path: '/artist',
      name: 'artist',
      component: Artist,
      meta: { auth: false }
    },
    {
      path: '/album',
      name: 'album',
      component: Album,
      meta: { auth: false }
    },
    {
      path: '/music',
      name: 'music',
      component: Music,
      meta: { auth: false }
    },
    {
      path: '/band',
      name: 'band',
      component: Band,
      meta: { auth: false }
    },
    {
      path: '/genre',
      name: 'genre',
      component: Genre,
      meta: { auth: false }
    },

    // Manage
    {
      path: '/manage/artist',
      name: 'manageArtist',
      component: ArtistManage,
      meta: { auth: true }
    },
    {
      path: '/manage/staff',
      name: 'manageStaff',
      component: StaffManage,
      meta: { auth: true }
    },
    {
      path: '/manage/music',
      name: 'manageMusic',
      component: MusicManage,
      meta: { auth: true }
    },

    // Library
    {
      path: '/library/likes',
      name: 'libraryLikes',
      component: Like,
      meta: { auth: true }
    },
    {
      path: '/library/history',
      name: 'libraryHistory',
      component: History,
      meta: { auth: true }
    },
    {
      path: '/library/follow',
      name: 'libraryFollow',
      component: Follow,
      meta: { auth: true }
    },

    //Stats
    {
      path: '/stats/staff',
      name: 'adminStats',
      component: StaffStats,
      meta: { auth: true }
    },
    {
      path: '/stats/artist',
      name: 'artistStats',
      component: ArtistStats,
      meta: { auth: true }
    },
    {
      path: '/stats/user',
      name: 'userStats',
      component: UserStats,
      meta: { auth: true }
    },

    {},
    // Detail
    {
      path: '/album/:id',
      name: 'albumDetail',
      component: AlbumDetail,
      meta: { auth: false }
    },
    {
      path: '/music/:id',
      name: 'musicDetail',
      component: MusicDetail,
      meta: { auth: false }
    },
    {
      path: '/artist/:id',
      name: 'artistDetail',
      component: ArtistDetail,
      meta: { auth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token')

  if (to.meta.auth && !isAuthenticated) {
    next('/login')
  } else if (!to.meta.auth && isAuthenticated && to.name === 'loginPage') {
    next('/')
  } else {
    next()
  }
})

export default router
