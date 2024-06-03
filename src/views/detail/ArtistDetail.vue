<template>
  <PageLayout id="display-flex">
    <template #content>
       <DetailCard  info="Artist" :id="id"/>
    </template>
  </PageLayout>
</template>

<script>
import  DetailCard from '@/components/cards/card_item/DetailCard.vue'
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