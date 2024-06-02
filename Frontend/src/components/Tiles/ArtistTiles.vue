<template>
    <div class="flex gap-4 flex-wrap flex-grow justify-center ">
    <ArtistTile v-for="x in artists" class="p-5" :artistDetail="x"/>

    </div>

</template>


<script>
import ArtistTile from '../Tile/ArtistTile.vue'
export default{
    components:{
        ArtistTile
    },
    data(){
            return {
                    artists:[{
                        id:1,
                        name:"Kaha xau ra"
                    },
                    {
                        id:2,
                        name:"Kaha xau re"
                    },
                    {
                        id:3,
                        name:"Kaha xainau ra"
                    },
                    {
                        id:4,
                        name:"Kaha xainau re?"
                    },{
                        id:5,
                        name:"Kaha xau ra"
                    },
                    {
                        id:6,
                        name:"Kaha xau re"
                    },
                    {
                        id:7,
                        name:"Kaha xainau ra"
                    },
                    {
                        id:8,
                        name:"Kaha xainau re?"
                    },{
                        id:9,
                        name:"Kaha xau ra"
                    },
                    {
                        id:10,
                        name:"Kaha xau re"
                    },
                    {
                        id:11,
                        name:"Kaha xainau ra"
                    },
                    {
                        id:12,
                        name:"Kaha xainau re?"
                    },{
                        id:13,
                        name:"Kaha xau ra"
                    },
                    {
                        id:14,
                        name:"Kaha xau re"
                    },
                    {
                        id:15,
                        name:"Kaha xainau ra"
                    },
                    {
                        id:16,
                        name:"Kaha xainau re?"
                    },
            ]
            }
    }
}

</script>