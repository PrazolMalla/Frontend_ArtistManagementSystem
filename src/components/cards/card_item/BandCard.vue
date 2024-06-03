<template>

    <RouterLink :to="'/album/'+ bandDetail.id" class="tile-container  max-w-56 p-0 overflow-hidden rounded-lg   gap-2 shadow-sm shadow-slate-500 hover:shadow-md hover:shadow-slate-600  cursor-pointer">
         <img src="https://source.unsplash.com/800x800/?portrait" alt="" class="w-full rounded-md hover:cursor-pointer ">
            <div class="p-3 text-center"> {{ bandDetail.name }}</div>

    </RouterLink>
</template>
<script>
export default{
    props:{
       bandDetail: Object,
    }
}
</script>