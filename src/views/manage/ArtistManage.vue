<template>
  <PageLayout>
    <template #content>
          <AddMusic/>
          <AddAlbum />
          <div class="allbar border">
              <div class="header"> 
                <p>Manage Artist</p>
              </div>
          </div>
    </template>
  </PageLayout>
</template>

<script>
import AddMusic from '@/components/manage/AddMusic.vue';
import AddAlbum from '@/components/manage/AddAlbum.vue';

export default {
  name: 'AdminPage',
  components: {
    AddMusic,
    AddAlbum
  }
}
</script>