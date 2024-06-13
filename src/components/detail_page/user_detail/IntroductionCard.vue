<template lang="">
    <div class="mt-5 w-[80vw] h-40 bg-light-primary-color p-5 md:w-56 md:h-40 md:mt-20 lg:mt-24 lg:w-96 lg:h-52 lg:p-6 rounded-md sm:mt-10">
        <h1 class="font-semibold text-slate-300 lg:text-lg">INTRODUCTION</h1>
        <div class="mt-2">
            <p class="text-sm text-slate-300 lg:text-lg">Name: {{user.stageName}}</p>
            <p class="mt-1 text-sm text-slate-300 lg:text-lg">Country: {{user.country}}</p>
            <p class="mt-1 text-sm text-slate-300 lg:text-lg">Bio: {{user.bio}}</p>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
    const user = ref({
        stageName:"Prazol",
        country:"Nepal",
        bio:"Hello My name is Prazol Malla i am CSIT"
    })
</script>
<style lang="">
    
</style>