<template>
  <fieldset
    class="border border-slate-700 rounded-md absolute sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 m-auto">
    <legend class="ml-10">Add Album</legend>

    <v-icon name="fa-times" fill="#302f31" scale="1" @click="closeAdd" class="absolute right-3 top-3 cursor-pointer" />
    <div class="form-container w-full p-10 h-full flex flex-wrap justify-center gap-5 align-middle">
      <div v-for="item in AlbumInputField" :key="item.id" class="w-full sm:w-5/12 text-secondary-color">
        <label :for="item.name" class="text-sm font-helvetica text-primary-text-color pl-3">
          {{ item.label }}
        </label>
        <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="album[item.name]"
          class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black" />
        <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
          formErrors[item.name]
          }}</span>
      </div>
      <div class="w-full sm:w-3/12 text-secondary-color flex flex-col mt-2">
        <label for="img"
          class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-36 items-center  text-sm text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }">
          <p class="bottom-0 w-full bg-secondary-color text-white absolute ">Album Picture
            <v-icon name="fa-times" fill="#ffffff" scale="1" @click="removePicture"
              class="absolute right-3 cursor-pointer" v-if="profileFile" />
          </p>
        </label>
        <input type="file" id="img" name="profile" @change="handleFileChange" class="hidden" />

        <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{
          formErrors.profile
          }}</span>
      </div>

      <div class="w-full flex justify-center gap-2 align-middle">
        <button
          class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
          type="submit" @click.prevent="addAlbum()">
          Add Album
        </button>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const emit = defineEmits(['close'])

const base_url = import.meta.env.VITE_BASE_API_URL;
const $toast = useToast()

const album = ref({
  name: '',
  description: '',
  release_at: '',
  is_released: false
})
const AlbumInputField = ref([
  { id: '1', name: 'name', type: 'text', label: 'Name' },
  { id: '2', name: 'description', type: 'text', label: 'Description' },
  { id: '3', name: 'release_at', type: 'date', label: 'Released At' }
])

const formErrors = ref({})

const closeAdd = () => {
  emit('close')
}

const validateField = (fieldName) => {
  formErrors.value[fieldName] = ''
}



const addAlbum = async () => {
  formErrors.value = {}
  if (!album.value.name) {
    formErrors.value.name = 'Please provide a name.'
  }
  if (!album.value.description) {
    formErrors.value.description = 'Please provide a description'
  }
  if (!album.value.release_at) {
    formErrors.value.release_at = 'Please provide an released date.'
  }
  if (Object.keys(formErrors.value).length === 0) {
    const formData = new FormData()
    const today = new Date()
    const releaseDate = new Date(album.value.release_at)
    formData.append('name', album.value.name)
    formData.append('description', album.value.description)
    formData.append('release_at', album.value.release_at)
    if (releaseDate <= today) {
      album.value.is_released = true
    } else {
      album.value.is_released = false
    }

    formData.append('is_released', album.value.is_released)
    if (profileFile.value) formData.append('img_profile', profileFile.value)
    try {
      const response = await axios.post(`${base_url}/api/album/post/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      console.log(response)
      closeAdd()
      $toast.success('Album Added', {
        position: 'top-right'
      })
    } catch (error) {
      console.error(error.response)
    }
  }
}

const profileFile = ref(null)
const backgroundImage = ref(null)
const handleFileChange = (event) => {
  profileFile.value = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    backgroundImage.value = e.target.result
  }
  reader.readAsDataURL(profileFile.value)
}
const removePicture = (event) => {
  event.preventDefault();
  profileFile.value = null;
  backgroundImage.value = null;
};
</script>

<style scoped></style>
