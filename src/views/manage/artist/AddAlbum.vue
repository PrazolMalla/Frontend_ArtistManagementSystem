<template>

    <PageLayoutWithPlayer>
    <template #content >

        <fieldset class="border border-slate-700 rounded-md">
            <legend class="ml-10">Add Album</legend>  
            <div class="form-container  w-full p-10 h-full bg-dark-primary-color  flex flex-wrap justify-start gap-5  align-middle">
                
                <div v-for="item in userInputField" :key="item.id" class="w-full sm:w-5/12   text-white">
                  <label :for="item.name" class="text-sm  font-helvetica text-slate-300 pl-3">
                        {{ item.label }}
                      </label>
                    <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="user[item.name]"  class="p-2  focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black" >
                    <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{ formErrors[item.name] }}</span>
                </div>
                   <div class="w-full sm:w-2/12  text-white flex flex-col mt-2">
                      <label for="img" class="cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50">Music Profile Pic</label>
                      <input type="file" id="img" name="profile" @change="handleFileChange"  class="hidden " >

                      <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{ formErrors.profile }}</span>
                    </div>

                    <div class="w-full sm:w-2/12  text-white flex flex-col mt-2">
                      <label for="img" class="cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50">Music Cover Pic</label>
                      <input type="file" id="img" name="profile" @change="handleFileChange"  class="hidden " >

                      <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{ formErrors.profile }}</span>
                    </div>


                    
                

                    <div class="w-full sm:w-2/12  text-white flex flex-col mt-2">
                      <label class="cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50">Artist: Prajwol</label>
                       </div>

                <div class="flex flex-col">
                  <select v-model="user.album" id="gender" name="album"
                    class="rounded-3xl  px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
                    <option value="" disabled>Album</option>
                    <option v-for="item in albumData">{{item.name}}</option>
                  </select>
                  <span v-if="formErrors.album" class="text-orange-300">{{ formErrors.album }}</span>
                </div>


                <div class="flex flex-col">
                  <select v-model="user.genre" id="gender" name="genre"
                    class="rounded-3xl  px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
                    <option value="" disabled>Genre</option>
                    <option v-for="item in genreData">{{item.name}}</option>
                  </select>
                  <span v-if="formErrors.gemre" class="text-orange-300">{{ formErrors.genre }}</span>
                </div>

                <div class="w-full text-center">
                  <input type="checkbox" class="w-5" v-model="isArtist" @change="updateIsArtist">
                  <label for="isArtist"  class=" p-2 text-slate-100 hover:text-secondary-color" >Are you adding this album as (XYZ)  Band?</label>
                </div>
                <div class="w-full flex justify-center gap-2 align-middle">
                      <button
                      class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
                      type="submit" @click="addAlbum">
                        Add Album
                    </button>
                </div>


      </div>
     </fieldset>
    </template>
    </PageLayoutWithPlayer>

    </template>


<script>
import { ref } from 'vue';
import axios from 'axios';
import { mapState } from 'vuex';
export default{
    data(){
        return {
            user: {
                name: '',
                description: '',
                language: '',
                release_at: '',
                album:'',
                artist:'',
                band:'',
                genre:'',
                description: '',
                img_profile: null,
                music_file: null,
                },
                user:"",
                userInputField:
                [
                    { id: '1', name: 'name', type: 'text', label: 'Name' },
                    { id: '2', name: 'description', type: 'text', label: 'Description' },
                    ],

        formErrors:'',

        }
    },
    computed:{
            ...mapState(['albumData', 'genreData']),
            
        },
        mounted(){
            this.$store.dispatch('setAlbumData')
            this.$store.dispatch('setGenreData')
        },
    methods:{
          validateField(fieldName){
                    formErrors.value[fieldName] = '';
            },
            addUser(){
                        formErrors.value = {};
                        if(user.value.name.length <5){
                            formErrors.value.name= "Username should be atleast 5 character long.";
                        }
                        if(user.value.first_name.length<5){
                            formErrors.value.description="Firstname should be atleast 5 characters long.";
                        }

                        if (Object.keys(formErrors.value).length === 0) {
                            const RegisterSubmit = ()  => {
                            axios({
                                method: "post",
                                url: `http://127.0.0.1:8000/api/user/post/`,
                                headers: {
                                "Content-Type": "application/json",
                                },
                                data: {
                                "email": user.email, "username":  user.username, "password": user.password, "firstname":  user.firstname, "lastname":  user.lastname, "dob": user.dob, "gender":  user.gender, "country": user.country, "img_profile": user.img_profile, "is_artist": user.is_artist
                                    },
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