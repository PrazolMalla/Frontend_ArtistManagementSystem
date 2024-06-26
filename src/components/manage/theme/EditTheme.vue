<template>
  <fieldset
    class="border border-slate-700 rounded-md absolute sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 m-auto"
  >
    <legend class="ml-10">Edit Theme</legend>
    <v-icon
      name="fa-times"
      fill="#302f31"
      scale="1"
      @click="closeAdd"
      class="absolute right-3 cursor-pointer"
    />
    <div class="form-container flex flex-col flex-wrap justify-center gap-5 p-5 align-middle">
      <div
        v-for="item in themeInputField"
        :key="item.id"
        class="sm:w-4/12 text-secondary-color"
      > 
        <label :for="item.name" class="text-sm font-helvetica text-primary-text-color pl-3">
          {{ item.label }}
        </label>
        <input
          :type="item.type"
          :name="item.name"
          @blur="validateField(item.name)"
          v-model="theme[item.name]"
          :class="['w-full h-10 rounded-lg', item.name === 'name' ? 'border border-black p-3' : '']"
        />
        <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
          formErrors[item.name]
        }}</span>
      </div>
      <div class="w-full sm:w-2/12 text-secondary-color flex flex-col mt-2">
        <label
          for="profile"
          class="border border-black cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          >Background Img</label
        >
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

      <div class="w-full flex justify-center gap-2 align-middle">
        <button
          class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
          type="submit"
          @click="addTheme()"
        >
          Edit Theme
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
const base_url  = import.meta.env.VITE_BASE_API_URL;
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
const handleProfileChange = (event) => {
  profileFile.value = event.target.files[0]
}

const fetchThemeData = async () => {
  try {
    const response = await axios.get(`${base_url}/api/theme/get/${props.themeId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    theme.value = response.data
    profileFile.value = `${base_url}/${data.img_profile}`
  } catch (error) {
    console.error('Error fetching theme data:', error)
  }

}

onMounted(() => {
  fetchThemeData()
})

const addTheme = () => {
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
    formData.append('img_profile', profileFile.value)
    
    axios
      .patch(`${base_url}/theme/edit/${props.themeId}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then((response) => {
        $toast.success('Theme Edited', {
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
