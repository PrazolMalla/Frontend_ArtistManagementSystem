<template>

                <RouterLink v-if="!link" :to="`/${type}/${parseInt(id)}`" class="flex items-center w-3/6">
                  <img
                    :src="img"
                    alt="Item image"
                    class="w-12 h-12 rounded-md mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm  md:text-md">
                      {{ title}}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-xs">{{ subtitle }}</div>
                    </div>
                  </div>
                </RouterLink>
                <div v-else class="flex  items-center w-3/6">
                    <img
                    :src="img"
                    alt="Item image"
                    class="w-12 h-12 rounded-md mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm  md:text-md">
                      {{ title }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-xs">{{ subtitle }}</div>
                    </div>
                  </div>
                </div>
</template>
<script setup>
const base_url = import.meta.env.VITE_BASE_API_URL;
import { imgUrl } from '@/utils/imageProcess';
const props = defineProps({
   link: {
     type: Boolean,
   },
   id:{
    type:Number
   },
   image:{
    type:String
   },
   title:{
    type:String
   },
   subtitle:{
    type:String
   },
   type:{
    type:String
   }

});

const img = imgUrl(props.image)
</script>