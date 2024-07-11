<template>
  <fieldset
    class="border border-border-color rounded-md absolute ml-[5vw] w-[90vw] sm:w-[60vw] sm:ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-10  m-auto px-5 pb-5">
    <CloseButton @action="emit('close')" index="3" />
    <div class="flex sm:flex-row flex-col my-5 gap-5 justify-center items-center">
      <div class="form-container w-full h-full flex flex-col flex-wrap justify-center gap-3 align-middle ">
        <div v-for="item in staffInputField" :key="item.id" class="w-full">
          <label :for="item.name" class="text-xs font-helvetica text-primary-text-color pl-3">
            {{ item.label }}
          </label>
          <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="staff[item.name]"
            class="px-2 p-1 focus:outline-none w-full text-xs mb rounded-3xl border border-border-color focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 primary-text-color" />
          <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
            formErrors[item.name]
            }}</span>
        </div>

        <div class="flex gap-3">

          <div class="w-full flex flex-col">
            <label for="gender" class="text-xs font-helvetica text-primary-text-color pl-3">Gender</label>
            <select v-model="staff.gender" id="gender" name="gender"
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
            <select v-model="staff.country" id="country" name="country"
              class="rounded-3xl p-1 border border-border-color text-xs primary-text-colo focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
              <option value="" disabled>Select Country</option>
              <option v-for="country in countryOptions" :key="country" :value="country">
                {{ country }}
              </option>
            </select>
            <span v-if="formErrors.country" class="text-orange-300">{{ formErrors.country }}</span>
          </div>
        </div>

      </div>
      <div class="flex gap-3 sm:flex-col">
        <div class="w-full  text-secondary-color flex flex-col mt-2 items-center justify-center">
          <label for="profile"
            class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-24 w-24 items-center  text-xs text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
            :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }">
            <p class="bottom-0 w-full bg-secondary-color text-white absolute ">Profile Picture

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
        <div class="w-full text-secondary-color flex flex-col mt-2 items-center justify-center">
          <label for="cover"
            class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-24 w-24 items-center  text-xs text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
            :style="{ backgroundImage: `url(${coverbackgroundImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }">
            <p class="bottom-0 w-full bg-secondary-color text-white absolute ">Cover Picture
            </p>
            <div @click="removeCover"
              class="group flex  flex-col justify-center  items-center w-5 h-5 rounded-bl-lg top-0 right-0  absolute bg-secondary-color hover:w-full hover:h-full hover:bg-dark-primary-color hover:bg-opacity-80 ">
              <v-icon name="fa-times" scale="0.75"
                class="cursor-pointer fill-dark-primary-color group-hover:fill-secondary-color" />
            </div>

          </label>
          <input type="file" id="cover" name="cover" @change="handleCoverChange" class="hidden" />

          <span v-if="formErrors.file" class="text-orange-300 mt-1 pl-3 block text-sm">{{
            formErrors.file
            }}</span>
        </div>
      </div>

    </div>

    <div class="w-full flex justify-center gap-2 align-middle">
      <button
        class="bg-btn-yellow h-7 w-2/6 text-sm hover:text-secondary-color text-light-primary-color rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
        type="submit" @click="confirm()">
        <p v-if="props.staffId">Edit Staff</p>
        <p v-else>Add Staff</p>
      </button>
    </div>
  </fieldset>
</template>

<script setup>
import CloseButton from '@/components/buttons/CloseButton.vue'
import { ref, computed, onMounted } from 'vue'
const base_url = import.meta.env.VITE_BASE_API_URL;
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const emit = defineEmits(['close'])
function closeEdit() {
  emit('close')
}
const props = defineProps({
  albums: {
    type: Object,
    required: true
  },
  genreData: {
    type: Object,
    required: true
  },
  staffId: {
    type: String,
    required: true
  },
})
const countryOptions = ref([])
onMounted(() => {

  if (props.staffId) fetchStaff()
  if (!props.staffId) addPasswordField()
  fetchCountries()
})


