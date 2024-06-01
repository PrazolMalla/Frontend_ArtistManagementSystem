<template lang="">
    <div class=" fixed lg:w-[85vw] md:w-[75vw] sm:ml-[25vw] lg:ml-[15vw] sm:h-20 bg-dark-primary-color h-16 w-full flex px-8 justify-between">
        <div class="flex align-bottom gap-4 sm:gap-8"  
        >
            <RouterLink to="/">
            <h1 class=" text-slate-300 font-semibold text-2xl mt-6 hover:text-secondary-color cursor-pointer align-middle">MUSICA</h1>
            </RouterLink>
            <div class="hidden md:flex lg:w-[40vw] my-4  justify-between border border-slate-500 rounded-full">
                <input type="text" class="border-none w-full p-4 bg-transparent focus:outline-none text-xsm  text-slate-300 hidden sm:flex" placeholder="Search Music, Artist, Album, Band ..."
                      v-model="searchName"      
                    @blur="offFocusSearchBar"
                    @focus="onFocusSearchBar" />
                    <v-icon name="md-search"  fill="#cbd5e1" scale="1.5" class=" cursor-pointer hover:text-gray-950 m-2 " />
                
            </div>

             <div
                v-if="is_showSearchPopUp"
                class="z-30 searchField absolute  z-2 lg:ml-28 md:ml-20  w-4/6 h-20 top-20 border border-slate-700  rounded-lg  bg-light-primary-color  shadow-sm shadow-slate-500"
                ></div>
        </div>
        <div class="flex gap-4">

            <div class="flex md:hidden">
                <v-icon name="md-search"  fill="#cbd5e1" scale="1.5" class="cursor-pointer mt-5" />

            </div>
                
            <v-icon name="md-notifications-outlined" fill="#cbd5e1" scale="1.5" class=" cursor-pointer mt-5"/>
            <RouterLink to="/login">

            
            <div class="relative flex gap-2 cursor-pointer">
				<img src="https://source.unsplash.com/50x50/?portrait" alt="" class="w-10 h-10 border-4 rounded-full border-slate-300 mt-4 hover:cursor-pointer hover:border-secondary-color">
                <h2 class=" font-medium text-slate-300 text-md mt-6  hidden">Lorem Ipsum</h2>
			</div>
        </RouterLink>
        </div>
    </div>
   
</template>
<script setup>
    import {ref, watch} from 'vue'
    const is_showSearchPopUp = ref(false);
    
    const searchName = ref("");
    const offFocusSearchBar = () => {
    is_showSearchPopUp.value = ref(false);
    };


    watch(searchName, (newVal) => {
    if (newVal === "") {
        is_showSearchPopUp.value = false;
    } else {
        is_showSearchPopUp.value = true;
        console.log(newVal);
    }
    });
    const onFocusSearchBar = () => {
    if (searchName.value !== "") {
        is_showSearchPopUp.value = ref(true);
    }
    };
</script>
<style lang="">
    
</style>