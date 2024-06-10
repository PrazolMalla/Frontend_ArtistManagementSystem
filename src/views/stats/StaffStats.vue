<template>
  <PageLayout>
    <template #content>
      <div class="  bg-dark-primary-color flex flex-col">
        <MapShow />
        <div class="flex flex-grow flex-wrap">
          <AdminStats />
          <AdminData />
        </div>
      
      </div>
    </template>
  </PageLayout>
</template>

<script>
import AdminData from '@/components/stats/admin/AdminData.vue';
import AdminStats from '@/components/stats/admin/AdminStats.vue';

import MapShow from '@/components/MapShow.vue';

export default {
  name: 'ArtistPage',
  components: {
    AdminData,
    AdminStats,
    
    MapShow
  }
}
</script>
