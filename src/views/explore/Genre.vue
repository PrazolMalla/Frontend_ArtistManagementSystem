<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
      <div class="flex flex-col gap-3">
      <div class="text-4xl">Genre</div>
       <div class="flex gap-2">
          <div class="flex flex-col bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-white border border-blue-500 hover:text-blue-500 text-white" @click="getAllGenreMusic">All</div>
          <div class="flex flex-col bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-white border border-blue-500 hover:text-blue-500 text-white" v-for="genre in genreData" @click="getGenreMusic(genre.id)">
          {{ genre.name }}
          </div>
        </div>
      </div>
      <div class="flex gap-4 flex-wrap flex-grow justify-center">
        <MusicCard v-for="music in musicData" :key="music.id" class="p-5" :musicData="music" linkto="music"/>
      </div>
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