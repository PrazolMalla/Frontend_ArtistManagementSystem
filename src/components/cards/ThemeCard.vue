<template>

  <div
    class="border flex justify-center items-center hover:border-secondary-color hover:shadow-md shadow-blue-400 border-slate-300 relative  rounded-md overflow-hidden w-28 h-28 cursor-pointer"
    @click="select(themeData?.id)">
    <div class="absolute  w-full h-full bg-cover" :style="{
      backgroundImage: `url(${background})`, backgroundSize: 'cover'
    }"></div>
    <div class="absolute  flex justify-center items-center border box-border  border-none h-full w-full "
      :style="{ backgroundColor: themeData?.darkPrimaryColor, opacity: themeData.opacity }">
    </div>
    <p class="absolute text-md" :style="{ color: themeData?.secondaryColor }"> {{ themeData?.name }}</p>
  </div>

</template>

<script setup>
import axios from 'axios';
const base_url = import.meta.env.VITE_BASE_API_URL
import { imgUrl } from '@/utils/imageProcess';
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
import { ref } from 'vue';
const props = defineProps(['themeData'])

const background = imgUrl(props.themeData?.img_profile)

const select = async function (id) {
  try {
    const response = await axios.patch(`${base_url}/api/user/theme/set/${id}/`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
    $toast.success(response?.data?.message, {
      position: 'top-right'
    })
  } catch (error) {
    console.error('Error setting Themes:', error)
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
</style>
