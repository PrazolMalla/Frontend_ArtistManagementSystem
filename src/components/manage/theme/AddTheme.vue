<template>
  <fieldset
    class="border border-slate-700 rounded-md absolute sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 m-auto"
  >
    <legend class="ml-10">Add Theme</legend>
    <v-icon
      name="fa-times"
      fill="#302f31"
      scale="1"
      @click="closeAdd"
      class="absolute right-3 cursor-pointer"
    />
    <div class="form-container flex flex-wrap justify-start gap-5 p-5 align-middle">
      <div class="flex flex-col sm:w-3/12 gap-5">
        
        <div
          v-for="item in themeInputField"
          :key="item.id"
          class="text-secondary-color"
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
          <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">
            {{ formErrors[item.name] }}
          </span>
        </div>

        <div class="text-secondary-color">
          <label for="opacity" class="text-sm font-helvetica text-primary-text-color pl-3">
            Opacity
          </label>
          <input
            type="range"
            name="opacity"
            min="0"
            max="1"
            step="0.01"
            v-model="theme.opacity"
            class="w-full"
          />
          <span class="pl-3 text-sm">{{ theme.opacity }}</span>
        </div>

        <div class="w-full text-secondary-color flex flex-col mt-2">
          <label
            for="profile"
            class="border border-black cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          >Background Img</label>
          <input
            type="file"
            id="profile"
            name="profile"
            @change="handleProfileChange"
            class="hidden"
          />
          <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">
            {{ formErrors.profile }}
          </span>
        </div>

        <div class="flex justify-center gap-2 align-middle">
          <button
            class="bg-btn-yellow px-3 h-10 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
            type="submit"
            @click="addTheme()"
          >
            Add Theme
          </button>
        </div>

      </div>
      <div class="border border-slate-500 relative rounded-md overflow-hidden w-8/12 h-1/1">
        <div class="absolute w-full h-full bg-cover" :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }"></div>
        <div class="absolute bgThemeGlass z-10 h-full w-full" :style="{ backgroundColor: theme.darkPrimaryColor, opacity: theme.opacity }">
          
        </div>
        <p class="absolute z-20 text-3xl p-5" :style="{ color: theme.secondaryColor }">The Text Goes here</p>
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

const theme = ref({
  name: '',
  secondaryColor: '#ff4000',
  darkPrimaryColor: '#f6f3eb',
  lightPrimaryColor: '#ECE6D5',
  opacity: 0.8
})

const backgroundImage = ref(null)
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
  const reader = new FileReader()
  reader.onload = (e) => {
    backgroundImage.value = e.target.result
  }
  reader.readAsDataURL(profileFile.value)
}

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
    formData.append('opacity', theme.value.opacity)
    formData.append('img_profile', profileFile.value)
    
    axios
      .post('http://127.0.0.1:8000/api/theme/create/', formData, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then((response) => {
        $toast.success('Theme Added', {
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

<style scoped>
.bgThemeGlass {
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
