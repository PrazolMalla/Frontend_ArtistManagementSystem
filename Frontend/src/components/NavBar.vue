<template lang="">
    <div class=" sm:w-[85vw] sm:ml-[15vw] sm:h-16 bg-dark-primary-color h-16 w-full flex px-8 justify-between">
        <div class="flex gap-4 sm:gap-8">
            <RouterLink to="/home">
            <h1 class=" text-slate-300 font-semibold text-2xl mt-4 hover:text-secondary-color cursor-pointer">MUSICA</h1>
            </RouterLink>
            <div class="w-[20vw] mt-4 flex ">
                <v-icon name="md-search"  fill="#cbd5e1" scale="1.5" class=" cursor-pointer hover:text-gray-950 mt-1" />
                <input type="text" class="border-none h-8 w-[20vw] bg-transparent focus:outline-none px-2 pt-1 text-slate-300 hidden sm:flex" placeholder="Search for music artist etc..."/>
            </div>
        </div>
        <div class="flex gap-4">
            <v-icon name="md-notifications-outlined" fill="#cbd5e1" scale="1.5" class=" cursor-pointer mt-5"/>
            <RouterLink to="/login">

            
            <div class="relative flex gap-2 cursor-pointer">
				<img :src="user.profileImg" alt="" class="w-10 h-10 border-4 rounded-full border-slate-300 mt-4 hover:cursor-pointer hover:border-secondary-color">
                <h2 class=" font-medium text-slate-300 text-md mt-6 sm:flex hidden">{{user.username}}</h2>
			</div>
        </RouterLink>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    const user = ref({
        profileImg:"https://source.unsplash.com/50x50/?portrait",
        username:"Prazol"
    })
    

</script>
<style lang="">
    
</style>