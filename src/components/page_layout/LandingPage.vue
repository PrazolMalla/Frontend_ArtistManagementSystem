<template>
  <PageLayout>
    <template #content>
      <div class="sm:ml-[25vw] lg:ml-[15vw] px-8 mt-20 text-primary-text-color">
        <TopArtist />
        <TopAlbum />
      </div>
    </template>
  </PageLayout>
</template>

<script>
import TopArtist from '@/components/TopArtist.vue'
import TopAlbum from '@/components/TopAlbum.vue'
export default {
  name: 'AdminPage',
  components: {
    TopArtist,
    TopAlbum
  }
}
</script>
