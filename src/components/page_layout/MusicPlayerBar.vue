<template lang="">
  <div
    :class="{ 'sm:w-[63vw] md:w-[73vw] lg:w-[78vw]': is_ShownPlayer }"
    class=" flex flex-col playerGradient cursor-pointer z-40 sm:ml-[30vw] fixed md:ml-[26vw] lg:ml-[18vw] bottom-16 sm:bottom-5  sm:rounded-lg sm:h-17 h-17 "
  >
    <input v-if="is_ShownPlayer"
      type="range"
      min="0"
      max="100"
      v-model="playerData.volume"
      class="sliderBar w-full hover:h-2 h-1 rounded-full appearance-none cursor-pointer thumb-edit"/>
    <div class="flex px-2 justify-between items-center  py-2">
      <div class="flex items-center gap-1 text-light-primary-color">
        <v-icon v-if="is_ShownPlayer" name="md-playlistplay-round" fill="#f6f3eb" scale="2" class="mt-2 cursor-pointer" />
        <img
          @click="toggleBar"
          :src="playerData.img_src"
          alt="Album Cover"
          class="h-12 w-12 rounded-md"
        />
        <div v-if="is_ShownPlayer" :to="'/music/' + playerData.id" class="flex flex-col flex-wrap">
          <router-link :to="'/music/' + playerData.id" class="font-semibold hover:underline">{{
            playerData.name
          }}</router-link>
          <span class="text-sm">
            <router-link :to="'/album/' + playerData.album" class="font-semibold hover:underline">{{
              playerData.album
            }}</router-link>
            ,
            <router-link
              :to="'/artist/' + playerData.artist"
              class="font-semibold hover:underline"
              >{{ playerData.artist }}</router-link
            >
          </span>
        </div>
      </div>

      <div v-if="is_ShownPlayer" class="flex items-center gap-4 sm:gap-8">
        <v-icon name="fa-angle-left" fill="#302f31" scale="1.5" class="cursor-pointer" />
        <v-icon
          v-if="is_playing"
          @click="togglePlayPause"
          name="fa-pause"
          fill="#302f31"
          scale="1"
          class="cursor-pointer"
        />
        <v-icon
          v-else
          name="fa-play"
          @click="togglePlayPause"
          fill="#302f31"
          scale="1"
          class="cursor-pointer"
        />
        <v-icon name="fa-angle-right" fill="#302f31" scale="1.5" class="cursor-pointer" />
        <v-icon
          :name="volume"
          @click="toggleVolume"
          fill="#302f31"
          scale="1.3"
          class="mr-5 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      is_ShownPlayer: true,
      is_playing: this.is_play,
      volumeState: localStorage.getItem('volume')
    }
  },
  computed: {
    ...mapState(['playerData', 'is_play']),
    volume() {
      console.log(this.volumeState)
      switch (this.volumeState) {
        case 0: {
          localStorage.setItem('volume', 0)
          return 'md-volumemute-round'
        }
        case 1: {
          localStorage.setItem('volume', 1)
          return 'md-volumedown-round'
        }
        case 2: {
          localStorage.setItem('volume', 2)
          return 'md-volumeup-round'
        }
        case 3: {
          localStorage.setItem('volume', 3)
          return 'md-volumeoff-round'
        }
        default: {
          localStorage.setItem('volume', 1)
          return 'md-volumedown-round'
        }
      }
    }
  },
  methods: {
    toggleBar() {
      console.log('CLicked')
      this.is_ShownPlayer = !this.is_ShownPlayer
    },
    togglePlayPause() {
      this.is_playing = !this.is_playing
      this.$store.dispatch('setPlayState', this.is_playing)
    },
    toggleVolume() {
      this.volumeState = (this.volumeState + 1) % 4
    },
    toggleTimer() {}
  }
}
</script>
<style scoped>
.playerGradient {
  background: linear-gradient(45deg, #ff4000bb, #ece6d59d);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.sliderBar{
  background: #ebb8a7;
  backdrop-filter: blur(10px);
}
</style>
