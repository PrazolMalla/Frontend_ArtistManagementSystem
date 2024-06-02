<template>

  <RouterLink :to="'/artist/'+ artistDetail.id" class="tile-container  max-w-56 p-0 overflow-hidden rounded-full   gap-2 shadow-sm shadow-slate-500 hover:shadow-md hover:shadow-slate-600  cursor-pointer">
            <img src="https://source.unsplash.com/800x800/?portrait" alt="" class="w-full rounded-full hover:cursor-pointer ">
            <div class="p-3 text-center"> {{ artistDetail.username }}</div>

  </RouterLink>
</template>
<script>
// import imgSrc from '../../assets/default_album.png' 
export default{
    props:{
        artistDetail: Object,
    }
}
</script>