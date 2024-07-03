<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <MusicTiles/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import MusicCard from '@/components/cards/MusicCard.vue'
import axios from 'axios'
const base_url  = import.meta.env.VITE_BASE_API_URL;

export default {
  components: {
    MusicCard
  },
  data() {
    return {
      musicData: []
    }
  },
  mounted() {
    this.fetchMusicData()
  },
  methods: {
    fetchMusicData() {
      axios
        .get(`${base_url}/api/music/get/`)
        .then((response) => {
          this.musicData = response.data
        })
        .catch((error) => {
          console.error('Error fetching music data:', error)
        })
    }
  }
}
</script>