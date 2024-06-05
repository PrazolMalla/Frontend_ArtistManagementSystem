<template>
  <PageLayout>
    <template #content>
        <TopArtist />
        <TopAlbum />
        <TopMusic/>
    </template>
  </PageLayout>
</template>

<script>
import TopArtist from '@/components/home/TopArtist.vue'
import TopAlbum from '@/components/home/TopAlbum.vue'
import TopMusic from '@/components/home/TopMusic.vue';
export default {
  name: 'AdminPage',
  components: {
    TopArtist,
    TopAlbum,
    TopMusic
  }
}
</script>
