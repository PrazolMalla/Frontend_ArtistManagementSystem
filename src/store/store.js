import { createStore } from 'vuex'
import axios from 'axios'
const URL = 'http://127.0.0.1:8000/'
export default createStore({
  state: {
    playerData: Object,
    is_play: Boolean,
    volume: Number,
    loggedInUserData: Object,
    themeColor: 
    {
      bgColor:" #f6f3eb",
      textColor:"#302f31"
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

    

    setThemeColor({commit}, themeColor){
      commit('SET_THEME_COLOR',themeColor)
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
          .get('http://127.0.0.1:8000/api/user/login-user/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          })
          .then((response) => {
            commit('SET_LOGGEDIN_USER_DATA', response.data)
            console.log(response.data)
          })
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }
  },
  getters: {
    getLoggedInUserData: (state) => state.loggedInUserData,
    getThemeColor: (state) => state.themeColor
  }
})
