<template lang="">
  <div
    v-if="is_radioMode"
    class="fixed top-0 bggradientradio w-screen h-screen z-50 flex flex-col justify-center gap-10 items-center"
  >
    <img
      src="https://source.unsplash.com/800x800/?portrait"
      alt=""
      class="w-32 rounded-md hover:cursor-pointer select-none"
    />
    <div class="flex justify-center gap-10 items-center">
      <v-icon
        name="fa-times"
        fill="#302f31"
        scale="1.5"
        @click="closeRadioMode"
        class="absolute top-5 right-5 cursor-pointer"
      />
      <v-icon
        name="fa-angle-left"
        @click="prevTrack"
        fill="#302f31"
        scale="4"
        class="cursor-pointer"
      />
      <v-icon
        v-if="is_playing"
        @click="togglePlayPause"
        name="fa-pause"
        fill="#302f31"
        scale="4"
        class="cursor-pointer"
      />
      <v-icon
        v-else
        name="fa-play"
        @click="togglePlayPause"
        fill="#302f31"
        scale="4"
        class="cursor-pointer"
      />
      <v-icon
        name="fa-angle-right"
        @click="nextTrack"
        fill="#302f31"
        scale="4"
        class="cursor-pointer"
      />
    </div>
  </div>

  <div
    class="fixed lg:w-[85vw] md:w-[75vw] sm:ml-[25vw] lg:ml-[15vw] sm:h-16 bg-dark-primary-color h-16 w-full flex px-8 justify-between sm:px-16 z-40"
  >
    <div class="flex gap-4 sm:gap-8">
      <RouterLink to="/">
        <h1
          class="text-primary-text-color font-semibold text-2xl mt-4 hover:text-secondary-color cursor-pointer select-none"
        >
          MUSICA
        </h1>
      </RouterLink>
      <div
        class="hidden md:flex lg:w-[40vw] my-4 justify-between border border-primary-text-color rounded-full"
      >
        <input
          type="text"
          class="text-sm border-none w-full p-4 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color hidden sm:flex"
          placeholder="Search Music, Artist, Album, Band ..."
          v-model="searchName"
          @blur="offFocusSearchBar"
          @focus="onFocusSearchBar"
        />
        <v-icon
          name="md-search"
          fill="#302f31"
          scale="1.5"
          class="cursor-pointer hover:text-gray-950 p-1"
        />
      </div>
      <div
        v-if="is_showSearchPopUp"
        class="bggradient z-30 searchField absolute sm:ml-50 w-5/6 h-20 top-20 rounded-lg"
      ></div>
      <div
        v-if="is_showNotificationPopUp"
        class="bggradient z-30 searchField absolute w-5/6 sm:w-3/6 sm:right-10 h-20 top-20 rounded-lg"
      ></div>
    </div>
    <div class="flex gap-4">
      <div class="flex md:hidden">
        <v-icon name="fa-search" fill="#302f31" scale="1.5" class="cursor-pointer mt-5" />
      </div>
      <v-icon
        name="md-notifications-outlined"
        fill="#302f31"
        scale="1.2"
        class="cursor-pointer mt-5"
        @click="toggleNotification"
      />
      <v-icon name="md-darkmode-round" fill="#302f31" scale="1.2" class="cursor-pointer mt-5" />
      <v-icon
        name="md-radio-round"
        fill="#302f31"
        scale="1.2"
        class="cursor-pointer mt-5"
        @click="openRadioMode"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      user: {
        profileImg: 'https://source.unsplash.com/50x50/?portrait',
        username: 'Prazol'
      },
      is_showNotificationPopUp: false,
      searchName: '',
      is_showSearchPopUp: false,
      is_playing: this.is_play,
      is_radioMode: false
    }
  },
  computed: {
    ...mapState(['playerData', 'is_play'])
  },
  watch: {
    getData(newVal) {
      this.userData = newVal.resData
    },
    searchName(newVal) {
      if (newVal == '') {
        this.is_showSearchPopUp = false
      } else {
        this.is_showSearchPopUp = true
        console.log(newVal)
      }
    }
  },
  methods: {
    closeRadioMode() {
      this.is_radioMode = false
    },
    openRadioMode() {
      this.is_radioMode = true
    },
    togglePlayPause() {
      this.is_playing = !this.is_playing
      this.$store.dispatch('setPlayState', this.is_playing)
    },
    offFocusSearchBar() {
      this.is_showSearchPopUp = false
    },
    onFocusSearchBar() {
      this.is_showNotificationPopUp = false
      if (this.searchName != '') {
        this.is_showSearchPopUp = true
      }
    },
    toggleNotification() {
      this.is_showSearchPopUp = false
      this.is_showNotificationPopUp = !this.is_showNotificationPopUp
    }
  }
}
</script>
<style>
.bggradient {
  background: linear-gradient(45deg, rgba(255, 81, 109, 0.7), rgba(8, 7, 39, 0.7));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.bggradientradio {
  background: linear-gradient(45deg, rgba(255, 81, 109, 0.7), rgba(8, 7, 39, 0.7));
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(10px);
}
</style>
