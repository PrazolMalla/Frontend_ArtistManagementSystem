<template>
  <fieldset
    class="border border-slate-700 z-0 rounded-md absolute w-full sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden  m-auto">
    <legend class="ml-10">Edit Theme</legend>
    <v-icon name="fa-times" fill="#302f31" scale="1" @click="closeAdd" class="absolute right-3 cursor-pointer" />
    <div
      class="form-container  flex flex-col-reverse sm:flex-row flex-wrap justify-start items-center gap-5 p-5 align-middle">
      <div class="flex flex-col w-full sm:w-5/12 gap-2">
        <div v-for="item in themeInputField" :key="item.id" class="text-secondary-color">
          <label :for="item.name" class="text-xs font-helvetica text-primary-text-color pl-3">
            {{ item.label }}
          </label>
          <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="theme[item.name]" :class="[
            'w-full h-8 rounded-full text-xs px-2',
            item.name === 'name' ? 'border border-black ' : ''
          ]" />
          <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">
            {{ formErrors[item.name] }}
          </span>
        </div>

        <div class="text-secondary-color">
          <label for="opacity" class="text-xs font-helvetica text-primary-text-color pl-3">
            Opacity :{{ theme.opacity }}
          </label>
          <input type="range" name="opacity" min="0" max="1" step="0.01" v-model="theme.opacity" class="w-full " />

        </div>

        <div class="w-full text-secondary-color flex flex-col ">
          <label for="profile"
            class="border border-black cursor-pointer items-center text-xs text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50 px-3 p-2">Background
            Image</label>
          <input type="file" id="profile" name="profile" @change="handleFileChange" class="hidden" />
          <span v-if="formErrors.profile" class="text-orange-300 pl-3 block text-sm">
            {{ formErrors.profile }}
          </span>
        </div>

        <div class="flex justify-center align-middle">
          <button
            class="bg-btn-yellow px-3 h-8 hover:text-secondary-color text-slate-200 text-xs rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
            type="submit" @click="editTheme()">
            Edit Theme
          </button>
        </div>
      </div>
      <div
        class="border  flex justify-center items-center border-slate-500 relative rounded-md overflow-hidden w-full sm:w-6/12 h-64">
        <div class="absolute w-full h-full bg-cover"
          :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }"></div>
        <div class="absolute bgThemeGlass z-10 h-full w-full"
          :style="{ backgroundColor: theme.darkPrimaryColor, opacity: theme.opacity }"></div>
        <p class="absolute z-20 text-3xl " :style="{ color: theme.secondaryColor }">
          {{ theme.name }}
        </p>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const base_url = import.meta.env.VITE_BASE_API_URL;
const props = defineProps({
  themeId: {
    type: String,
    required: true
  }
})

const theme = ref({
  name: '',
  secondaryColor: '#ff4000',
  darkPrimaryColor: '#f6f3eb',
  lightPrimaryColor: '#ECE6D5'
})

const emit = defineEmits(['close'])

function closeAdd() {
  emit('close')
}

const themeInputField = ref([
  { id: '1', name: 'name', type: 'text', label: 'Name' },
  { id: '2', name: 'secondaryColor', type: 'color', label: 'Secondary Color' },
  { id: '3', name: 'darkPrimaryColor', type: 'color', label: 'Dark Primary Color' },
  { id: '4', name: 'lightPrimaryColor', type: 'color', label: 'Light Primary Color' }
])

const formErrors = ref({})
const access_token = localStorage.getItem('access_token')

const validateField = (fieldName) => {
  formErrors.value[fieldName] = ''
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

const fetchThemeData = async () => {
  try {
    const response = await axios.get(`${base_url}/api/theme/get/${props.themeId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    theme.value = response.data
    backgroundImage.value = `${base_url}${response.data.img_profile}`
  } catch (error) {
    console.error('Error fetching theme data:', error)
  }

}

onMounted(() => {
  fetchThemeData()
})

const editTheme = () => {
  formErrors.value = {}
  if (!theme.value.name) {
    formErrors.value.name = 'Please provide a name.'
  }
  if (Object.keys(formErrors.value).length === 0) {
    const formData = new FormData()
    formData.append('name', theme.value.name)
    formData.append('secondaryColor', theme.value.secondaryColor)
    formData.append('darkPrimaryColor', theme.value.darkPrimaryColor)
    formData.append('lightPrimaryColor', theme.value.lightPrimaryColor)
    formData.append('opacity', theme.value.opacity)
    if (profileFile.value && profileFile.value instanceof File) {
      formData.append('img_profile', profileFile.value)
    }
    axios
      .patch(`${base_url}/api/theme/edit/${props.themeId}/`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then((response) => {
        $toast.success('Theme Updated', {
          position: 'top-right'
        })
        emit('close')
      })
      .catch((error) => {
        $toast.error('Error occur while Updating Theme')
      })
  }
}
</script>
