<template>
  <RouterLink
    :to="'artist/' + artistDetail.id"
    class="transform hover:scale-105 transition-transform duration-300 cursor-pointer"
  >
    <div class="flex flex-col gap-2 items-center p-4 overflow-x-hidden">
      <div class="w-28 h-28 rounded-full flex justify-center items-center artistGradient">
        <img
          :src="`http://127.0.0.1:8000${artistDetail.img_profile}`"
          alt="Artist Image"
          class="artistPic rounded-full object-cover border-none bg-secondary-color z-10"
        />
      </div>
      <div class="text-center">
        <h3 class="text-md font-semibold text-center">
          {{ artistDetail.firstname }} {{ artistDetail.lastname }}
        </h3>
        <p class="text-sm text-gray-600">@{{ artistDetail.username }}</p>
      </div>
    </div>
  </RouterLink>
</template>
<script>
export default {
  props: {
    artistDetail: Object
  }
}
</script>

<style scoped>
.artistGradient {
  background: linear-gradient(45deg, #ff4000bb, #ece6d59d);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.artistPic {
  width: 102px;
  height: 1/1;
}

@media (min-width: 768px) {
  .artist-card {
    width: calc(33.33% - 1rem);
  }
}

@media (min-width: 1024px) {
  .artist-card {
    width: calc(25% - 1rem);
  }
}
</style>
