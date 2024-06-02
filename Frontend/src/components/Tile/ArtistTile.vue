<template>

  <RouterLink :to="'/artist/'+ artistDetail.id" class="tile-container max-w-56 p-0 overflow-hidden rounded-lg border hover:border-blue-200   shadow-md shadow-blue-300 hover:shadow-blue-400  cursor-pointer">
        <img src="../../assets/default_artist.jpg"  alt="" srcset="">
    <div class="p-3"> {{ artistDetail.name }}</div>

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