
<template >
    <div class="z-50 sm:hidden flex justify-evenly py-4 fixed bottom-0 left-0 right-0  bg-light-primary-color h-16 cursor-pointer">

    
                <router-link to="/"><IconHome/></router-link>
                <router-link to="/"><IconExplore/></router-link>
                <router-link to="/"><IconAdd/></router-link>
                <router-link to="/"><IconLibrary/></router-link>
                <router-link to="/"><IconStat/></router-link>
            </div>

</template>
<script setup>
    import IconHome from  './icons/IconHome.vue'
    import IconExplore from  './icons/IconExplore.vue'
    import IconAdd from  './icons/IconAdd.vue'
    import IconLibrary from  './icons/IconLibrary.vue'
    import IconStat from  './icons/IconStat.vue'
</script>