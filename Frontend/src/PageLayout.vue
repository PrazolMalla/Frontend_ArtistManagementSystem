<script setup>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import MobileMenuBar from './components/MobileMenuBar.vue'

</script>
<template>
    <div class="flex h-lvh">
        <div class="hidden fixed sm:flex h-screen justify-start flex-col w-40 bg-light-primary-color p-10 text-white">
                <Sidebar/>
        </div>
        <div class="flex flex-col w-40 sm:m-32 border border-white">
            <div class="fixed flex flex-col h-14 sm:h-16">
                <Navbar/>
            
            </div>
            <div class="sm:mt-16 mt-14 p-5">
                <slot name="content" >

                </slot>
            </div>
            <div class="sm:hidden flex justify-evenly py-4 fixed bottom-0 left-0 right-0  bg-light-primary-color h-16 cursor-pointer">
                <MobileMenuBar/>
            </div>
        </div>  
    </div>

       
 
</template>