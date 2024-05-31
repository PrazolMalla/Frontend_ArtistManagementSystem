<template>
    <div class="hidden fixed sm:flex h-screen justify-start flex-col bg-light-primary-color p-10 lg:w-[15vw] w-[25vw] text-white">
    <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary-color">
        <IconHamBurger class="mr-2"/>
        Dashboard
    </router-link>

    <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary-color">
        <IconSupport  class="mr-2"/>
        Staff</router-link>
    <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary-color">
        <IconAlbum class="mr-2"/>
        Album
    </router-link>
    <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary-color">
        <IconArtist class="mr-2"/>
        Artist
    </router-link>
    <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary-color">
        <IconMusic class="mr-2"/>
        Music
    </router-link>
    <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary-color">
        <IconBand class="mr-2"/>
        Band
    </router-link>
</div>
</template>
<script setup>
   import IconHamBurger from  './icons/IconHamBurger.vue'
   import IconSupport from  './icons/IconSupport.vue'
   import IconArtist from  './icons/IconArtist.vue'
   import IconMusic from  './icons/IconMusic.vue'
   import IconBand from  './icons/IconBand.vue'
   import IconAlbum from  './icons/IconAlbum.vue'
</script>