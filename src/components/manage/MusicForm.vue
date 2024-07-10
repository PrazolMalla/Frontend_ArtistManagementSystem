<template>
  <fieldset
    class="border border-border-color rounded-md absolute ml-[5vw] w-[90vw] sm:w-[60vw] sm:ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-10  m-auto px-5 pb-5">
    <CloseButton @action="emit('close')" />
    <div class="flex gap-2 flex-col sm:flex-row  mt-5">
      <div class="form-container w-full flex-col gap-5 flex-wrap justify-center">
        <div v-for="item in musicInputField" :key="item.id">
          <label :for="item.name" class="text-xs font-helvetica text-primary-text-color pl-3">
            {{ item.label }}
          </label>
          <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="track[item.name]"
            class="px-2 p-1 focus:outline-none w-full text-xs mb rounded-3xl border border-border-color focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-primary-text-color" />
          <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
            formErrors[item.name]
          }}</span>
        </div>
        <div class="flex justify-around">
          <div class="w-full sm:w-[20%]  flex flex-col mt-2">
            <label for="profile"
              class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-24 w-24 items-center  text-xs text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
              :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }">
              <p class="bottom-0 w-full bg-secondary-color text-white absolute ">Select Profile
              </p>



              <div @click="removeProfile"
                class="group flex  flex-col justify-center  items-center w-5 h-5 rounded-bl-lg top-0 right-0  absolute bg-secondary-color hover:w-full hover:h-full hover:bg-dark-primary-color hover:bg-opacity-80 ">
                <v-icon name="fa-times" scale="0.75"
                  class="cursor-pointer fill-dark-primary-color group-hover:fill-secondary-color" />
              </div>

            </label>
            <input type="file" id="profile" name="profile" @change="handleProfileChange" class="hidden" />
            <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{
              formErrors.profile
            }}</span>
          </div>
          <div class="w-full sm:w-[22%] text-primary-text-color flex flex-col mt-2">
            <label for="music"
              class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-24 w-24 items-center  text-xs text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
              :style="{ backgroundImage: `url(${musicbackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
              <p class="bottom-0 w-full bg-secondary-color text-white absolute ">Select Music
              </p>
              <div @click="removeFile"
                class="group flex  flex-col justify-center  items-center w-5 h-5 rounded-bl-lg top-0 right-0  absolute bg-secondary-color hover:w-full hover:h-full hover:bg-dark-primary-color hover:bg-opacity-80 ">
                <v-icon name="fa-times" scale="0.75"
                  class="cursor-pointer fill-dark-primary-color group-hover:fill-secondary-color" />
              </div>
            </label>
            <input type="file" id="music" name="track" @change="handleFileChange" class="hidden" />
            <span v-if="formErrors.file" class="text-orange-300 mt-1 pl-3 block text-sm">{{
              formErrors.file
            }}</span>
          </div>
        </div>
        <div class="flex gap-2 flex-grow  mt-5">
          <div class="w-full flex flex-col">
            <select v-model="track.album" id="gender" name="album"
              class="rounded-3xl p-1 border border-border-color text-xs primary-text-colo focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
              <option value="" disabled>Album</option>
              <option v-for="item in albums" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
            <span v-if="formErrors.album" class="text-orange-300">{{ formErrors.album }}</span>
          </div>

          <div class="w-full flex flex-col">
            <select v-model="track.genre" id="gender" name="genre"
              class="rounded-3xl p-1 border border-border-color primary-text-colo text-xs focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
              <option value="" disabled>Genre</option>
              <option v-for="item in genreData" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
            <span v-if="formErrors.genre" class="text-orange-300">{{ formErrors.genre }}</span>
          </div>
        </div>



      </div>
      <div class="w-full flex flex-col">
        <label for="lyrics" class="text-sm font-helvetica text-primary-text-color pl-3">
          Lyrics
        </label>
        <textarea name="lyrics" id="lyrics"
          class="resize-none px-8 py-4 h-full text-sm focus:outline-none mb rounded-lg border border-border-color focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 primary-text-colo"
          v-model="track.lyrics"></textarea>

      </div>
    </div>
    <div class="w-full flex justify-center mt-5 gap-2 align-middle">
      <button
        class="bg-btn-yellow h-7 w-2/6 text-sm hover:text-secondary-color text-light-primary-color rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
        type="submit" @click="confirm">
        <p v-if="props?.musicId">Edit Music</p>
        <p v-else>Add Music</p>
      </button>
    </div>
  </fieldset>
