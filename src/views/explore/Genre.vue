<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       Genre Esma Auxaa laa.
    </template>
  </PageLayoutWithPlayer>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MusicCard from '@/components/cards/MusicCard-2.vue';

const musicData = ref([]);
const genreData = ref([]);
const base_url  = import.meta.env.VITE_BASE_API_URL;

const fetchGenreAll = () => {
  axios.get(`${base_url}/api/genre/get/`)
    .then(response => {
      genreData.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching genre data:', error);
    });
};

const fetchMusicData = () => {
  axios.get(`${base_url}/api/music/get/genre/1`)
    .then(response => {
      musicData.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching music data:', error);
    });
};

const getAllGenreMusic = () => {
  axios.get(`${base_url}/api/music/get/genre/`)
    .then(response => {
      musicData.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching Genere data:', error);
    });
};

const getGenreMusic = (id) => {
  axios.get(`${base_url}/api/music/get/genre/${id}`)
    .then(response => {
      musicData.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching music data:', error);
    });
};

onMounted(() => {
  fetchMusicData();
  fetchGenreAll();
});
</script>