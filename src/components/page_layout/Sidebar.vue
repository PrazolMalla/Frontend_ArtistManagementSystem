
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


    <div class="absolute bottom-0 p-3  w-full  flex justify-between left-0">
        <RouterLink to="/user/profile" class="relative flex gap-2 cursor-pointer">
          
				<img src="https://source.unsplash.com/800x800/?portrait" alt="" class="w-10 h-10 border-4 rounded-full border-slate-300 hover:cursor-pointer hover:border-secondary-color">
                <h2 class=" font-medium text-slate-300 text-md mt-2 sm:flex hidden">Prazwol</h2>
              
        </RouterLink>
        <RouterLink to="/user/settings">
          <v-icon  name="md-settings-round"  fill="#cbd5e1" scale="1" class="mt-2 cursor-pointer" /> 
        </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
    
  data() {
    return {
      
      categories: [
        {
          name: 'Manage',
          icon: 'md-manageaccounts-round',
          actions: [
            { to: '/manage/artist', icon: 'fa-microphone', text: 'Artist' },
            { to: '/manage/user', icon: 'fa-user-alt', text: 'User' },
          ],
        },
        {
          name: 'Library',
          icon: 'md-librarymusic',
          actions: [
            { to: '/library/likes', icon: 'fa-heart', text: 'Liked' },
            { to: '/library/follow', icon: 'fa-user-check', text: 'Followed' },
            { to: '/library/history', icon: 'fa-user-clock', text: 'History' },
          ],
        },
        {
          name: 'Explore',
          icon: 'md-explore-sharp',
          actions: [
            { to: '/music', icon: 'fa-music', text: 'Music' },
            { to: '/artist', icon: 'fa-microphone', text: 'Artist' },
            { to: '/band', icon: 'fa-guitar', text: 'Band' },
            { to: '/album', icon: 'md-album', text: 'Album' },
            { to: '/genre', icon: 'md-musicnote-round', text: 'Genre' },
          ],
        },
        {
          name: 'Stats',
          icon: 'fa-chart-line',
          actions: [
            { to: '/stats/artist', icon: 'fa-microphone', text: 'Artist' },
            { to: '/stats/staff', icon: 'fa-user-shield', text: 'Staff' },
            { to: '/stats/user', icon: 'fa-user-alt', text: 'User' },
          ],
        },
      ],
      isDropdownOpen: null,
    };
  },
  methods: {
    toggleDropdown(categoryName) {
      this.isDropdownOpen = this.isDropdownOpen === categoryName ? null : categoryName;
    },
    closeDropdown() {
      this.isDropdownOpen = null;
    },
  },
};
</script>