</template>
<script setup>
import CloseButton from '@/components/buttons/CloseButton.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const base_url = import.meta.env.VITE_BASE_API_URL

const props = defineProps({
  albums: {
    type: Object,
    required: true
  },
  genreData: {
    type: Object,
    required: true
  },
  musicId: {
    type: Number,
    required: true
  },
})

const emit = defineEmits(['close'])

const track = ref({
  name: '',
  description: '',
  language: '',
  release_at: '',
  genre: '',
  album: '',
  artist: '',
  band: '',
  is_released: false,
  lyrics: null
})

const formErrors = ref({})

const musicInputField = ref([
  { id: '1', name: 'name', type: 'text', label: 'Name' },
  { id: '2', name: 'description', type: 'text', label: 'Description' },
  { id: '3', name: 'language', type: 'text', label: 'Language' },
  { id: '4', name: 'release_at', type: 'date', label: 'Released At' }
])

const access_token = localStorage.getItem('access_token')

const backgroundImage = ref(null)
const musicbackgroundImage = ref(null)
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
  event.preventDefault()
  profileFile.value = null
  backgroundImage.value = null
}

const handleFileChange = (event) => {
  musicFile.value = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    musicbackgroundImage.value = "../../../src/assets/images/musiccassette.png"
  }
  reader.readAsDataURL(musicFile.value)
}

const removeFile = (event) => {
  event.preventDefault()
  musicFile.value = null
  musicbackgroundImage.value = null
}

const validateField = (fieldName) => {
  formErrors.value[fieldName] = ''
}

const fetchMusics = async () => {
  try {
    const response = await axios.get(`${base_url}/api/music/get/${props.musicId}`)
    const data = response.data
    track.value = data
    profileFile.value = data.img_profile
    backgroundImage.value = `${base_url}${data.img_profile}`
    musicbackgroundImage.value = "../../../src/assets/images/musiccassette.png"
    musicFile.value = data.music_file
    track.value.release_at = new Date(data.release_at).toISOString().split('T')[0]
    if (!track.value.genre) {
      track.value.genre = ''
    }
    if (!track.value.album) {
      track.value.album = ''
    }
    if (!track.value.band) {
      track.value.band = ''
    }
  } catch (error) {
    console.error('Error fetching musics:', error)
  }
}

onMounted(() => {
  if (props.musicId) fetchMusics()
})

const confirm = () => {
  formErrors.value = {}
  if (!track.value.name) {
    formErrors.value.name = 'Please provide a name.'
  }
  if (!track.value.description) {
    formErrors.value.description = 'Please provide a description'
  }
  if (!track.value.release_at) {
    formErrors.value.release_at = 'Please provide a release date.'
  }

  if (Object.keys(formErrors.value).length === 0) {
    const formData = new FormData()
    const today = new Date()
    const releaseDate = new Date(track.value.release_at)
    formData.append('name', track.value.name)
    formData.append('description', track.value.description)
    formData.append('language', track.value.language)
    formData.append('release_at', track.value.release_at)
    if (track.value.genre) {
      formData.append('genre', track.value.genre)
    }
    if (track.value.album) {
      formData.append('album', track.value.album)
    }
    formData.append('artist', track.value.artist)
    if (track.value.band) {
      formData.append('band', track.value.band)
    }
    formData.append('lyrics', track.value.lyrics)
    formData.append('is_released', releaseDate <= today)

    if (profileFile.value && profileFile.value instanceof File) {
      formData.append('img_profile', profileFile.value)
    }
    if (musicFile.value && musicFile.value instanceof File) {
      formData.append('music_file', musicFile.value)
    }

    const request = props.musicId
      ? axios.patch(`${base_url}/api/music/edit/${props.musicId}/`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      : axios.post(`${base_url}/api/music/post/`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

    request.then(() => {
      $toast.success(props.musicId ? 'Music Updated successfully' : 'Music Added', {
        position: 'top-right'
      })
      emit('close')
    }).catch((error) => {
      console.error(error)
      $toast.error('Error occurred while updating music')
    })
  }
}
</script>
