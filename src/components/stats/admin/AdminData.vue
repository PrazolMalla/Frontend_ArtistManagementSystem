<template>
  <div class="min-h-screen  flex flex-col bg-dark-primary-color">
    <main class="flex-1 p-6 bg-primary-color flex justify-end">
      <div class="bg-primary-color w-[20rem] bg-opacity-75 p-8 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold mb-6 mt-6 text-white text-center">Information</h1>

        <div class="p-5 rounded-md w-full bg-light-primary-color text-white mb-8 text-center hover:bg-secondary-color">
          <h2 class="text-xl font-bold mb-2">Total Artists</h2>
          <p class="text-2xl">{{ totalArtists }}</p>
        </div>

        <div class="p-5 rounded-md  bg-light-primary-color text-white  hover:bg-secondary-color mb-10 text-center">
          <h2 class="text-xl font-bold mb-2">Total Users</h2>
          <p class="text-2xl">{{ totalUsers }}</p>
        </div>

        <div class="p-5 rounded-md  bg-light-primary-color text-white  hover:bg-secondary-color  mb-10 text-center">
          <h2 class="text-xl font-bold mb-2">Total Albums</h2>
          <p class="text-2xl">{{ totalAlbums }}</p>
        </div>

        <div class="p-5 rounded-md  bg-light-primary-color text-white  hover:bg-secondary-color  mb-10 text-center">
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
      totalSongs,
    };
  },
};
</script>

<style scoped>

</style>
