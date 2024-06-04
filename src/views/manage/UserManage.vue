<template>
  <PageLayout>
    <template #content>
          <AddGenre/>
    </template>
  </PageLayout>
</template>

<script>
import AddGenre from '@/components/manage/AddGenre.vue';
export default {
  name: 'AdminPage',
  components: {
    AddGenre,
  }
}
</script>