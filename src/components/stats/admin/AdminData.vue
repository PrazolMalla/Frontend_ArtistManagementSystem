<template>
  <div class="min-h-screen flex flex-col bg-dark-primary-color">
    <main class="flex-1 p-6 bg-primary-color flex justify-end">
      <div class="bg-primary-color w-[20rem] bg-opacity-75 rounded-lg ml-24">
        <h1 class="text-3xl font-bold mb-6 mt-6 text-primary-text-color text-center">
          Information
        </h1>

        <div
          v-if="totalArtists !== null"
          class="p-5 rounded-md w-full bg-light-primary-color text-primary-text-color mb-8 text-center hover:bg-secondary-color hover:text-dark-primary-color cursor-pointer"
        >
          <h2 class="text-xl font-bold mb-2">Total Artists</h2>
          <p class="text-2xl">{{ totalArtists }}</p>
        </div>

        <div
          v-if="totalUsers !== null"
          class="p-5 rounded-md bg-light-primary-color text-primary-text-color hover:bg-secondary-color hover:text-dark-primary-color cursor-pointer mb-10 text-center"
        >
          <h2 class="text-xl font-bold mb-2">Total Users</h2>
          <p class="text-2xl">{{ totalUsers }}</p>
        </div>

        <div
          v-if="totalAlbums !== null"
          class="p-5 rounded-md bg-light-primary-color text-primary-text-color hover:bg-secondary-color hover:text-dark-primary-color cursor-pointer mb-10 text-center"
        >
          <h2 class="text-xl font-bold mb-2">Total Albums</h2>
          <p class="text-2xl">{{ totalAlbums }}</p>
        </div>

        <div
          v-if="totalSongs !== null"
          class="p-5 rounded-md bg-light-primary-color text-primary-text-color hover:bg-secondary-color hover:text-dark-primary-color cursor-pointer selection mb-10 text-center"
        >
          <h2 class="text-xl font-bold mb-2">Total Songs</h2>
          <p class="text-2xl">{{ totalSongs }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
const base_url  = import.meta.env.VITE_BASE_API_URL;

export default {
  name: 'Dashboard',
  setup() {
    const totalArtists = ref(null);
    const totalUsers = ref(null);
    const totalAlbums = ref(null);
    const totalSongs = ref(null);

    const fetchData = async () => {
      try {
        const [artistResponse, userResponse, albumResponse, songResponse] = await Promise.all([
          axios.get(`${base_url}/api/user/artist-count/`),
          axios.get(`${base_url}/api/user/user-count/`),
          axios.get(`${base_url}/api/album/album-count/`),
          axios.get(`${base_url}/api/music/music-count`)
        ]);
        
        totalArtists.value = artistResponse.data.total_artists;
        totalUsers.value = userResponse.data.total_users;
        totalAlbums.value = albumResponse.data.total_albums;
        totalSongs.value = songResponse.data.total_music;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      totalArtists,
      totalUsers,
      totalAlbums,
      totalSongs
    };
  }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
