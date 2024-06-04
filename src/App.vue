<template>
  <div class="w-full bg-dark-primary-color">
    <RouterView />
  </div>

 
</template>

<script setup>
import axios from 'axios';
    import { onMounted } from 'vue';
    import {RouterView } from 'vue-router';
    onMounted(async () => {
        if(localStorage.getItem("refresh_token")){
                    axios.post(`http://127.0.0.1:8000/api/token/refresh/`, {'refresh': localStorage.getItem("refresh_token")}, {
                    headers: {
                    "content-Type": "application/json",
                    }}).then(response =>{
                        if(response.status == 200){
                            localStorage.setItem("access_token",response.data.access);
                            let data = jwtDecode(response.data.access)
                            console.log(data.user_id)
                            localStorage.setItem("userId", data.user_id)
                            router.push('/')
                        }
                        else{
                            router.push('/login')

                        }
                    })
                }
    });

</script>


<style scoped>


</style>
