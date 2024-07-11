import { createStore } from 'vuex'
import axios from 'axios'
const URL = import.meta.env.VITE_BASE_API_URL
export default createStore({
  state: {
    playerData: Object,
    is_play: Boolean,
    volume: Number,
    loggedInUserData: Object,
    themeColor: {
      bgColor: ' #f6f3eb',
      textColor: '#302f31',
      sidebarBgColor: '#ECE6D5'
    }
  },
  mutations: {
    SET_THEME_COLOR(state, themeColor) {
      state.themeColor = themeColor
    },
    SET_LOGGEDIN_USER_DATA(state, loggedInUserData) {
      state.loggedInUserData = loggedInUserData
    },
    SET_PLAYER_DATA(state, playerData) {
      state.playerData = playerData
    },

    SET_PLAY_STATE(state, is_play) {
      state.is_play = is_play
    },

    SET_VOLUME_STATE(state, volume) {
      state.volume = volume
    }
  },
  actions: {
    setThemeColor({ commit }, themeColor) {
      commit('SET_THEME_COLOR', themeColor)
    },
    setMusicPlayer({ commit }, music) {
      localStorage.setItem('selectedMusic', music.name)
      localStorage.setItem('selectedMusicdes', music.description)
      localStorage.setItem('selectedMusicImg', music.img_profile)
      commit('SET_PLAYER_DATA', music)
    },

    setVolumeState({ commit }, volume) {
      localStorage.setItem('volume', volume)
      commit('SET_VOLUME_STATE', volume)
    },
    setPlayState({ commit }, state) {
      localStorage.setItem('is_play', state)
      commit('SET_PLAY_STATE', state)
    },
    setLoggedInUserData({ commit }) {

      try {
        axios
          .get(`${URL}/api/user/login-user/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          })
          .then((response) => {
            commit('SET_LOGGEDIN_USER_DATA', response.data)

          })

      } catch (error) {
        console.error('Failed to fetch user data: from store')
      }
    },

    removeLoggedInUserData({ commit }) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      commit('SET_LOGGEDIN_USER_DATA', '')

    }
  },
  getters: {
    getLoggedInUserData: (state) => state.loggedInUserData,
    getThemeColor: (state) => state.themeColor
  }
})
