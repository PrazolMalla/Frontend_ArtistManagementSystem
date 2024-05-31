<template>
    <div class="bg-dark-primary h-16">
            <div class="mx-auto text-gray-600 pt-4 flex items-center justify-between">
                <h1 class="text-white">Logo</h1>
                <div class=""flex>
                  <input class="border border-white  placeholder-current h-10 px-5 pr-16 rounded-lg text-lg focus:outline-none" type="Search" name="search" placeholder="Search  for artist, music and genre">
                <button type="submit">
                    <IconSearch/>
                </button>

                </div>
                <h1 class="text-white">Profile</h1>              
            </div>
        </div>
</template>
<script setup>
 import IconSearch from  './icons/IconSearch.vue'
</script>