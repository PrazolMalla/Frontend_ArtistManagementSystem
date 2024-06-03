<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
       <DetailCard  info="Music" :id="id"/>
    </template>
  </PageLayoutWithPlayer>
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