<template>
  <fieldset
    class="border border-slate-700 rounded-md absolute sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 m-auto"
  >
    <legend class="ml-10">Edit Album</legend>
    <v-icon
      name="fa-times"
      fill="#302f31"
      scale="1"
      @click="closeEdit"
      class="absolute right-3 cursor-pointer"
    />
    <div class="form-container w-full p-10 h-full flex flex-wrap justify-center gap-5 align-middle">
      <div
        v-for="item in AlbumInputField"
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
          v-model="album[item.name]"
          class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
        />
        <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
          formErrors[item.name]
        }}</span>
      </div>
      <div class="w-full sm:w-2/12 text-secondary-color flex flex-col mt-2">
        <label
          for="img"
          class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-20 items-center  text-sm text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }"
          >
          <p class="bottom-0 w-full bg-secondary-color text-white absolute ">Album Picture
            <v-icon
              name="fa-times"
              fill="#ffffff"
              scale="1"
              @click="removePicture"
              class="absolute right-3 cursor-pointer"
              v-if="profileFile"/>
          </p>
          
       </label>
        <input type="file" id="img" name="profile" @change="handleFileChange" class="hidden" />

        <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{
          formErrors.profile
        }}</span>
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
          type="submit"
          @click="editAlbum"
        >
          Edit Album
        </button>
      </div>
    </div>
  </fieldset>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['close'])
const props = defineProps(['albumId'])
function closeEdit() {
  emit('close')
}

onMounted(() => {
  fetchAlbums()
})
const fetchAlbums = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/album/get/${props.albumId}`)
    const data = response.data
    album.value = data
    profileFile.value = data.img_profile
    album.value.release_at = new Date(data.release_at).toISOString().split('T')[0]
    if (!album.value.genre) {
      album.value.genre = ''
    }
    if (!album.value.album) {
      album.value.album = ''
    }
    if (!album.value.band) {
      album.value.band = ''
    }
  } catch (error) {
    console.error('Error fetching album:', error)
  }
}

const access_token = localStorage.getItem('access_token')
const formErrors = ref('')
const AlbumInputField = ref([
  { id: '1', name: 'name', type: 'text', label: 'Name' },
  { id: '2', name: 'description', type: 'text', label: 'Description' },
  { id: '3', name: 'language', type: 'text', label: 'Language' },
  { id: '3', name: 'release_at', type: 'date', label: 'Released At' }
])
const album = ref({
  name: '',
  description: '',
  language: '',
  release_at: '',
  is_released: false
})

const profileFile = ref(null)
const backgroundImage=ref(null)
const handleFileChange = (event) => {
  profileFile.value = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    backgroundImage.value = e.target.result
  }
  reader.readAsDataURL(profileFile.value)
}
const removePicture= (event) => {
  event.preventDefault();
  profileFile.value = null;
  backgroundImage.value = null;
};
function validateField(fieldName) {
  formErrors.value[fieldName] = ''
}

function editAlbum() {
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
    formData.append('language', album.value.language)
    formData.append('release_at', album.value.release_at)

    formData.append('is_released', album.value.is_released)
    if (profileFile.value && profileFile.value instanceof File) {
      formData.append('img_profile', profileFile.value)
    }
    axios
      .patch(`http://127.0.0.1:8000/api/album/edit/${props.albumId}/`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then((response) => {
        $toast.success('Album Updated successfully')
        closeEdit()
      })
      .catch((error) => {
        console.error(error)
        $toast.error('Error occur while updating music')
      })
  }
}
</script>

<style scoped></style>
