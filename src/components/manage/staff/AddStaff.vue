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
    <div class="form-container w-full p-10 h-full flex flex-wrap justify-center gap-5 align-middle">
      <div
        v-for="item in staffInputField"
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
          v-model="staff[item.name]"
          class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
        />
        <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
          formErrors[item.name]
        }}</span>
      </div>
      <div class="w-full sm:w-[20%]  self-center text-secondary-color flex flex-col mt-2">
        <label
          for="profile"
          class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-20 items-center  text-sm text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }"
          >
          <p class="bottom-0 w-full bg-secondary-color text-white absolute ">Profile Picture
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
      <div class="w-full sm:w-[20%] self-center text-secondary-color flex flex-col mt-2">
        <label
          for="cover"
          class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-20 items-center  text-sm text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          :style="{ backgroundImage: `url(${coverbackgroundImage})`, backgroundSize: 'cover' }"
          >
          <p class="bottom-0 w-full bg-secondary-color text-white absolute ">Cover Picture
            <v-icon
              name="fa-times"
              fill="#ffffff"
              scale="1"
              @click="removeCover"
              class="absolute right-3 cursor-pointer"
              v-if="coverFile"/>
          </p>
          
       </label>
        <input type="file" id="cover" name="cover" @change="handleCoverChange" class="hidden" />

        <span v-if="formErrors.file" class="text-orange-300 mt-1 pl-3 block text-sm">{{
          formErrors.file
        }}</span>
      </div>
      
        <div class="w-full flex flex-col sm:w-5/12">
        <label for="gender" class="text-sm font-helvetica text-primary-text-color pl-3">Gender</label>
        <select
          v-model="staff.gender"
          id="gender"
          name="gender"
          class="rounded-3xl px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50"
        >
          <option value="" disabled>Select Gender</option>
          <option value="0">Male</option>
          <option value="1">Female</option>
          <option value="2">Other</option>
        </select>
        <span v-if="formErrors.gender" class="text-orange-300">{{ formErrors.gender }}</span>
      </div>

      <div class="w-full flex flex-col sm:w-5/12">
        <label for="country" class="text-sm font-helvetica text-primary-text-color pl-3">
          Country
        </label>
        <select
          v-model="staff.country"
          id="country"
          name="country"
          class="rounded-3xl px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50"
        >
          <option value="" disabled>Select Country</option>
          <option v-for="country in countryOptions" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
        <span v-if="formErrors.country" class="text-orange-300">{{ formErrors.country }}</span>
      </div>

      <div class="w-full flex justify-center gap-2 align-middle">
        <button
          class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
          type="submit"
          @click="addStaff()"
        >
          Add Staff
        </button>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import { ref, onMounted} from 'vue'
import axios from 'axios'
import {defineEmits } from 'vue'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const countryOptions = ref([])

const staff = ref({
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  dob: '',
  password: '',
  Repassword: '',
  country: '',
  gender: ''
})
const emit = defineEmits(['close'])

function closeAdd() {
  emit('close')
}

const staffInputField = ref([
  { id: '1', name: 'firstname', type: 'text', label: 'First Name' },
  { id: '2', name: 'lastname', type: 'text', label: 'Last Name' },
  { id: '3', name: 'username', type: 'text', label: 'Username' },
  { id: '4', name: 'email', type: 'email', label: 'Email' },
  { id: '5', name: 'password', type: 'password', label: 'Password' },
  { id: '6', name: 'Repassword', type: 'password', label: 'Confirm Password' },
  { id: '7', name: 'dob', type: 'date', label: 'Date of Birth' }
])

const formErrors = ref({})
const access_token = localStorage.getItem('access_token')

const validateField = (fieldName) => {
  formErrors.value[fieldName] = ''

  if (fieldName === 'password' && staff.value.password.length < 8) {
    formErrors.value.password = 'Password should be at least 8 characters long.'
  } else if (fieldName === 'Repassword' && staff.value.password !== staff.value.Repassword) {
    formErrors.value.Repassword = 'Passwords do not match.'
  }
}
const profileFile = ref(null)
const coverFile = ref(null)
const backgroundImage=ref(null)
const coverbackgroundImage=ref(null)
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

const addStaff = () => {
  formErrors.value = {}

  if (staff.value.password.length < 8) {
    formErrors.value.password = 'Password should be at least 8 characters long.'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(staff.value.password)) {
    formErrors.value.password =
      'Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
  }
  if (staff.value.password !== staff.value.Repassword) {
    formErrors.value.Repassword = 'Passwords do not match.'
  }
  if (staff.value.username.length < 5) {
    formErrors.value.username = 'Username should be at least 5 characters long.'
  }
  if (!staff.value.email) {
    formErrors.value.email = 'Please provide an email.'
  }
  if (!staff.value.country) {
    formErrors.value.country = 'Please provide your country.'
  }

  if (Object.keys(formErrors.value).length === 0) {
    const formData = new FormData()
    formData.append('email', staff.value.email)
    formData.append('password', staff.value.password)
    formData.append('firstname', staff.value.firstname)
    formData.append('lastname', staff.value.lastname)
    formData.append('username', staff.value.username)
    if (staff.value.dob) {
      formData.append('dob', staff.value.dob)
    }
    formData.append('gender', staff.value
    .gender)
    formData.append('country', staff.value.country)
    formData.append('is_staff', 'True')
    if (profileFile.value) {
      formData.append('img_profile', profileFile.value)
    }
    if (coverFile.value) {
      formData.append('img_cover', coverFile.value)
    }
    formData.append('is_active', 'True')
    axios
      .post('http://127.0.0.1:8000/api/user/post/', formData)
      .then((response) => {
        console.log('registered')
        $toast.success("Staff added successfully");
        closeAdd();
      })
      .catch((error) => {
        console.error(error)
        $toast.error("Error while adding staff")
      })
  }
}
const fetchCountries = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user/countrylistview/')
    countryOptions.value = response.data.countries
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
}
onMounted(() => {
  fetchCountries()
})
</script>
