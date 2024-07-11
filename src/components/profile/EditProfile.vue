<template>
  <!-- <Credential v-if="is_confirm" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
    @confirm="editUser" @close="toggleCloseCredential" /> -->
  <fieldset
    class="border border-border-color rounded-md absolute ml-[5vw] w-[90vw] sm:w-[60vw] sm:ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-10  m-auto px-5 pb-5">
    <CloseButton @action="emit('close')" index="3" />
    <div class="flex sm:flex-row flex-col my-5 gap-5 justify-center items-center">
      <div class="form-container w-full h-full flex flex-col flex-wrap justify-center gap-3 align-middle ">
        <div v-for="item in userInputField" :key="item.id" class="w-full ">
          <label :for="item.name" class="text-xs font-helvetica text-primary-text-color pl-3">
            {{ item.label }}
          </label>
          <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="user[item.name]"
            class="px-2 p-1 focus:outline-none w-full text-xs mb rounded-3xl border border-border-color focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 primary-text-color" />
          <span v-if="formErrors[item.name]" class=" text-xs text-error-text-color pl-3">{{
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
            <span v-if="formErrors.gender" class="text-error-text-color">{{ formErrors.gender }}</span>
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
            <span v-if="formErrors.country" class="text-error-text-color">{{ formErrors.country }}</span>
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
          <span v-if="formErrors.profile" class="text-error-text-color mt-1 pl-3 block text-sm">{{
            formErrors.profile
          }}</span>
        </div>
        <div class="w-full  text-secondary-color flex flex-col mt-2 items-center justify-center">
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

          <span v-if="formErrors.file" class="text-error-text-color mt-1 pl-3 block text-sm">{{
            formErrors.file
          }}</span>
        </div>
      </div>


    </div>

    <div class="w-full flex justify-center gap-2 align-middle">
      <button
        class="bg-btn-yellow h-7 w-2/6 text-sm hover:text-secondary-color text-light-primary-color rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
        type="submit" @click="confirm()">
        Edit Profile
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
const countryOptions = ref([])
const base_url = import.meta.env.VITE_BASE_API_URL

const props = defineProps(['userData'])
const user = ref({
  firstname: props.userData.firstname,
  bio: props.userData.bio,
  lastname: props.userData.lastname,
  username: props.userData.username,
  email: props.userData.email,
  dob: props.userData.dob,
  country: props.userData.country,
  gender: props.userData.gender,
  password: ''
})


const emit = defineEmits(['close'])

function closeAdd() {
  emit('close')
}

const userInputField = ref([
  { id: '1', name: 'firstname', type: 'text', label: 'First Name' },
  { id: '2', name: 'bio', type: 'text', label: 'Bio' },
  { id: '3', name: 'lastname', type: 'text', label: 'Last Name' },
  { id: '4', name: 'username', type: 'text', label: 'Username' },
  { id: '5', name: 'email', type: 'email', label: 'Email' },
  { id: '6', name: 'dob', type: 'date', label: 'Date of Birth' },
  { id: '7', name: 'password', type: 'password', label: 'Provide your Credentials' }
])

const formErrors = ref({})

const validateField = (fieldName) => {
  formErrors.value[fieldName] = ''
}
const newProfile = ref(false);
const newCover = ref(false);
const profileFile = ref(props.userData.img_profile)
const coverFile = ref(props.userData.img_cover)
const backgroundImage = ref(`${base_url}${props.userData.img_profile}`)
const coverbackgroundImage = ref(`${base_url}${props.userData.img_cover}`)
const handleProfileChange = (event) => {
  profileFile.value = event.target.files[0]
  newProfile.value = true;
  const reader = new FileReader()
  reader.onload = (e) => {
    backgroundImage.value = e.target.result
  }
  reader.readAsDataURL(profileFile.value)
}

const handleCoverChange = (event) => {
  coverFile.value = event.target.files[0]
  newProfile.value = true;
  const reader = new FileReader()
  reader.onload = (e) => {
    coverbackgroundImage.value = e.target.result
  }
  reader.readAsDataURL(coverFile.value)
}
const removeProfile = (event) => {
  event.preventDefault();
  if (newProfile.value) {
    profileFile.value = props.userData.img_profile;
    backgroundImage.value = `${base_url}${props.userData.img_profile}`
    newProfile.value = false
  }
  else {
    profileFile.value = null;
    backgroundImage.value = null;
  }
};
const removeCover = (event) => {
  event.preventDefault();
  if (newCover.value) {
    coverFile.value = props.userData.img_cover;
    coverbackgroundImage.value = `${base_url}${props.userData.img_cover}`
    newCover.value = false
  }
  else {
    coverFile.value = null;
    coverbackgroundImage.value = null;
  }
};


const editUser = () => {
  const formData = new FormData()
  formData.append('email', user.value.email)
  formData.append('bio', user.value.bio)
  formData.append('firstname', user.value.firstname)
  formData.append('lastname', user.value.lastname)
  formData.append('username', user.value.username)
  if (user.value.dob) {
    formData.append('dob', user.value.dob)
  }
  formData.append('gender', user.value.gender)
  formData.append('country', user.value.country)
  if (profileFile.value && profileFile.value instanceof File) {
    RemoveOldProfile()
    formData.append('img_profile', profileFile.value)
  }
  if (profileFile.value == null) {
    RemoveOldProfile()
  }
  if (coverFile.value && coverFile.value instanceof File) {
    RemoveOldCover()
    formData.append('img_cover', coverFile.value)
  }
  if (coverFile.value == null) {
    RemoveOldCover()
  }
  axios
    .patch(`${base_url}/api/user/edit/`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then((response) => {
      $toast.success("Profile edited successfully");
      closeAdd();
    })
    .catch((error) => {
      console.error(error)
      $toast.error(error.response.data)
    })
}


const confirm = () => {

  formErrors.value = {}
  if (user.value.username.length < 5) {
    formErrors.value.username = 'Username should be at least 5 characters long.'
  }
  if (!user.value.email) {
    formErrors.value.email = 'Please provide an Email.'
  }
  if (!user.value.country) {
    formErrors.value.country = 'Please provide your Country.'
  }
  if (!user.value.password) {
    formErrors.value.password = 'Please provide your Credential.'
  }
  if (!user.value.bio) {
    formErrors.value.bio = 'Please provide your Bio.'
  }
  if (Object.keys(formErrors.value).length === 0) {
    axios
      .post(`${base_url}/api/credential/`, { email: user.value.email, password: user.value.password }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response) => {
        editUser()
      })
      .catch((error) => {
        console.error('Error logging in:', error)
        if (error.response && error.response.data && error.response.data.msg) {
          formErrors.value.password = error.response.data
        } else {
          $toast.error(error.response.data)
        }
      })

  }
}


const RemoveOldProfile = () => {
  axios.delete(`${base_url}/api/users/profile-delete/${props.userData.id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    }
  })
    .catch((err) => {
      console.log(err.response.data)
    })
}
const RemoveOldCover = () => {
  axios.delete(`${base_url}/api/users/cover-delete/${props.userData.id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    }
  })
    .catch((err) => {
      console.log(err.response.data)
    })
}
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
</script>