const fetchStaff = async () => {
  try {
    const response = await axios.get(`${base_url}/api/staff/get/${props.staffId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    const data = response.data
    staff.value = data
    profileFile.value = data.img_profile
    coverFile.value = data.img_cover
    backgroundImage.value = `${base_url}/${data.img_profile}`
    coverbackgroundImage.value = `${base_url}/${data.img_cover}`
    staff.value.dob = new Date(data.dob).toISOString().split('T')[0]
    if (!staff.value.country) {
      staff.value.country = ''
    }
  } catch (error) {
    console.error('Error fetching staff:', error)
  }
}
const fetchCountries = async () => {
  try {
    const response = await axios.get(`${base_url}/api/user/countrylistview/`)
    countryOptions.value = response.data.countries
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
}


const access_token = localStorage.getItem('access_token')
const formErrors = ref('')
const staffInputField = ref([
  { id: '1', name: 'firstname', type: 'text', label: 'First Name' },
  { id: '2', name: 'lastname', type: 'text', label: 'Last Name' },
  { id: '3', name: 'bio', type: 'text', label: 'Bio' },
  { id: '4', name: 'username', type: 'text', label: 'Username' },
  { id: '5', name: 'email', type: 'email', label: 'Email' },
  { id: '6', name: 'dob', type: 'date', label: 'Date of Birth' }
])
const addPasswordField = () => {
  staffInputField.value.push({ id: '5', name: 'password', type: 'password', label: 'Password' })
  staffInputField.value.push({ id: '6', name: 'Repassword', type: 'password', label: 'Confirm Password' })
}
const staff = ref({
  firstname: '',
  bio: '',
  lastname: '',
  username: '',
  email: '',
  dob: '',
  password: '',
  Repassword: '',
  country: '',
  gender: ''
})
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

const validateField = (fieldName) => {
}

function confirm() {
  formErrors.value = {}
  if (staff.value.username.length < 5) {
    formErrors.value.username = 'Username should be at least 5 characters long.'
  }
  if (!staff.value.email) {
    formErrors.value.email = 'Please provide an Email.'
  }
  if (!staff.value.bio) {
    formErrors.value.bio = 'Please provide the Bio'
  }
  if (!staff.value.country) {
    formErrors.value.country = 'Please provide Country.'
  }
  if (!props.staffId) {
    if (staff.value.password.length < 8) {
      formErrors.value.password = 'Password should be at least 8 characters long.'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(staff.value.password)) {
      formErrors.value.password =
        'Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
    }
    if (staff.value.password !== staff.value.Repassword) {
      formErrors.value.Repassword = 'Passwords do not match.'
    }
  }

  if (Object.keys(formErrors.value).length === 0) {
    const formData = new FormData()
    formData.append('email', staff.value.email)
    formData.append('bio', staff.value.bio)
    formData.append('firstname', staff.value.firstname)
    formData.append('lastname', staff.value.lastname)
    formData.append('username', staff.value.username)
    formData.append('gender', staff.value.gender)
    formData.append('country', staff.value.country)
    if (staff.value.dob) formData.append('dob', staff.value.dob)
    if (profileFile.value && profileFile.value instanceof File) formData.append('img_profile', profileFile.value)
    if (coverFile.value && coverFile.value instanceof File) formData.append('img_cover', coverFile.value)
    if (!props.staffId) {
      formData.append('password', staff.value.password)
      formData.append('is_staff', 'True')
      formData.append('is_active', 'True')
    }
    if (props.staffId) {
      axios
        .patch(`${base_url}/api/staff/edit/${props.staffId}/`, formData, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        .then((response) => {
          $toast.success('Staff Updated successfully')
          emit('close')
        })
        .catch((error) => {
          console.error(error)
          $toast.error(error.response.data)
        })
    }
    else {
      axios
        .post(`${base_url}/api/user/post/`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((response) => {
          $toast.success("Staff added successfully");
          emit('close')
        })
        .catch((error) => {
          console.error(error)
          $toast.error(error.response.data)
        })
    }

  }
}
</script>
