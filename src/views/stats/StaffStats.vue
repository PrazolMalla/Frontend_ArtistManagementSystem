<template>
  <PageLayout>
    <template #content>
      <div class="w-full h-screen bg-dark-primary-color flex flex-col">
        <div class="flex   flex-grow flex-wrap">
          <AdminStats/>
          <AdminData />
        </div>
          <NewTopFive />
      </div>
    </template>
  </PageLayout>
</template>

<script>
import AdminData from '@/components/stats/admin/AdminData.vue';
import AdminStats from '@/components/stats/admin/AdminStats.vue';
import NewTopFive from '@/components/stats/admin/NewTopFive.vue';

export default {
  name: 'AdminPage',
  components: {
    AdminData,
    AdminStats,
    NewTopFive
  }
}
</script>

