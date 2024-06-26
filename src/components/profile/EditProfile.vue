<template>
  <Credential
        v-if="is_confirm"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 mt-40  "
        @confirm="editUser"
        @close="toggleCloseCredential"
      />
  <fieldset
    class="border border-slate-700 rounded-md absolute sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 m-auto"
    v-if="!is_confirm"
  >
    <legend class="ml-10">Edit Profile</legend>
    <v-icon
      name="fa-times"
      fill="#302f31"
      scale="1"
      @click="closeAdd"
      class="absolute right-3 cursor-pointer"
    />
    <div class="form-container w-full p-10 h-full flex flex-wrap justify-center gap-5 align-middle">
      <div
        v-for="item in userInputField"
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
          v-model="user[item.name]"
          class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
        />
        <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
          formErrors[item.name]
        }}</span>
      </div>
      <div class="w-full sm:w-[20%]  self-center text-secondary-color flex flex-col mt-2">
        <label
          for="profile"
          class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-40 items-center  text-sm text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain', backgroundRepeat:'no-repeat', backgroundPosition: 'center' }"
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
          class="border text-center relative  border-slate-600 overflow-hidden cursor-pointer h-40 items-center  text-sm text-gray-900 bg-transparent rounded-md focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          :style="{ backgroundImage: `url(${coverbackgroundImage})`, backgroundSize: 'contain', backgroundRepeat:'no-repeat', backgroundPosition: 'center'}"
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
          v-model="user.gender"
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
          v-model="user.country"
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
          @click="confirmEdit()"
        >
          Edit Profile
        </button>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import { ref, onMounted} from 'vue'
import Credential from '@/components/manage/Credential.vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const countryOptions = ref([])
const base_url  = import.meta.env.VITE_BASE_API_URL

const props = defineProps(['userData'])
const user = ref({
  firstname: props.userData.firstname,
  lastname: props.userData.lastname,
  username: props.userData.username,
  email: props.userData.email,
  dob: props.userData.dob,
  country: props.userData.country,
  gender: props.userData.gender
})


const emit = defineEmits(['close'])

function closeAdd() {
  emit('close')
}

const userInputField = ref([
  { id: '1', name: 'firstname', type: 'text', label: 'First Name' },
  { id: '2', name: 'lastname', type: 'text', label: 'Last Name' },
  { id: '3', name: 'username', type: 'text', label: 'Username' },
  { id: '4', name: 'email', type: 'email', label: 'Email' },
  { id: '5', name: 'dob', type: 'date', label: 'Date of Birth' }
])

const formErrors = ref({})

const validateField = (fieldName) => {
  formErrors.value[fieldName] = ''
}
const newProfile=ref(false);
const newCover=ref(false);
const profileFile = ref(props.userData.img_profile)
const coverFile = ref(props.userData.img_cover)
const backgroundImage = ref(`${base_url}${props.userData.img_profile}`)
const coverbackgroundImage = ref(`${base_url}${props.userData.img_cover}`)
const handleProfileChange = (event) => {
  profileFile.value = event.target.files[0]
  newProfile.value=true;
  const reader = new FileReader()
  reader.onload = (e) => {
    backgroundImage.value = e.target.result
  }
  reader.readAsDataURL(profileFile.value)
}

const handleCoverChange = (event) => {
 coverFile.value = event.target.files[0]
 newProfile.value=true;
 const reader = new FileReader()
  reader.onload = (e) => {
    coverbackgroundImage.value = e.target.result
  }
  reader.readAsDataURL(coverFile.value)
}
const removeProfile = (event) => {
  event.preventDefault();
  if(newProfile.value){
    profileFile.value = props.userData.img_profile;
    backgroundImage.value = `${base_url}${props.userData.img_profile}`
    newProfile.value=false
  }
  else{
    profileFile.value = null;
    backgroundImage.value = null;
  }
};
const removeCover = (event) => {
  event.preventDefault();
  if(newCover.value){
    coverFile.value = props.userData.img_cover;
    coverbackgroundImage.value = `${base_url}${props.userData.img_cover}`
    newCover.value=false
  }
  else{
    coverFile.value = null;
    coverbackgroundImage.value = null;
  }
};

const is_confirm= ref(false)

function toggleCloseCredential() {
  is_confirm.value = false
}
function confirmEdit() {
  console.log("coverFile=",coverFile.value)
  is_confirm.value=true
}

const editUser = () => {
  formErrors.value = {}
  is_confirm.value=false
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
    if(profileFile.value==null){
      RemoveOldProfile()
    }
    if (coverFile.value && coverFile.value instanceof File) {
      RemoveOldCover()
      formData.append('img_cover', coverFile.value)
    }
    if(coverFile.value==null){
      RemoveOldCover()
    }
    axios
      .patch(`${base_url}/api/user/edit/`, formData,  {
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
        $toast.error("Error while editing profile")
      })
  }
}
const RemoveOldProfile = () => {
  axios.delete(`${base_url}/api/users/profile-delete/${props.userData.id}/`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    }
  })
    .catch((err) => {
      console.log(err.response.data)
    })  
}
const RemoveOldCover = () => {
  axios.delete(`${base_url}/api/users/cover-delete/${props.userData.id}/`,{
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
