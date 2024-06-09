<template>
    <RouterLink :to="'band/'+ bandDetail.id" class="transform hover:scale-105 transition-transform duration-300 cursor-pointer" >
        <div class="flex flex-col gap-2  items-center p-4 overflow-x-hidden">
          <div
            class="w-28 h-28  rounded-full flex justify-center items-center bandGradient" >
            <img
              :src="bandDetail.img_profile"
              alt="Band Image"
              class="bandPic rounded-full object-cover border-none bg-secondary-color z-10"
            />
          </div>
          <div class="text-center">
          <h3 class="text-md font-semibold text-center">{{ bandDetail.firstname }} {{ bandDetail.lastname }}</h3>
          <p class="text-sm text-gray-600">@{{ bandDetail.username }}</p>

          </div>
        </div>
      </RouterLink>
</template>
<script>
export default{
    props:{
        bandDetail: Object,
    }
}
</script>

<style scoped>


.bandGradient {
  background: linear-gradient(45deg, #ff4000bb, #ece6d59d);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.bandPic{
  width: 102px;
  height: 1/1;
}

@media (min-width: 768px) {
  .band-card {
    width: calc(33.33% - 1rem);
  }
}

@media (min-width: 1024px) {
  .band-card {
    width: calc(25% - 1rem);
  }
}
</style>

