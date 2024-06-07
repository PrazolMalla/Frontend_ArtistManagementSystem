import { createStore } from 'vuex'
import axios from 'axios'
const URL = 'http://127.0.0.1:8000/'
export default createStore({
  state: {
    playerData: Object,
    is_play: Boolean,
    volume: Number,
    loggedInUserData: Object
  },
  mutations: {
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
    setMusicPlayer({ commit }, music) {
      localStorage.setItem('selectedMusic', music.name)
      localStorage.setItem('selectedMusicdes', music.description)
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
            console.log(response.data)
            commit('SET_LOGGEDIN_USER_DATA', response.data)
          })
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }
  },
  getters: {
    getUserData: (state) => state.userData,
    getLoggedInUserData: (state) => state.loggedInUserData
  }
})
