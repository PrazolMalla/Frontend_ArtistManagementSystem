<template>
        <fieldset class="border border-slate-700 rounded-md  fixed sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 m-auto">
            <legend class="ml-10">Add Music</legend>  
            <v-icon name="fa-times" fill="#302f31" scale="1" @click="closeAdd" class="absolute right-3 cursor-pointer "/>
            <div class="form-container  w-full p-10 h-full flex flex-wrap justify-center gap-5  align-middle">
                
                <div v-for="item in musicInputField" :key="item.id" class="w-full sm:w-5/12   text-secondary-color">
                  <label :for="item.name" class="text-sm  font-helvetica text-primary-text-color pl-3">
                        {{ item.label }}
                      </label>
                    <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="track[item.name]"  class="p-2  focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black" >
                    <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{ formErrors[item.name] }}</span>
                </div>
                   <div class="w-full sm:w-2/12  text-secondary-color flex flex-col mt-2">
                      <label for="profile" class="cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50">Music Profile Pic</label>
                      <input type="file" id="profile" name="profile" @change="handleProfileChange"  class="hidden " >
                    <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{
                      formErrors.profile
                    }}</span>
                  </div>
                    <div class="w-full sm:w-2/12  text-secondary-color flex flex-col mt-2">
                      <label for="music" class="cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50">File(mp3/mp4)</label>
                      <input type="file" id="music" name="track" @change="handleFileChange"  class="hidden " >

                      <span v-if="formErrors.file" class="text-orange-300 mt-1 pl-3 block text-sm">{{ formErrors.file }}</span>
                    </div>

                <div class="flex flex-col">
                  <select v-model="track.album" id="gender" name="album"
                    class="rounded-3xl  px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
                    <option value="" disabled>Album</option>
                    <option v-for="item in albumData" :value="item.id">{{item.name}}</option>
                  </select>
                  <span v-if="formErrors.album" class="text-orange-300">{{ formErrors.album }}</span>
                </div>


                <div class="flex flex-col">
                  <select v-model="track.genre" id="gender" name="genre"
                    class="rounded-3xl  px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
                    <option value="" disabled>Genre</option>
                    <option v-for="item in genreData">{{item.name}}</option>
                  </select>
                  <span v-if="formErrors.genre" class="text-orange-300">{{ formErrors.genre }}</span>
                </div>
                <!-- <div class="w-full text-center">
                  <input type="checkbox" class="w-5" v-model="isArtist" @change="updateIsArtist" />
                  <label for="isArtist" class="p-2 text-primary-text-color hover:text-secondary-color"
                    >Are you adding this music as (XYZ) Band?</label
                  >
                </div> -->
                <div class="w-full flex justify-center gap-2 align-middle">
                      <button
                      class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
                      type="submit" @click="addMusic()">
                        Add Music
                    </button>
                </div>


      </div>
     </fieldset>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { useToast } from 'vue-toast-notification'
const $toast = useToast()

import {defineEmits } from 'vue';
const emit = defineEmits(['close']);
function closeAdd() {
  emit('close');
}

const store = useStore();
const albumData = computed(() => store.state.albumData);
const genreData = computed(() => store.state.genreData);
onMounted(() => {
  store.dispatch('setAlbumData');
  store.dispatch('setGenreData');
});

const access_token = localStorage.getItem('access_token');
const musicInputField = ref([
  { id: '1', name: 'name', type: 'text', label: 'Name' },
  { id: '2', name: 'description', type: 'text', label: 'Description' },
  { id: '3', name: 'language', type: 'text', label: 'Language' },
  { id: '3', name: 'release_at', type: 'date', label: 'Released At' }, 
]);
const track = ref({
  name: '',
  description: '',
  language: '',
  release_at: '',
  genre:'',
  album:'',
  artist:'',
  band:'',
  release_at:'',
  is_released:false,
  lyrics:null
});
const formErrors = ref({});
const profileFile = ref(null)
const musicFile = ref(null)
const handleProfileChange = (event) => {
  profileFile.value = event.target.files[0];
};
const handleFileChange = (event) => {
  musicFile.value = event.target.files[0];
};
const validateField = (fieldName) => {
  formErrors.value[fieldName] = '';

  // if (fieldName === 'name' && track.value.name.length < 1) {
  //   formErrors.value.name = "Name is required";
  // }
  // if (fieldName === 'description' && track.value.password<1) {
  //   formErrors.value.description = "Description is required";
  // }
};
const addMusic = () => {
  formErrors.value = {};
  if (!track.value.name) {
    formErrors.value.name = "Please provide a name.";
  }
  if (!track.value.description) {
    formErrors.value.description = "Please provide a description";
  }
  
  if (!track.value.release_at) {
    formErrors.value.release_at = "Please provide an released date.";
  }
  if (Object.keys(formErrors.value).length === 0) {
    const formData = new FormData();
    const today = new Date();
    const releaseDate = new Date(track.value.release_at);
    formData.append('name', track.value.name);
    formData.append('description', track.value.description);
    formData.append('language', track.value.language);
    formData.append('release_at', track.value.release_at);
    if (track.value.genre=="") {
      formData.append('genre', null);
    }
    if (track.value.album=="") {
     formData.append('album', null);
    }
    formData.append('artist', track.value.artist);
    formData.append('band', track.value.band);
    formData.append('lyrics', track.value.lyrics);
    if(releaseDate<=today){
      track.value.is_released=true
    }else{
      track.value.is_released=false
    }
    formData.append('is_released', track.value.is_released);
    if (profileFile.value) {
      formData.append('img_profile', profileFile.value); 
    }
    if (musicFile.value) {
      formData.append('music_file', musicFile.value); 
    }
    axios.post('http://127.0.0.1:8000/api/music/post/', formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        
      }
    })
        .then(response => {
            $toast.success("Music added successfully");
            closeAdd();
        })
        .catch(error => {
            console.error(error);
            $toast.error("Error occur while adding music");

        });
  }
}
</script>
