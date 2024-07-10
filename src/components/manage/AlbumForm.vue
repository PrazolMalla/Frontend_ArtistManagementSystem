<template>
  <fieldset
    class="border border-border-color rounded-md absolute ml-[5vw] w-[90vw] sm:w-[60vw] sm:ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-10  m-auto px-5 pb-5">
    <CloseButton @action="emit('close')" index="3" />
    <div class="flex gap-2 flex-col sm:flex-row justify-center items-center mt-5">

      <div class="form-container w-full flex-col gap-5 flex-wrap justify-center ">
        <div v-for="item in AlbumInputField" :key="item.id" class="w-full text-secondary-color">
          <label :for="item.name" class="text-xs font-helvetica text-primary-text-color pl-3">
            {{ item.label }}
          </label>
          <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="album[item.name]"
            class="px-2 p-1 focus:outline-none w-full text-xs mb rounded-3xl border border-border-color focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 primary-text-color" />
          <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
            formErrors[item.name]
          }}</span>
        </div>

      </div>
      <div class="w-full sm:w-3/12 text-secondary-color flex flex-col mt-2 items-center justify-center">
        <label for="img"
          class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-24 w-24 items-center  text-xs text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }">
          <p class="bottom-0 w-full bg-secondary-color text-white absolute ">Album Picture

          </p>
          <div @click="removeProfile"
            class="group flex  flex-col justify-center  items-center w-5 h-5 rounded-bl-lg top-0 right-0  absolute bg-secondary-color hover:w-full hover:h-full hover:bg-dark-primary-color hover:bg-opacity-80 ">
            <v-icon name="fa-times" scale="0.75"
              class="cursor-pointer fill-dark-primary-color group-hover:fill-secondary-color" />
          </div>

        </label>
        <input type="file" id="img" name="profile" @change="handleFileChange" class="hidden" />

        <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{
          formErrors.profile
        }}</span>
      </div>
    </div>
    <div class="w-full flex justify-center mt-5 gap-2 align-middle">
      <button
        class="bg-btn-yellow h-7 w-2/6 text-sm hover:text-secondary-color text-light-primary-color rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
        type="submit" @click="confirm">
        <p v-if="props?.albumId">Edit Album</p>
        <p v-else>Add Album</p>
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
const emit = defineEmits(['close'])
const props = defineProps(['albumId'])

const base_url = import.meta.env.VITE_BASE_API_URL

function action() {
  emit('action')
}

onMounted(() => {
  if (props.albumId) fetchAlbums()
})
const fetchAlbums = async () => {

  try {
    const response = await axios.get(`${base_url}/api/album/get/${props.albumId}`)
    const data = response.data
    album.value = { ...data }
    profileFile.value = data.img_profile
    backgroundImage.value = `${base_url}/${data.img_profile}`
    album.value.release_at = new Date(data.release_at).toISOString().split('T')[0]
    if (!album.value.band) {
      album.value.band = ''
    }
  } catch (error) {
    console.error('Error fetching album:', error)
  }
}


const access_token = localStorage.getItem('access_token')
const formErrors = ref({})
const AlbumInputField = ref([
  { id: '1', name: 'name', type: 'text', label: 'Name' },
  { id: '2', name: 'description', type: 'text', label: 'Description' },
  { id: '3', name: 'release_at', type: 'date', label: 'Released At' }
])
const album = ref({
  name: '',
  description: '',
  release_at: '',
  is_released: false
})

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
const removeProfile = (event) => {
  event.preventDefault()
  profileFile.value = null
  backgroundImage.value = null
}
function validateField(fieldName) {
  formErrors.value[fieldName] = ''
}

function confirm() {
  formErrors.value = {}
  if (!album.value.name) {
    formErrors.value.name = 'Please provide a name.'
  }
  if (!album.value.description) {
    formErrors.value.description = 'Please provide a description.'
  }
  if (!album.value.release_at) {
    formErrors.value.release_at = 'Please provide a release date.'
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
    if (profileFile.value && profileFile.value instanceof File) {
      formData.append('img_profile', profileFile.value)
    }
    if (props.albumId) {
      axios
        .patch(`${base_url}/api/album/edit/${props.albumId}/`, formData, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        .then((response) => {
          $toast.success('Album updated successfully')
          emit('close')
        })
        .catch((error) => {
          $toast.error('Error occurred while updating album')
        })
    } else {
      axios.post(`${base_url}/api/album/post/`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
        .then((response) => {
          $toast.success('Album added successfully')
          emit('close')
        })
        .catch((error) => {
          $toast.error('Error occurred while adding album')
        })
    }
  }
}
</script>
