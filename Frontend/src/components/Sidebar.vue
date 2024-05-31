<template>
    <div class="flex h-screen">
        <div class="flex flex-col w-64 bg-light-primary">
            <nav class="px-12 py-12 text-white">
                <div  class="flex flex-col justify-center py-8">
                        <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary">
                            <IconHamBurger class="mr-2"/>
                            Dashboard
                        </router-link>

                        <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary">
                            <IconSupport  class="mr-2"/>
                            Staff</router-link>
                        <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary">
                            <IconAlbum class="mr-2"/>
                            Album
                        </router-link>
                        <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary">
                            <IconArtist class="mr-2"/>
                            Artist
                        </router-link>
                        <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary">
                            <IconMusic class="mr-2"/>
                            Music
                        </router-link>
                        <router-link to="" class="flex flex-row items-center text-xl mb-5 hover:text-secondary">
                            <IconBand class="mr-2"/>
                            Band
                        </router-link>
                </div>
                
            </nav>
        </div>
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