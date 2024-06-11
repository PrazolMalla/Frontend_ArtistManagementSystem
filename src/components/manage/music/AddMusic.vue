<template>
  <fieldset
    class="border border-slate-700 rounded-md absolute sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 m-auto"
  >
    <legend class="ml-10">Add Music</legend>
    <v-icon
      name="fa-times"
      fill="#302f31"
      scale="1"
      @click="closeAdd"
      class="absolute right-3 cursor-pointer"
    />
    <div class="form-container w-full border p-10 h-full flex flex-wrap justify-center gap-5 align-middle">
      <div
        v-for="item in musicInputField"
        :key="item.id"
        class="w-full sm:w-5/12 text-secondary-color"
      > 
        <label :for="item.name" class="text-sm font-helvetica text-primary-text-color pl-3">
          {{ item.label }}
        </label>
        <input
          :type="item.type"
          :name="item.name"
          @blur="validateField(item.name)"
          v-model="track[item.name]"
          class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
        />
        <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
          formErrors[item.name]
        }}</span>
      </div>
      <div class="w-full sm:w-2/12 text-secondary-color flex flex-col mt-2">
        <label
          for="profile"
          class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-20 items-center  text-sm text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }"
          >
          <p class="bottom-0 w-full bg-secondary-color text-white absolute ">Select Profile
            <v-icon
              name="fa-times"
              fill="#ffffff"
              scale="1"
              @click="removeProfile"
              class="absolute right-3 cursor-pointer"
              v-if="profileFile"/>
          </p>
          
       </label>
        <input
          type="file"
          id="profile"
          name="profile"
          @change="handleProfileChange"
          class="hidden"
        />
        <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{
          formErrors.profile
        }}</span>
      </div>
      <div class="w-full sm:w-2/12 text-secondary-color flex flex-col mt-2">
        <label
          for="music"
          class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-20 items-center  text-sm text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          :style="{ backgroundImage: `url(${musicSelected})`, backgroundSize: 'cover' }"
          
          ><p class="bottom-0 w-full bg-secondary-color text-white absolute ">Select File(mp3/mp4)
            <v-icon
              name="fa-times"
              fill="#ffffff"
              scale="1"
              @click="removefile"
              class="absolute right-1 cursor-pointer"
              v-if="musicFile"/>
          </p></label
        >
        <input type="file" id="music" name="track" @change="handleFileChange" class="hidden" />

        <span v-if="formErrors.file" class="text-orange-300 mt-1 pl-3 block text-sm">{{
          formErrors.file
        }}</span>
      </div>

      <div class="flex flex-col">
        <select
          v-model="track.album"
          id="gender"
          name="album"
          class="rounded-3xl px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50"
        >
          <option value="" disabled>Album</option>
          <option v-for="item in albums" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
        <span v-if="formErrors.album" class="text-orange-300">{{ formErrors.album }}</span>
      </div>

      <div class="flex flex-col">
        <select
          v-model="track.genre"
          id="gender"
          name="genre"
          class="rounded-3xl px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50"
        >
          <option value="" disabled>Genre</option>
          <option v-for="item in genreData" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
        <span v-if="formErrors.gemre" class="text-orange-300">{{ formErrors.genre }}</span>
      </div>
      <div class="w-full flex flex-col sm:w-10/12">
          <label for="lyrics" class="text-sm font-helvetica text-primary-text-color pl-3">
            Lyrics
          </label>
          <textarea name="lyrics" id="lyrics" class="resize-none  px-8 py-4 h-96 focus:outline-none mb rounded-lg border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black" v-model="track.lyrics"></textarea>

      </div>
      <div class="w-full flex justify-center gap-2 align-middle">
        <button
          class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
          type="submit"
          @click="addMusic()"
        >
          Add Music
        </button>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { defineProps, defineEmits } from 'vue'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()

const track = ref({
  name: '',
  description: '',
  language: '',
  release_at: '',
  genre: '',
  album: '',
  artist: '',
  band: '',
  release_at: '',
  is_released: false,
  lyrics: null
})

const props = defineProps({
  albums: {
    type: Object,
    required: true
  },
  genreData:{
    type:Object,
    required: true
  }
})
const emit = defineEmits(['close'])

function closeAdd() {
  emit('close')
}

const musicInputField = ref([
  { id: '1', name: 'name', type: 'text', label: 'Name' },
  { id: '2', name: 'description', type: 'text', label: 'Description' },
  { id: '3', name: 'language', type: 'text', label: 'Language' },
  { id: '3', name: 'release_at', type: 'date', label: 'Released At' }
])

const formErrors = ref({})
const access_token = localStorage.getItem('access_token')

const backgroundImage = ref(null)
const musicSelected = ref(null)
const validateField = (fieldName) => {
  formErrors.value[fieldName] = ''
}
const profileFile = ref(null)
const musicFile = ref(null)
const handleProfileChange = (event) => {
  profileFile.value = event.target.files[0]

  const reader = new FileReader()
  reader.onload = (e) => {
    backgroundImage.value = e.target.result
  }
  reader.readAsDataURL(profileFile.value)
}
const removeProfile = (event) => {
  event.preventDefault();
  profileFile.value = null;
  backgroundImage.value = null;
};
const removefile = (event) => {
  event.preventDefault();
  musicFile.value = null;
  musicSelected.value = null;
};


const handleFileChange = (event) => {
  musicFile.value = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    musicSelected.value = "/home/anuska/Frontend_ArtistManagementSystem/src/assets/images/albumcover.jpg"
  }
  reader.readAsDataURL(musicFile.value)
}

const addMusic = () => {
  formErrors.value = {}
  if (!track.value.name) {
    formErrors.value.name = 'Please provide a name.'
  }
  if (!track.value.description) {
    formErrors.value.description = 'Please provide a description'
  }
  if (!track.value.release_at) {
    formErrors.value.release_at = 'Please provide an released date.'
  }
  if (Object.keys(formErrors.value).length === 0) {
    const formData = new FormData()
    const today = new Date()
    const releaseDate = new Date(track.value.release_at)
    formData.append('name', track.value.name)
    formData.append('description', track.value.description)
    formData.append('language', track.value.language)
    formData.append('release_at', track.value.release_at)
    if(profileFile.value){
      formData.append('img_profile', profileFile.value)
    }
    if (track.value.genre != '') {
      formData.append('genre', track.value.genre)
    }

    if (track.value.album != '') {
      formData.append('album', track.value.album)
    }
    formData.append('artist', track.value.artist)
    if (track.value.band != '') {
      formData.append('band', track.value.band)
    }
    formData.append('lyrics', track.value.lyrics)
    formData.append('release_at', track.value.release_at)

    if (releaseDate <= today) track.value.is_released = true

    formData.append('is_released', track.value.is_released)

    if (musicFile.value) {
      formData.append('music_file', musicFile.value)
    }
    axios
      .post('http://127.0.0.1:8000/api/music/post/', formData, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then((response) => {
        $toast.success('Music Added', {
          position: 'top-right'
        })
        emit('close')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>
