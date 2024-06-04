<template>

        <fieldset class="border border-slate-700 rounded-md">
            <legend class="ml-10">Add Album</legend>  
            <div class="form-container  w-full p-10 h-full bg-dark-primary-color  flex flex-wrap justify-start gap-5  align-middle">
                
                <div v-for="item in genreInputField" :key="item.id" class="w-full sm:w-7/12   text-white">
                 
                    <input :type="item.type" :placeholder="item.label" :name="item.name" @blur="validateField(item.name)" v-model="genre[item.name]"  class="px-5  focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black" >
                    <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{ formErrors[item.name] }}</span>
                </div>
                <button
                      class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
                      type="submit" @click="addMusic">
                        Add  Genre
                    </button>
                      
                


      </div>
     </fieldset>

    </template>


<script>
import { ref } from 'vue';
import axios from 'axios';
import { mapState } from 'vuex';
export default{
    data(){
        return {
            genre: {
                name: '',
                
                },
                genreInputField:
                [
                    { id: '1', name: 'name', type: 'text', label: 'Name' },
                    ],

        formErrors:'',

        }
    },
    computed:{
            ...mapState(['genreData']),
            
        },
        mounted(){
            this.$store.dispatch('setGenreData')
        },
    methods:{

            validateField(fieldName){
                    this.formErrors.value[fieldName] = '';
            },
            addgenre(){
                        formErrors.value = {};
                        if(genre.value.name.length){
                            formErrors.value.description="Genre already exists.";
                        }

                        if (Object.keys(formErrors.value).length === 0) {
                            const RegisterSubmit = ()  => {
                            axios({
                                method: "post",
                                url: `http://127.0.0.1:8000/api/genre/post/`,
                                headers: {
                                "Content-Type": "application/json",
                                },
                                data: {
                                "name":  genre.name },
                            }).then(response => {
                                console.log(response)
                                if(response.status == 200){
                                            localStorage.setItem("refresh_token",response.data.refreshJWT);
                                            localStorage.setItem("access_token",response.data.accessJWT);
                                            this.$router.push('/dashboard')
                                }
                            }).catch(err => {
                                console.log(err.response.data)
                            });
                            }
                        }
            }
    }
}


</script>

<style scoped>

</style>