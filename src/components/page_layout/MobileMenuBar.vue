
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
    import IconHome from        '@/components/icons/IconHome.vue'
    import IconExplore from     '@/components/icons/IconExplore.vue'
    import IconAdd from         '@/components/icons/IconAdd.vue'
    import IconLibrary from     '@/components/icons/IconLibrary.vue'
    import IconStat from        '@/components/icons/IconStat.vue'
</script>