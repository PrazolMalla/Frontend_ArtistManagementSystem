<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
      <div class="flex flex-col gap-3 mb-5">
        <div class="flex gap-2 flex-wrap">
          <GenreCard text="All" @action="getAllGenreMusic" />
          <GenreCard v-for="genre in genreData" @action="getGenreMusic(genre.id)" :text="genre.name" />
        </div>
      </div>
      <div class="flex gap-4 flex-wrap flex-grow justify-center">
        <MusicCard v-for="music in musicData" :key="music.id" class="p-5" :musicData="music" linkto="music" />
      </div>
    </template>
  </PageLayoutWithPlayer>
</template>
<script setup>
import GenreCard from '@/components/cards/GenreCard.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MusicCard from '@/components/cards/MusicCard-2.vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const musicData = ref([]);
const genreData = ref([]);
const base_url = import.meta.env.VITE_BASE_API_URL;

const fetchGenreAll = () => {
  axios.get(`${base_url}/api/genre/get/`)
    .then(response => {
      genreData.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching genre data:', error);
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
  if (route.params.id) getGenreMusic(route.params.id)
  else getAllGenreMusic();
  fetchGenreAll();
});
</script>