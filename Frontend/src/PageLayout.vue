<script setup>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import MobileMenuBar from './components/MobileMenuBar.vue'

</script>
<template>

    <div class="flex h-lvh">
        <!-- <Sidebar class=" hidden sm:flex w-" /> -->
        <div class="hidden fixed sm:flex flex-col  w-40 bg-red-900 h-lvh">
            <Sidebar/>
        </div>
        <div class="flex flex-col   sm:ml-40">
            <div class="fixed flex flex-col h-14 w-full sm:h-16 bg-blue-900">
                <Navbar/>
            </div>
            <div class="main sm:mt-16 mt-14 p-5  ">
                <slot name="content" >

                </slot>

            </div>

            <div class="fixed bottom-0 sm:hidden flex flex-col h-14 w-full sm:h-16 bg-blue-900">
                <MobileMenuBar/>
            </div>

        </div>  
    </div>

       
 
</template>