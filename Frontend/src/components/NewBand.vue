<template>
  <div class="bg-secondary-color p-4 pl-16 text-white rounded w-96">
    <h2 class="text-xl font-bold mb-4">New Bands</h2>
    <div class="max-h-64 overflow-y-auto">
      <div v-for="(band, index) in newBands" :key="index" class="flex items-center mb-2  hover:text-button-color">
        <img :src="band.bandPhoto" :alt="band.bandName" class="w-12 h-12 rounded-full mr-2">
        <div>
          <div>{{ band.bandName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const newBands = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    newBands.value = response.data.map(user => ({
      bandName: user.name,
      bandPhoto: `https://i.pravatar.cc/150?u=${user.id}`
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>
