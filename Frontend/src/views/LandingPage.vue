<template>
    <PageLayout>
      <template #content >
        <div class="sm:ml-[25vw] lg:ml-[15vw] px-8  mt-20 text-slate-300 ">
         <TopArtist/>
          
        </div>
    </template>
    </PageLayout>
  </template>
  
  <script>
  import TopArtist from '@/components/TopArtist.vue';
  export default {
  name: 'AdminPage',
  components: {
    TopArtist,
  }
}
  
  </script>