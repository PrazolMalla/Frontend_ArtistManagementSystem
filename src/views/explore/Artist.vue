<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <ArtistTiles/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import ArtistCard from '@/components/cards/ArtistCard.vue'
import axios from 'axios'
const base_url  = import.meta.env.VITE_BASE_API_URL;

export default {
  components: {
    ArtistCard
  },
  data() {
    return {
      artistData: []
    }
  },
  mounted() {
    this.fetchArtistData()
  },
  methods: {
    fetchArtistData() {
      axios
        .get(`${base_url}/api/artist/get/`)
        .then((response) => {
          this.artistData = response.data
        })
        .catch((error) => {
          console.error('Error fetching artist data:', error)
        })
    }
  }
}
</script>