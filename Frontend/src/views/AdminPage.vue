<template>
  <PageLayout>
    <template #content>
      <div class="w-full h-screen bg-dark-primary-color flex flex-col">
        <!-- Main stats and data section -->
        <div class="flex flex-grow">
          <AdminStats class="w-3/4" />
          <AdminData class="w-1/4" />
        </div>
        <!-- NewSong section -->
        <div class="flex-shrink-0">
          <NewSong />
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script>
import AdminData from '@/components/AdminData.vue';
import AdminStats from '@/components/AdminStats.vue';
import NewSong from '@/components/NewSong.vue';

export default {
  name: 'AdminPage',
  components: {
    AdminData,
    AdminStats,
    NewSong
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
