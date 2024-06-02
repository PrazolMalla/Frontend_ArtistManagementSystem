<template>

    <RouterLink :to="'/music/'+ musicDetail.id" class="tile-container max-w-56  rounded-lg border hover:border-blue-200  p-0 overflow-hidden shadow-md shadow-blue-300 hover:shadow-blue-400  cursor-pointer">
        <img src="../../assets/default_music.png"  alt="" srcset="">
    <div class="p-3"> {{ musicDetail.name }}</div>

    </RouterLink>
</template>
<script>
// import imgSrc from '../../assets/default_album.png' 
export default{
    props:{
        musicDetail: Object,
    }
}
</script>