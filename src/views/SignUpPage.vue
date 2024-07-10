<template>
  <div class="flex justify-evenly items-center min-h-screen w-full bg-dark-primary-color p-5">
    <div class="form-container w-full h-full bg-dark-primary-color flex flex-wrap justify-start gap-5 align-middle">
      <div v-for="item in userInputField" :key="item.id" class="w-full sm:w-5/12 text-secondary-color">
        <label :for="item.name" class="text-xs font-helvetica text-primary-text-color pl-3">
          {{ item.label }}
        </label>
        <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="user[item.name]"
          class="px-2 p-1 focus:outline-none w-full text-xs  rounded-3xl border border-border-color focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 primary-text-color" />
        <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
          formErrors[item.name]
          }}</span>
      </div>


      <div class="flex gap-3">

        <div class="w-full flex flex-col">
          <label for="gender" class="text-xs font-helvetica text-primary-text-color pl-3">Gender</label>
          <select v-model="user.gender" id="gender" name="gender"
            class="rounded-3xl p-1 border border-border-color text-xs primary-text-colo focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
            <option value="" disabled>Select Gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
          </select>
          <span v-if="formErrors.gender" class="text-orange-300">{{ formErrors.gender }}</span>
        </div>

        <div class="w-full flex flex-col ">
          <label for="country" class="text-xs font-helvetica text-primary-text-color pl-3">
            Country
          </label>
          <select v-model="user.country" id="country" name="country"
            class="rounded-3xl p-1 border border-border-color text-xs primary-text-colo focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
            <option value="" disabled>Select Country</option>
            <option v-for="country in countryOptions" :key="country" :value="country">
              {{ country }}
            </option>
          </select>
          <span v-if="formErrors.country" class="text-orange-300">{{ formErrors.country }}</span>
        </div>
      </div>

      <div class="flex gap-5 justify-evenly w-full">
        <div class="w-full sm:w-[20%] text-secondary-color flex flex-col">
          <label for="profile"
            class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-24 w-24 items-center  text-xs text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
            :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }">
            <p class="bottom-0 w-full bg-secondary-color text-white absolute text-xs ">Profile Picture

            </p>
            <div @click="removeProfile"
              class="group flex  flex-col justify-center  items-center w-5 h-5 rounded-bl-lg top-0 right-0  absolute bg-secondary-color hover:w-full hover:h-full hover:bg-dark-primary-color hover:bg-opacity-80 ">
              <v-icon name="fa-times" scale="0.75"
                class="cursor-pointer fill-dark-primary-color group-hover:fill-secondary-color" />
            </div>

          </label>
          <input type="file" id="profile" name="profile" @change="handleProfileChange" class="hidden" />
          <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{ formErrors.profile
            }}</span>
        </div>
        <div class="w-full sm:w-[20%] text-secondary-color flex flex-col mt-2">
          <label for="cover"
            class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-24 w-24 items-center  text-xs text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
            :style="{ backgroundImage: `url(${coverbackgroundImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }">
            <p class="bottom-0 w-full bg-secondary-color text-white text-sm absolute ">Cover Picture
            </p>
            <div @click="removeCover"
              class="group flex  flex-col justify-center  items-center w-5 h-5 rounded-bl-lg top-0 right-0  absolute bg-secondary-color hover:w-full hover:h-full hover:bg-dark-primary-color hover:bg-opacity-80 ">
              <v-icon name="fa-times" scale="0.75"
                class="cursor-pointer fill-dark-primary-color group-hover:fill-secondary-color" />
            </div>

          </label>
          <input type="file" id="cover" name="cover" @change="handleCoverChange" class="hidden" />
          <span v-if="formErrors.cover" class="text-orange-300 mt-1 pl-3 block text-sm">{{ formErrors.cover }}</span>
        </div>
      </div>
      <div class="w-full text-center">
        <input type="checkbox" class="w-5" v-model="isArtist" />
        <label for="isArtist" class="p-2 text-primary-text-color hover:text-secondary-color">Are you signing as an
          Artist?</label>
      </div>
      <div class="w-full flex justify-center gap-2 align-middle">
        <button
          class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
          type="submit" @click="addUser">
          Sign Up
        </button>
        <div class="text-primary-text-color mt-2">
          <span class="px-2 text-slate-500"> or </span>
          <RouterLink to="/login" class="hover:text-secondary-color"> Login </RouterLink>
        </div>
      </div>
    </div>
    <div class="form-img hidden md:flex rounded-lg"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const base_url = import.meta.env.VITE_BASE_API_URL;

