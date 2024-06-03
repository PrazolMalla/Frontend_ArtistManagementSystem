<template>
    <RouterLink to="/user-profile" class="bggradient flex align-middle border flex-wrap gap-5 p-3 my-5 rounded-md">
        <div class="flex  justify-center flex-col md:flex-row align-middle  gap-5 ">
            <img src="https://source.unsplash.com/800x800/?portrait"  class="w-40 h-40  m-auto rounded-full  align-middle" alt="">
            <div class="flex flex-col gap-2 rounded-md   justify-center text-center sm:text-left ">
                <div class="text-3xl text-blue-900">
                Batas
                </div>

                <div class="text-sm text-blue-600">
                    huri batas        
                </div>
                <div class="total justify-start flex">
                  <pre>2 Musics, 0 Likes </pre> 
                
                </div>
               
                </div>
            </div>
        
    </RouterLink>
</template>
<script>
export default{
    props:{
         cardData:Object
    },
    computed:{

    }
}
</script>
<style>
.bggradient {
        background: linear-gradient(45deg, rgba(255, 81, 109, 0.5), rgba(8, 7, 39, 0.5));    backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>