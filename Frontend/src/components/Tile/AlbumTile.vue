<template>

    <RouterLink :to="'/album/'+ albumDetail.id" class="tile-container max-w-56 p-0 overflow-hidden rounded-lg border hover:border-blue-200   shadow-md shadow-blue-300 hover:shadow-blue-400  cursor-pointer">
        <img src="../../assets/default_album.png"  alt="" srcset="">
        <div class="p-3"> {{ albumDetail.name }}</div>

    </RouterLink>
</template>
<script>
export default{
    props:{
        albumDetail: Object,
    }
}
</script>