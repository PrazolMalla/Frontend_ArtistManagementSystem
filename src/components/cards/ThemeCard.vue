<template>

  <div class="border hover:border-blue-800 hover:shadow-md shadow-blue-400 border-slate-300 relative  rounded-md overflow-hidden w-[20vw] h-[20vh] cursor-pointer"  @click="select(themeData.id)">
      <div class="absolute  w-full h-full bg-cover" :style="{ 
          backgroundImage: `url(${base_url}${themeData.img_profile})`, backgroundSize: 'cover' }"></div>
      <div class="absolute bgThemeGlass z-10 h-full w-full opacity-90 p-2 backdrop-blur-3xl filter" :style="{ backgroundColor: themeData.darkPrimaryColor}">
      <p class="z-20 text-md" :style="{ color: themeData.secondaryColor}"> {{  themeData.name }}</p>
      </div>
    </div>

</template>

<script>
import axios from 'axios';

const base_url  = import.meta.env.VITE_BASE_API_URL
import {useToast} from 'vue-toast-notification'
const $toast = useToast()
export default {
  props: {
    themeData: Object
  },
  methods: {
    async select(id) {


       try {
        const response = await axios.patch(`${base_url}/api/user/theme/set/${id}/`, {}, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  'Content-Type': 'application/json'
              }
            })
        console.log(response.data)
         $toast.success(response.data.message, {
            position: 'top-right'
        })
      } catch (error) {
        console.error('Error setting Themes:', error)
      }
    }
  }
}



</script>
<style scoped>
@media (min-width: 768px) {
  .album-card {
    width: calc(33.33% - 1rem);
  }
}

@media (min-width: 1024px) {
  .album-card {
    width: calc(25% - 1rem);
  }
}
.bgThemeGlass {
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
