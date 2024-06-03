<template lang="">
    <div class=" fixed lg:w-[85vw] md:w-[75vw] sm:ml-[25vw] lg:ml-[15vw] sm:h-16 bg-dark-primary-color h-16 w-full flex px-8 justify-between sm:px-16 z-40">
        <div class="flex gap-4 sm:gap-8">
            <RouterLink to="/">
            <h1 class=" text-slate-300 font-semibold text-2xl mt-4 hover:text-secondary-color cursor-pointer">MUSICA</h1>

            </RouterLink>
            <div class="hidden md:flex lg:w-[40vw] my-4  justify-between border border-slate-500 rounded-full">
                <input type="text" class="text-sm border-none w-full p-4 bg-transparent focus:outline-none text-xsm  text-slate-300 hidden sm:flex" placeholder="Search Music, Artist, Album, Band ..."
                      v-model="searchName"      
                    @blur="offFocusSearchBar"
                    @focus="onFocusSearchBar" />
                    <v-icon name="md-search"  fill="#cbd5e1" scale="1.5" class=" cursor-pointer hover:text-gray-950 p-1" />
                
            </div>
             <div
                v-if="is_showSearchPopUp"
                class="bggradient z-30 searchField absolute  z-2 sm:ml-50 w-5/6 h-20 top-20  rounded-lg"
                ></div>
                <div
                v-if="is_showNotificationPopUp"
                class="bggradient z-30 searchField absolute  z-2 w-5/6 sm:w-3/6 sm:right-10 h-20 top-20 rounded-lg"
                ></div>


        </div>
        <div class="flex gap-4">

            <div class="flex md:hidden">
                <v-icon name="md-search"  fill="#cbd5e1" scale="1.5" class="cursor-pointer mt-5" />

            </div>
                
            <v-icon name="md-notifications-outlined" fill="#cbd5e1" scale="1.5" class=" cursor-pointer mt-5"
                @click = "toggleNotification"
            />
            


            <RouterLink to="/user-profile">

            
            <div class="relative flex gap-2 cursor-pointer">
				<img :src="user.profileImg" alt="" class="w-10 h-10 border-4 rounded-full border-slate-300 mt-4 hover:cursor-pointer hover:border-secondary-color">
                <h2 class=" font-medium text-slate-300 text-md mt-6 sm:flex hidden">{{user.username}}</h2>

			</div>
        </RouterLink>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return {
            user: {
                profileImg:"https://source.unsplash.com/50x50/?portrait",
                username:"Prazol"
            },
            is_showNotificationPopUp : false,
            searchName :"",          
            is_showSearchPopUp: false,
        }
    },
    watch: {
            getData(newVal){
                this.userData = newVal.resData
            },
            searchName(newVal) {
            if (newVal == "") {
                this.is_showSearchPopUp = false;
            } else {
                this.is_showSearchPopUp = true;
                console.log(newVal);
            }
        },
    },
    methods:{
        offFocusSearchBar() {
        this.is_showSearchPopUp = false;
        },
        onFocusSearchBar() {
        this.is_showNotificationPopUp = false;
        if (this.searchName != "") {
            this.is_showSearchPopUp = true;
        }
        },
        toggleNotification(){
            this.is_showSearchPopUp = false;
            this.is_showNotificationPopUp = !this.is_showNotificationPopUp;
        }
    }

}
</script>
<style>

.bggradient {
        background: linear-gradient(45deg, rgba(255, 81, 109, 0.7), rgba(8, 7, 39, 0.7));    backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
}
    
</style>