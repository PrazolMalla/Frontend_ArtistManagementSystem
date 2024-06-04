<template lang="">
    <div class="mt-5 bg-light-primary-color h-[50vh] w-[80vw] p-6 lg:w-[30vw] md:h-[55vh] mb-5">
        <h1 class=" mb-4 text-2xl font-semibold md:w-[60vw]">Top Chart</h1>
        <div v-for="(item, index) in 3" :key="index">
        <div class="w-[67vw] bg-transparent h-24 rounded-md md:w-[25vw] md:h-24 p-4 flex gap-5 hover:bg-secondary-color hover:hover:text-slate-200  text-slate-400 cursor-pointer">
            <img src="../../assets/images/album-cover-design-template-05a138f43b181c728e956968786fdf7d_screen.jpg" class="w-16 h-16 rounded-md">
            <div class="flex flex-col md:flex-row md:justify-center md:gap-20 md:items-center">
                <div>
                    <p class="md:text-lg font-semibold text-slate-50">Hello</p>
                <p class="md:text-lg">Ram Dhakal</p>
                </div>
               
                <p class="md:text-lg">3:30</p>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
</script>
<style lang="">
    
</style>