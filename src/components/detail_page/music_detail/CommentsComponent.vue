<template lang="">
    <div class="mt-5 bg-light-primary-color h-[50vh] w-[80vw] p-6 lg:w-[30vw] md:h-[55vh]  overflow-y-scroll overflow-x-hidden mb-20 md:w-[65vw]">
        <h1 class=" mb-4 text-2xl font-semibold md:w-[60vw]">Comments</h1>
        <div class="flex items-center gap-5">
            <img :src="currentUser.profileImg" alt="" class="w-14 h-14 border-4 rounded-full border-slate-300 mt-4 hover:cursor-pointer hover:border-secondary-color"> 
            <form class="flex flex-col gap-2">
                <textarea  class="h-9 lg:w-[20vw] w-[40vw] bg-transparent border-b-2 border-secondary-color focus:outline-none" placeholder="Add comment"></textarea>
                <button type="submit" class=" bg-secondary-color w-20  h-10 text-slate-100 rounded-sm text-sm font-semibold lg:w-20 lg:h-10  hover:border-2 hover:bg-transparent hover:border-secondary-color hover:text-secondary-color">Comment</button>
            </form>
            
        </div>
        
        <div v-for="(commenter, index) in commenters" :key="index">
            <div class="flex justify-start items-center gap-2 mt-2">
                <img :src="commenter.profileImg" alt="" class="w-14 h-14 border-4 rounded-full border-slate-300 mt-4 hover:cursor-pointer hover:border-secondary-color"> 
                <div class="flex flex-col justify-center mt-4 h-24 text-wrap">
                    <h2 class="text-lg font-medium">{{commenter.username}}</h2>
                    <p class="">{{commenter.comment}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    const commenters = ref([
    { id: '1',profileImg:"https://source.unsplash.com/50x50/?portrait",username:"Prazol",comment:"great music touched my heartfkgjsdkgjdslkdsjgk ldgsjkdsfhdjshfdjihfdskjhfdsjkhjdfshfds"  },
    { id: '2', profileImg:"https://source.unsplash.com/50x50/?portrait",username:"Bishal",comment:"Best song" },
    { id: '3', profileImg:"https://source.unsplash.com/50x50/?portrait",username:"Nirmal",
    comment:"touched my heart"
    },
    { id: '4', profileImg:"https://source.unsplash.com/50x50/?portrait",username:"Nirmal",
    comment:"touched my hear dajhfsajhfdas fjsahjasfdhjkasfhjjksfan jsdfhjk"
    },
    { id: '5', profileImg:"https://source.unsplash.com/50x50/?portrait",username:"Nirmal",
    comment:""
    },
    
]);
const currentUser = ref({
    profileImg:"https://source.unsplash.com/50x50/?portrait",
    });
</script>
<style lang="">
    
</style>