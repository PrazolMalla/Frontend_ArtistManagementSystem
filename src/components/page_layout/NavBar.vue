<template>
  <div v-if="is_radioMode"
    class="fixed top-0 bggradientradio w-screen h-screen z-60 flex flex-col justify-center gap-10 items-center"
    :style="{ '--bg-color': themeData?.bgColor }">
    <img :src="playerData.img_src" alt="" class="w-32 rounded-md hover:cursor-pointer select-none" />
    <div class="flex justify-center gap-10 items-center">
      <v-icon name="fa-times" fill="#302f31" scale="1.5" @click="closeRadioMode"
        class="absolute top-5 right-5 cursor-pointer" />
      <v-icon name="fa-angle-left" @click="prevTrack" fill="#302f31" scale="4" class="cursor-pointer" />
      <v-icon v-if="is_playing" @click="togglePlayPause" name="fa-pause" fill="#302f31" scale="4"
        class="cursor-pointer" />
      <v-icon v-else name="fa-play" @click="togglePlayPause" fill="#302f31" scale="4" class="cursor-pointer" />
      <v-icon name="fa-angle-right" @click="nextTrack" fill="#302f31" scale="4" class="cursor-pointer" />
    </div>
  </div>

  <div
    class="fixed lg:w-[85vw] md:w-[75vw] sm:ml-[25vw] lg:ml-[15vw] sm:h-16 h-16 w-full flex px-8 justify-between sm:px-16 z-40"
    :style="{ backgroundColor: themeData?.bgColor }">
    <div class="flex gap-4 sm:gap-8">
      <RouterLink to="/">
        <h1 class="font-semibold text-2xl mt-4 hover:text-secondary-color cursor-pointer select-none"
          :style="{ color: themeData?.textColor }">
          MUSICÀ
        </h1>
      </RouterLink>
      <div class="hidden md:flex lg:w-[40vw] my-4 justify-between rounded-full border"
        :style="{ color: themeData?.textColor, borderColor: themeData?.textColor }">
        <input type="text"
          class="searchbar text-sm border-none w-full p-4 bg-transparent focus:outline-none text-xsm hidden sm:flex opacity-100"
          placeholder="Search Music, Artist, Album, Band ..."
          :style="{ color: themeData?.textColor, 'placeholder-color': themeData?.textColor }" v-model="searchName"
          @blur="offFocusSearchBar" @focus="onFocusSearchBar" />
        <v-icon name="md-search" fill="#302f31" scale="1.5" class="cursor-pointer hover:text-gray-950 p-1"
          :style="{ fill: themeData?.textColor }" />
      </div>
      <div v-if="is_showSearchPopUp" class="bggradient z-30 searchField absolute sm:ml-50 w-5/6 h-20 top-20 rounded-lg"
        :style="{ '--bg-color': themeData?.bgColor }"></div>
      <div v-if="is_showNotificationPopUp"
        class="bggradient z-30 searchField absolute w-5/6 sm:w-3/6 sm:right-10 h-20 top-20 rounded-lg"
        :style="{ '--bg-color': themeData?.bgColor }"></div>
    </div>


    <div class="flex gap-5">
      <div class=" hidden sm:flex">
        <v-icon name="md-notifications-outlined" scale="1.2" class="cursor-pointer mt-5"
          :style="{ fill: themeData?.textColor }" @click="toggleNotification" />
      </div>
      <div class=" flex sm:hidden">
        <v-icon name="fa-search" scale="1.2" class="cursor-pointer mt-5" :style="{ fill: themeData?.textColor }" />

      </div>

      <div class="flex sm:hidden">
        <v-icon name="fa-bars" fill="#302f31" scale="1.5" class="text-2xl text-blue-900 cursor-pointer select-none mt-5"
          :style="{ fill: themeData?.textColor }" @click="openClosePopupSideBar" />

      </div>

    </div>


    <div class="hidden">

      <v-icon name="md-notifications-outlined" scale="1.2" class="cursor-pointer mt-5"
        :style="{ fill: themeData?.textColor }" @click="toggleNotification" />

      <RouterLink v-if="userData.id" to="/user/settings" class="md:hidden">
        <v-icon name="md-settings-round" fill="#302f31" scale="1" class="mt-5 cursor-pointer"
          :style="{ fill: themeData?.textColor }" />
      </RouterLink>

      <RouterLink v-if="userData.id" to="/user/profile" class="md:hidden
       relative flex gap-2 cursor-pointer">
        <img :src="imgProfile" alt=""
          class="w-7 h-7 border-2 mt-5 rounded-full border-primary-text-color hover:cursor-pointer hover:border-secondary-color"
          :style="{ borderColor: themeData?.textColor }" />

      </RouterLink>
      <RouterLink v-else to="/login" class="md:hidden">
        <button
          class="text-xsz  mt-5 bg-secondary-color text-dark-primary-color p-1 rounded-full hover:text-secondary-color hover:bg-dark-primary-color border border-secondary-color">
          Login
        </button>
      </RouterLink>

    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
const userData = ref([])
const base_url = import.meta.env.VITE_BASE_API_URL;
const imgProfile = ref(`${base_url}${userData.value.img_profile}`)
const store = useStore()
const is_openPopupSideBar = ref()
const is_showNotificationPopUp = ref(false)
const searchName = ref('')
const is_showSearchPopUp = ref(false)
const is_playing = ref(store.state.is_play)
const is_radioMode = ref(false)
const themeData = ref({
  bgColor: '',
  textColor: ''
})

const playerData = computed(() => store.state.playerData)
const getThemeColor = computed(() => store.getters.getThemeColor)

const userDataFunc = () => {
  userData.value = store.getters.getLoggedInUserData
  imgProfile.value = `${base_url}${userData.value.img_profile}`
}
const getUserData = computed(() => store.getters.getLoggedInUserData)
watch(getUserData, (newVal) => {
  userData.value = newVal
  imgProfile.value = `${base_url}${userData.value.img_profile}`
})

const openClosePopupSideBar = () => {
  is_openPopupSideBar.value = !is_openPopupSideBar.value;
}

watch(
  getThemeColor,
  (newVal) => {
    themeData.value.bgColor = newVal.bgColor
    themeData.value.textColor = newVal.textColor
  },
  { immediate: true }
)

watch(searchName, (newVal) => {
  is_showSearchPopUp.value = newVal !== ''
  if (newVal !== '') {
    console.log(newVal)
  }
})

const closeRadioMode = () => {
  is_radioMode.value = false
}

const openRadioMode = () => {
  is_radioMode.value = true
}

const togglePlayPause = () => {
  is_playing.value = !is_playing.value
  store.dispatch('setPlayState', is_playing.value)
}

const offFocusSearchBar = () => {
  is_showSearchPopUp.value = false
}

const onFocusSearchBar = () => {
  is_showNotificationPopUp.value = false
  if (searchName.value !== '') {
    is_showSearchPopUp.value = true
  }
}

const toggleNotification = () => {
  is_showSearchPopUp.value = false
  is_showNotificationPopUp.value = !is_showNotificationPopUp.value
}

onMounted(() => {
  store.dispatch('setLoggedInUserData')
  userDataFunc()
})
</script>
<style>
<style scoped>.searchbar::placeholder {
  color: var(--placeholder-color);
  opacity: 1;
}

.bggradient {
  background: linear-gradient(45deg, rgba(255, 81, 109, 0.7), rgba(8, 7, 39, 0.7));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.bggradientradio {
  background: linear-gradient(45deg, var(--bg-color, #ff4000bb), #ece6d59d);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(10px);
}
</style>