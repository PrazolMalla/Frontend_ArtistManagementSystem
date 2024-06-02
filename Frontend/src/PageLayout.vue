<script setup>
import Navbar from './components/NavBar.vue';
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
            <div class="">
                <MobileMenuBar/>
            </div>
        </div>  
    </div>

       
 
</template>