<template>

                <RouterLink v-if="!is_disabled" :to="`/music/${music.id}`" class="flex items-center w-3/6">
                  <img
                    :src="`${base_url}${music.img_profile}`"
                    alt="Music image"
                    class="w-12 h-12 rounded-md mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm  md:text-md">
                      {{ music.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-xs">{{ music.artist_name }}</div>

                    </div>
                  </div>
                </RouterLink>
                <div v-else class="flex  items-center w-3/6">
                    <img
                    :src="`${base_url}${music.img_profile}`"
                    alt="Music image"
                    class="w-12 h-12 rounded-md mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm  md:text-md">
                      {{ music.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-xs">{{ music.artist_name }}</div>
                    </div>
                  </div>
                </div>
</template>
<script setup>

const base_url = import.meta.env.VITE_BASE_API_URL;
const props = defineProps({
   music: {
     type: Object,
   },
   is_disabled:{
    type: Boolean
   }
});
</script>