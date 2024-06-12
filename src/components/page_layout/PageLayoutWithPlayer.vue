<script setup>
import NavBar from '@/components/page_layout/NavBar.vue'
import SideBar from '@/components/page_layout/Sidebar.vue'
import MobileMenuBar from '@/components/page_layout/MobileMenuBar.vue'
import MusicPlayerBar from '@/components/page_layout/MusicPlayerBar.vue'
</script>
<template>
  <div class="relative flex justify-between">
    <SideBar />
    <div class="flex flex-col w-full">
        <NavBar />
      <div
        class="ml-0 sm:ml-[25vw] lg:ml-[15vw] px-16 pt-20 text-primary-text-color flex flex-col mb-32"
      >
        <slot name="content"> </slot>
      </div>
      <div>
        <!-- <MusicPlayerBar /> -->
      </div>

      <div
        class="sm:hidden flex justify-evenly py-4 fixed bottom-0 left-0 right-0 bg-light-primary-color h-16 cursor-pointer"
      >
        <MobileMenuBar />
      </div>
    </div>
  </div>
</template>
