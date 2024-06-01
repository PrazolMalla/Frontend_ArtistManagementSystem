<template>
  <div class="min-h-screen flex flex-col bg-dark-primary-color">
    <main class="flex-1 p-6 bg-primary-color flex justify-end">
      <div class="bg-primary-color bg-opacity-75 p-8 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold mb-6 text-white text-center">Information</h1>

        <div class="card bg-light-primary-color text-white mb-8 text-center hover:bg-secondary-color">
          <h2 class="text-xl font-bold mb-2">Total Artists</h2>
          <p class="text-2xl">{{ totalArtists }}</p>
        </div>

        <div class="card bg-light-primary-color text-white  hover:bg-secondary-color mb-8 text-center">
          <h2 class="text-xl font-bold mb-2">Total Users</h2>
          <p class="text-2xl">{{ totalUsers }}</p>
        </div>

        <div class="card bg-light-primary-color text-white  hover:bg-secondary-color  mb-8 text-center">
          <h2 class="text-xl font-bold mb-2">Total Albums</h2>
          <p class="text-2xl">{{ totalAlbums }}</p>
        </div>

        <div class="card bg-light-primary-color text-white  hover:bg-secondary-color  mb-8 text-center">
          <h2 class="text-xl font-bold mb-2">Total Songs</h2>
          <p class="text-2xl">{{ totalSongs }}</p>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Dashboard',
  setup() {
    const totalArtists = ref(50);
    const totalUsers = ref(1500);
    const totalAlbums = ref(200);
    const totalSongs = ref(500);

    return {
      totalArtists,
      totalUsers,
      totalAlbums,
      totalSongs,
    };
  },
};
</script>

<style scoped>
.card {
  flex: 1;
  width: 20rem; /* Set width of each card */
}
</style>
