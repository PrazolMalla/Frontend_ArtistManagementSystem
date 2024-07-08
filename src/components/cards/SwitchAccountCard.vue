<template>
         <div class="w-12 h-12 bg-cover rounded-full relative border overflow-hidden hover:border-2 cursor-pointer border-secondary-color" :style="{ 
          backgroundImage: `url(${artistDataImg})`, backgroundSize: 'cover' }">
                
            <div class="group hover:flex hover:flex-col hover:justify-center hover:items-center w-5 h-5 rounded-bl-lg top-0 right-0  absolute bg-secondary-color hover:w-full hover:h-full hover:bg-dark-primary-color hover:bg-opacity-70 ">
                 <v-icon
        name="fa-times"
        scale="0.75"
        class="cursor-pointer fill-dark-primary-color  group-hover:fill-secondary-color"
            />
            </div>
            </div>

    
</template>
<script setup> 
import { computed } from 'vue';
const base_url  = import.meta.env.VITE_BASE_API_URL;
const props = defineProps({
    artistData: {
      type:Object
    }
  })
const artistDataImg = computed(() => `${base_url}${props.artistData?.img_profile}`);

</script>