const router = useRouter()
const isArtist = ref(false)
const user = ref({
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  dob: '',
  password: '',
  Repassword: '',
  country: '',
  bio: '',
  gender: ''
})

const userInputField = ref([
  { id: '1', name: 'firstname', type: 'text', label: 'First Name' },
  { id: '2', name: 'lastname', type: 'text', label: 'Last Name' },
  { id: '3', name: 'username', type: 'text', label: 'Username' },
  { id: '4', name: 'email', type: 'email', label: 'Email' },
  { id: '5', name: 'password', type: 'password', label: 'Password' },
  { id: '6', name: 'Repassword', type: 'password', label: 'Confirm Password' },
  { id: '7', name: 'dob', type: 'date', label: 'Date of Birth' }
])

const formErrors = ref({})

const countryOptions = ref([])

const fetchCountries = async () => {
  try {
    const response = await axios.get(`${base_url}/api/user/countrylistview/`)
    countryOptions.value = response.data.countries
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
}

onMounted(() => {
  fetchCountries()
})

const validateField = (fieldName) => {
  formErrors.value[fieldName] = ''

  if (fieldName === 'password' && user.value.password.length < 8) {
    formErrors.value.password = 'Password should be at least 8 characters long.'
  } else if (fieldName === 'Repassword' && user.value.password !== user.value.Repassword) {
    formErrors.value.Repassword = 'Passwords do not match.'
  }
}

const profileFile = ref(null)
const coverFile = ref(null)
const backgroundImage = ref(null)
const coverbackgroundImage = ref(null)
const handleProfileChange = (event) => {
  profileFile.value = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    backgroundImage.value = e.target.result
  }
  reader.readAsDataURL(profileFile.value)
}

const handleCoverChange = (event) => {
  coverFile.value = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    coverbackgroundImage.value = e.target.result
  }
  reader.readAsDataURL(coverFile.value)
}
const removeProfile = (event) => {
  event.preventDefault();
  profileFile.value = null;
  backgroundImage.value = null;
};
const removeCover = (event) => {
  event.preventDefault();
  coverFile.value = null;
  coverbackgroundImage.value = null;
};

const addUser = () => {
  formErrors.value = {}

  if (user.value.password.length < 8) {
    formErrors.value.password = 'Password should be at least 8 characters long.'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(user.value.password)) {
    formErrors.value.password =
      'Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
  }
  if (user.value.password !== user.value.Repassword) {
    formErrors.value.Repassword = 'Passwords do not match.'
  }
  if (user.value.username.length < 5) {
    formErrors.value.username = 'Username should be at least 5 characters long.'
  }
  if (!user.value.email) {
    formErrors.value.email = 'Please provide an email.'
  }
  if (!user.value.country) {
    formErrors.value.country = 'Please provide your country.'
  }

  if (Object.keys(formErrors.value).length === 0) {
    const formData = new FormData()
    formData.append('email', user.value.email)
    formData.append('password', user.value.password)
    formData.append('firstname', user.value.firstname)
    formData.append('lastname', user.value.lastname)
    formData.append('username', user.value.username)
    if (user.value.dob) {
      formData.append('dob', user.value.dob)
    }
    formData.append('gender', user.value
      .gender)
    formData.append('country', user.value.country)
    formData.append('is_artist', isArtist.value)
    if (profileFile.value) {
      formData.append('img_profile', profileFile.value)
    }
    if (coverFile.value && isArtist.value) {
      formData.append('img_cover', coverFile.value)
    }
    formData.append('is_active', 'True')
    axios
      .post(`${base_url}/api/user/post/`, formData)
      .then((response) => {
        console.log('registered')
        router.push('/login')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>

<style scoped>
.body {
  background-image: url();
}

.form-img {
  width: 45vw;
  height: 90vh;
  background-image: url('../assets/images/bobmarley.webp');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
