<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <DetailCard  info="Artist" :id="id"/>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import  DetailCard from '@/components/cards/DetailCard.vue'
export default{
    data(){
            return{
                id : this.$route.params.id
            }
        },
  components:{
    DetailCard
  }

}

</script>