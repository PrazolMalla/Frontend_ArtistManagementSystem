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
import MusicDetail from '@/views/detail/MusicDetailPage.vue'
import Like from '@/views/library/Like.vue'
import History from '@/views/library/Histore.vue'
import Follow from '@/views/library/Follow.vue'
import StaffStats from '@/views/stats/AdminStats.vue'
import ArtistStats from '@/views/stats/ArtistStats.vue'
import UserStats from '@/views/stats/UserStats.vue'
import Settings from '@/views/Settings.vue'
import ArtistMusic from '@/views/detail/ArtistMusicPage.vue'
import ArtistHome from '@/views/detail/ArtistHomePage.vue'
import ArtistAlbum from '@/views/detail/ArtistAlbumPage.vue'

import axios from 'axios'
import MapShow from '@/components/MapShow.vue'
import store from '@/store/store'

const base_url = import.meta.env.VITE_BASE_API_URL

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

    {
      path: '/artist',
      name: 'Artist',
      component: Artist
    },
    {
      path: '/artist/music',
      name: 'artistMusic',
      component: ArtistMusic,
      meta: { auth: false }
    },
    {
      path: '/album',
      name: 'Album',
      component: Album
    },

    {
      path: '/music',
      name: 'Music',
      component: Music
    },

    {
      path: '/band',
      name: 'Band',
      component: Band
    },
    {
      path: '/genre',
      name: 'Genre',
      component: Genre
    },
    {
      path: '/manage/music',
      name: 'manageMusic',
      component: MusicManage,
      meta: { auth: true, is_staffAndArtist: true }
    },
    {
      path: '/manage/staff',
      name: 'manageStaff',
      component: StaffManage,
      meta: { auth: true, is_superuser: true }
    },
    {
      path: '/manage/album',
      name: 'manageAlbum',
      component: AlbumManage,
      meta: { auth: true, is_staffAndArtist: true }
    },

    {
      path: '/manage/user',
      name: 'manageUser',
      component: UserManage,
      meta: { auth: true, is_staff: true }
    },
    {
      path: '/manage/artist',
      name: 'manageArtist',
      component: ArtistManage,
      meta: { auth: true, is_staff: true }
    },
    {
      path: '/manage/theme',
      name: 'manageTheme',
      component: ThemeManage,
      meta: { auth: true, is_staff: true }
    },
    {
      path: '/manage/genre',
      name: 'manageGenre',
      component: GenreManage,
      meta: { auth: true, is_staff: true }
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

    {
      path: '/stats/staff',
      name: 'adminStats',
      component: StaffStats,
      meta: { auth: true, is_staff: true }
    },

    {
      path: '/stats/artist',
      name: 'artistStats',
      component: ArtistStats,
      meta: { auth: true, is_artist: true }
    },
    {
      path: '/stats/user',
      name: 'userStats',
      component: UserStats,
      meta: { auth: true }
    },

    {
      path: '/album/:id',
      name: 'albumDetail',
      component: AlbumDetail,
      meta: { auth: true }
    }, {
      path: '/music/:id',
      name: 'musicDetail',
      component: MusicDetail,
      meta: { auth: false },
    },
    {
      path: '/artist/:id/',
      name: 'artistDetail',
      component: ArtistDetail,
      meta: { auth: false },
      children: [
        {
          path: 'music',
          name: 'artistMusic',
          component: ArtistMusic,
          meta: { auth: false }
        },
        {
          path: '',
          name: 'artistHome',
          component: ArtistHome,
          meta: { auth: false }
        },
        {
          path: 'album',
          name: 'artistAlbum',
          component: ArtistAlbum,
          meta: { auth: false }
        }
      ]
    },

    {
      path: '/mapshow',
      name: 'MapShow',
      component: MapShow
    },

  ]
})
router.beforeEach(async (to, from, next) => {
  let is_artist
  let is_staff
  let is_superuser
  const isAuthenticated = !!localStorage.getItem('access_token')
  try {
    await axios
      .get(`${base_url}/api/user/login-user/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response) => {
        is_artist = response.data.is_artist
        is_staff = response.data.is_staff
        is_superuser = response.data.is_superuser

        store.dispatch('setLoggedInUserData')
      })
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }

  if (to.meta.auth && !isAuthenticated) {
    next('/login')
  } else if (!is_staff && to.meta.is_staff) {
    next('/')
  } else if (!is_superuser && to.meta.is_superuser) {
    next('/')
  } else if (!is_artist && to.meta.is_artist) {
    next('/')
  } else if (!to.meta.auth && isAuthenticated && to.name === 'loginPage') {
    next('/')
  } else if (is_staff | is_artist && to.meta.is_staffAndArtist) {
    next()
  } else {
    next()
  }
})

export default router
