<!-- <template>
    
    <div class="hidden fixed sm:flex h-[100%] justify-start flex-col bg-light-primary-color sm: p-10  lg:w-[15vw] w-[25vw] text-white pt-10 sm:pt-20">

    <router-link to="/adminpage" class="flex flex-row items-center text-xl mb-5 ">
        <IconSupport  class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Home</p>
    </router-link>
    <router-link to="/adminpage" class="flex flex-row items-center text-xl mb-5 ">
        <IconSupport  class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Explore</p>
    </router-link>
    <router-link to="/adminpage" class="flex flex-row items-center text-xl mb-5 ">
        <IconSupport  class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Manage</p>
    </router-link>
    <router-link to="/album" class="flex flex-row items-center text-xl mb-5 ">
        <IconAlbum class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Library</p>
    </router-link>
    <router-link to="/artist" class="flex flex-row items-center text-xl mb-5 ">
        <IconArtist class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Stats</p>
    </router-link>
    <router-link to="/music" class="flex flex-row items-center text-xl mb-5 ">
        <IconMusic class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Musics</p>
    </router-link>
    <router-link to="/band" class="flex flex-row items-center text-xl mb-5 ">
        <IconBand class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Bands</p>
    </router-link>
    <p class="text-gray-text-color mb-4 text-sm">Actions:</p>
    <router-link to="/music/add" class="flex flex-row items-center text-xl mb-5 ">
        <IconAdd class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Add Music</p>
    </router-link>
    <router-link to="/album/add" class="flex flex-row items-center text-xl mb-5 ">
        <IconAdd class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Add Album</p>
    </router-link>
    <router-link to="/genre/add" class="flex flex-row items-center text-xl mb-5 ">
        <IconAdd class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Add Genre</p>
    </router-link> 


    
</div>
</template>
<script setup>
   import IconHamBurger from    '@/components/icons/IconHamBurger.vue'
   import IconSupport from      '@/components/icons/IconSupport.vue'
   import IconArtist from       '@/components/icons/IconArtist.vue'
   import IconMusic from        '@/components/icons/IconMusic.vue'
   import IconBand from         '@/components/icons/IconBand.vue'
   import IconAlbum from        '@/components/icons/IconAlbum.vue'
   import IconAdd from          '@/components/icons/IconAdd.vue'
</script> -->


<template>
  <div class="hidden fixed sm:flex h-[100%] justify-start flex-col bg-light-primary-color sm:p-10 lg:w-[15vw] w-[25vw] text-white pt-10 sm:pt-20">

        <div class="flex  gap-2 mb-5">
            <v-icon name="md-home-round" fill="#cbd5e1" scale="1" class=" cursor-pointer" />  
            <router-link to="/" class=" text-md text-gray-text-color hover:text-white">Home</router-link>
        </div>
    <div v-for="category in categories" :key="category.name" class="relative mb-5">
       
       
        
        <button @click="toggleDropdown(category.name)"  class="flex gap-2">
            <v-icon :name="category.icon" fill="#cbd5e1" scale="1" class=" cursor-pointer" /> 
                <p class=" text-md text-gray-text-color hover:text-secondary-color mb-2">{{ category.name }}</p>
        </button>
     
            <div v-if="isDropdownOpen === category.name" class="ml-2 text-white flex flex-col gap-2 w-full rounded-md">
                <router-link
                v-for="action in category.actions"
                :key="action.text"
                :to="action.to"
                class="flex gap-2  text-sm text-gray-text-color hover:text-white"
                @click="closeDropdown"
                >
            <v-icon :name="action.icon" fill="#cbd5e1" scale="1" class=" cursor-pointer" /> 
          {{ action.text }}
        </router-link>
      </div>
    </div>

    <div class="absolute bottom-0 p-3 w-full flex justify-between left-0">
      <RouterLink to="/user/profile" class="relative flex gap-2 cursor-pointer">
        <img
          :src="imgProfile"
          alt=""
          class="w-10 h-10 border-4 rounded-full border-primary-text-color hover:cursor-pointer hover:border-secondary-color"
          :style="{ borderColor: themeData?.textColor }"
        />
        <h2
          class="font-medium text-primary-text-color text-md mt-2"
          :style="{ color: themeData?.textColor }"
        >
          {{ userData.firstname }}
        </h2>
      </RouterLink>
      <RouterLink to="/user/settings">
        <v-icon
          name="md-settings-round"
          fill="#302f31"
          scale="1"
          class="mt-2 cursor-pointer"
          :style="{ fill: themeData?.textColor }"
        />
      </RouterLink>
    </div>
    <div v-if="!userData.id" class="mt-1 py-2 flex gap-2 items-center">
      <router-link to="/login">
        <button
          class="text-sm bg-secondary-color text-dark-primary-color p-2 rounded-full hover:text-secondary-color hover:bg-dark-primary-color border border-secondary-color"
        >
          Login
        </button>
      </router-link>
      <span class="text-sm">or</span>
      <router-link to="/signup">
        <p class="text-md text-secondary-color">SignUp</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import store from '@/store/store'
import { ref, onMounted, computed, watch } from 'vue'
const userData = ref([])
const themeData = ref([])
const base_url  = import.meta.env.VITE_BASE_API_URL;
const imgProfile =  ref(`${base_url}${userData.value.img_profile}`)
const userDataFunc = () => {
  userData.value = store.getters.getLoggedInUserData
  console.log(userData.value.img_profile)
  imgProfile.value = `${base_url}${userData.value.img_profile}`
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
  imgProfile.value = `${base_url}${userData.value.img_profile}`
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

