<template>
  <div
    class="z-50 sm:hidden flex justify-evenly py-4 fixed bottom-0 left-0 right-0 bg-light-primary-color h-16 cursor-pointer"
     :style="{ backgroundColor: themeData?.bgColor }"
  >
    <div class="flex gap-2 mb-5">
      <router-link
        to="/"
        class="text-md text-primary-text-color hover:text-secondary-color"
        :style="{ color: themeData?.textColor }"
      >
        <v-icon
          name="md-home-round"
          fill="#302f31"
          scale="1.5"
          class="cursor-pointer"
          :style="{ fill: themeData?.textColor }"
      /></router-link>
    </div>
    <div v-for="category in categories" :key="category.name" class="relative mb-5">
      <button @click="toggleDropdown(category.name)" class="flex gap-2">
        <v-icon
          :name="category.icon"
          fill="#302f31"
          scale="1.5"
          class="cursor-pointer"
          :style="{ fill: themeData?.textColor }"
        />
        <!-- <p
          class="text-md text-primary-text-color hover:text-secondary-color mb-2"
          :style="{ color: themeData?.textColor }"
        >
          {{ category.name }}
        </p> -->
      </button>

      <div
        v-if="isDropdownOpen === category.name"
        class="absolute bottom-10 right-2 ml-2 flex flex-col gap-2 w-28 p-4 rounded-md bg-light-primary-color"
      >
        <router-link
          v-for="action in category.actions"
          :key="action.text"
          :to="action.to"
          class="flex gap-2 text-sm text-primary-text-color hover:text-black"
          @click="closeDropdown"
        >
          <v-icon
            :name="action.icon"
            fill="#302f31"
            scale="1.2"
            class="cursor-pointer"
            :style="{ fill: themeData?.textColor }"
          />
          <p :style="{ color: themeData?.textColor }">{{ action.text }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconHome from '@/components/icons/IconHome.vue'
import IconExplore from '@/components/icons/IconExplore.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconLibrary from '@/components/icons/IconLibrary.vue'
import IconStat from '@/components/icons/IconStat.vue'
import store from '@/store/store'
import { ref, onMounted, computed, watch } from 'vue'
const userData = ref([])
const themeData = ref([])

const userDataFunc = () => {
  userData.value = store.getters.getLoggedInUserData
}
const getUserData = computed(() => store.getters.getLoggedInUserData)

const getThemeColor = computed(() => store.getters.getThemeColor)

watch(
  getThemeColor,
  (newVal) => {
    themeData.value.bgColor = newVal.bgColor
    themeData.value.textColor = newVal.textColor
    themeData.value.sidebarBgColor = newVal.sidebarBgColor
  },
  { immediate: true }
)
watch(getUserData, (newVal) => {
  userData.value = newVal
})

const categories = ref([
  {
    name: 'Explore',
    icon: 'md-explore-sharp',
    actions: [
      { to: '/music', icon: 'si-applemusic', text: 'Music' },
      { to: '/artist', icon: 'fa-microphone', text: 'Artist' },
      // { to: '/band', icon: 'fa-guitar', text: 'Band' },
      { to: '/album', icon: 'md-album', text: 'Album' },
      { to: '/genre', icon: 'md-musicnote-round', text: 'Genre' }
    ]
  }
])

const isDropdownOpen = ref(null)

const toggleDropdown = (categoryName) => {
  isDropdownOpen.value = isDropdownOpen.value === categoryName ? null : categoryName
}

const closeDropdown = () => {
  isDropdownOpen.value = null
}

const showDataInSideBar = () => {
  if (userData.value.id) {
    
    categories.value.push({
      name: 'Library',
      icon: 'md-librarymusic',
      actions: [
        { to: '/library/likes', icon: 'fa-heart', text: 'Liked' },
        // { to: '/library/follow', icon: 'fa-user-check', text: 'Followed' },
        // { to: '/library/history', icon: 'fa-user-clock', text: 'History' }
      ]
    })
  }
  if (userData.value.is_artist | userData.value.is_staff) {
    categories.value.push({
      name: 'Stats',
      icon: 'fa-chart-line',
      actions: []
    })

    categories.value.push({ name: 'Manage', icon: 'md-manageaccounts-round', actions: [] })
    const manageIndex = categories.value.findIndex((category) => category.name === 'Manage')
    const statsIndex = categories.value.findIndex((category) => category.name === 'Stats')
    if (userData.value.is_artist) {
      categories.value[manageIndex].actions.push({
        to: '/manage/album',
        icon: 'md-album',
        text: 'Album'
      })
      categories.value[manageIndex].actions.push({
        to: '/manage/music',
        icon: 'si-applemusic',
        text: 'Music'
      })
      categories.value[statsIndex].actions.push({
        to: '/stats/artist',
        icon: 'fa-microphone',
        text: 'Artist'
      })
    }
    if (userData.value.is_staff) {
      categories.value[manageIndex].actions.push({
        to: '/manage/album',
        icon: 'md-album',
        text: 'Album'
      })

      categories.value[manageIndex].actions.push({
        to: '/manage/music',
        icon: 'si-applemusic',
        text: 'Music'
      })
      categories.value[manageIndex].actions.push({
        to: '/manage/theme',
        icon: 'fa-palette',
        text: 'Theme'
      })
      categories.value[manageIndex].actions.push({
        to: '/manage/genre',
        icon: 'md-musicnote-round',
        text: 'Genre'
      })
      categories.value[manageIndex].actions.push({
        to: '/manage/artist',
        icon: 'fa-microphone',
        text: 'Artist'
      })
      // categories.value[manageIndex].actions.push({
      //   to: '/manage/user',
      //   icon: 'fa-user-alt',
      //   text: 'User'
      // })
      categories.value[statsIndex].actions.push({
        to: '/stats/staff',
        icon: 'fa-user-shield',
        text: 'Staff'
      })
    }
    if (userData.value.is_superuser) {
      categories.value[manageIndex].actions.push({
        to: '/manage/staff',
        icon: 'fa-user-shield',
        text: 'Staff'
      })
    }
  }
}

onMounted(() => {
  store.dispatch('setLoggedInUserData')
  userDataFunc()
  showDataInSideBar()
})
</script>
