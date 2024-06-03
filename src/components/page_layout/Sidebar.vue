<template>
    
    <div class="hidden fixed sm:flex h-[100%] justify-start flex-col bg-light-primary-color sm: p-10  lg:w-[15vw] w-[25vw] text-white pt-10 sm:pt-20">
    <p class="text-gray-text-color mb-4 text-sm">MENU</p>
    <router-link to="/dashboard" class="flex flex-row items-center text-xl mb-5 ">
        <IconHamBurger class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color ">Dashboard</p>
    </router-link>

    <router-link to="/adminpage" class="flex flex-row items-center text-xl mb-5 ">
        <IconSupport  class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Staffs</p></router-link>
    <router-link to="/album" class="flex flex-row items-center text-xl mb-5 ">
        <IconAlbum class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Albums</p>
    </router-link>
    <router-link to="/artist" class="flex flex-row items-center text-xl mb-5 ">
        <IconArtist class="mr-2"/>
        <p class=" ml-2 text-sm text-gray-text-color hover:text-secondary-color">Artists</p>
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
</script>