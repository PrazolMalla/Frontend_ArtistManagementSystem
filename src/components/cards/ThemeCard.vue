<template>
  <!-- <div class="album-card p-2 transform hover:scale-105 transition-transform duration-300 bg-light-primary-color rounded-lg shadow-md ">
    <div class="flex flex-col items-center gap-2">
        <img :src="`http://127.0.0.1:8000${themeData.img_profile}`" alt="" class="rounded-lg" />
    </div>
  </div> -->


  <div class="border border-slate-500 relative  rounded-md overflow-hidden w-[20vw] h-[20vh] cursor-pointer"  @click="select(themeData.id)">
      <div class="absolute  w-full h-full bg-cover" :style="{ backgroundImage: `url(http://127.0.0.1:8000${themeData.img_profile})`, backgroundSize: 'cover' }"></div>
      <div class="absolute bgThemeGlass z-10 h-full w-full opacity-90 p-2 backdrop-blur-3xl filter" :style="{ backgroundColor: themeData.darkPrimaryColor}">
      <p class="z-20 text-md" :style="{ color: themeData.secondaryColor}"> The Text Goes here</p>
      </div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
  props: {
    themeData: Object
  },
  methods: {
    async select(id) {


       try {
        const response = await axios.patch(`http://127.0.0.1:8000/api/user/theme/set/${id}/`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`
              }
            })
        console.log(response.data)
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
