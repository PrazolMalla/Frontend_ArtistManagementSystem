<template>
  <div class="flex flex-row items-center h-screen w-full">
    <div class="form-container w-full h-full bg-white flex flex-row">
      <div class="flex justify-center items-center">
        <div class="flex justify-center items-center h-[90%] form-img hidden sm:block w-4/5 my-8 ml-24 rounded-lg">
        </div>
      </div>
      <div class="w-[55vw] h-full sm:mx-12 mx-auto sm:mr-24 bg-white flex items-center justify-center">
        <form
          id="form"
          class="w-full h-full flex flex-col justify-center"
          @submit.prevent="addUser">
          <h1 class="text-4xl font-bold text-center mb-5 font-helvetica">SignUp Now</h1>
          <div class="mt-2 md:flex md:flex-wrap md:justify-between">
            <div v-for="item in userInputField" :key="item.id" class="w-full md:w-96 mt-4">
              <label :for="item.name" class="text-md font-helvetica text-black">
                {{ item.label }}
              </label>
              <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="user[item.name]" class="p-2 mt-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50" >
              <span v-if="formErrors[item.name]" class="text-red-500">{{ formErrors[item.name] }}</span>
            </div>

            <div class="w-full md:w-96 mt-4">
              <label for="profile" class="text-md font-helvetica text-black">
                Profile Picture
              </label>
              <input type="file" name="profile" @change="handleFileChange" class="p-2 mt-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
              <span v-if="formErrors.profile" class="text-red-500">{{ formErrors.profile }}</span>
            </div>

            <div class="mt-4 w-full md:w-96">
              <label for="gender" class="text-md font-helvetica text-black">Gender</label>
              <select v-model="user.gender" id="gender" name="gender"
                class="rounded-3xl w-full px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
                <option value="" disabled>Select your gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <span v-if="formErrors.gender" class="text-red-500">{{ formErrors.gender }}</span>
            </div>
          </div>
          <div class="mt-4">
            <label for="bio" class="text-md font-helvetica text-black">Bio</label>
            <textarea
              class="p-2 mt-2 w-full focus:outline-none h-24 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50"
              v-model="user.bio"></textarea>
            <span v-if="formErrors.bio" class="text-red-500">{{ formErrors.bio }}</span>
          </div>
          <div v-if="asArtist">
            <div class="mt-2 md:flex md:flex-wrap md:justify-between">
              <div class="mt-4 w-full md:w-96" v-for="item in artistInputField" :key="item.id">
                <label :for="item.name" class="text-md font-helvetica text-black">
                  {{ item.label }}
                </label>
                <input :type="item.type" :name="item.name" v-model="artist[item.name]" class="p-2 mt-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50" >
                <span v-if="formErrors[item.name]" class="text-red-500">{{ formErrors[item.name] }}</span>
              </div>

              <div class="w-full md:w-96 mt-4">
                <label for="img_cover" class="text-md font-helvetica text-black">
                  Image Cover
                </label>
                <input type="file" name="img_cover" @change="handleCoverChange" class="p-2 mt-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
                <span v-if="formErrors.img_cover" class="text-red-500">{{ formErrors.img_cover }}</span>
              </div>
            </div>
            <div class="mt-6">
              <button
                class="bg-btn-yellow w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-hover-yellow hover:border hover:border-purple-color hover:text-purple-color"
                type="submit">
                  Sign Up
              </button>
              <button
                class="mt-4 bg-btn-yellow w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-hover-yellow hover:border hover:border-purple-color hover:text-purple-color"
                type="button" @click="signAsUser">
                  Sign Up As User
              </button>
            </div>
          </div>
          <div v-else>
            <div class="mt-6">
              <button
                class="bg-btn-yellow w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-hover-yellow hover:border hover:border-purple-color hover:text-purple-color"
                type="submit">
                  Sign Up
              </button>
              <button
                class="mt-4 bg-btn-yellow w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-hover-yellow hover:border hover:border-purple-color hover:text-purple-color"
                type="button" @click="signAsArtist">
                  Sign Up As Artist
              </button>
            </div>
          </div>

          <RouterLink to="/">
            <button
              class="mt-4 bg-btn-yellow w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-hover-yellow hover:border hover:border-purple-color hover:text-purple-color"
              type="button">
                Login
            </button>
          </RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const user = ref({
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  dob: '',
  password: '',
  Repassword: '',
  country: '',
  bio: '',
  gender: '',
  profile: null,
});

const artist = ref({
  stage_name: '',
  img_cover: null,
});

const userInputField = ref([
  { id: '1', name: 'first_name', type: 'text', label: 'First Name' },
  { id: '2', name: 'last_name', type: 'text', label: 'Last Name' },
  { id: '3', name: 'username', type: 'text', label: 'Username' },
  { id: '4', name: 'email', type: 'email', label: 'Email' },
  { id: '5', name: 'password', type: 'password', label: 'Password' },
  { id: '6', name: 'Repassword', type: 'password', label: 'Confirm Password' },
  { id: '7', name: 'dob', type: 'date', label: 'Date of Birth' },
  { id: '8', name: 'country', type: 'text', label: 'Country' },
]);

const artistInputField = ref([
  { id: '1', name: 'stage_name', type: 'text', label: 'Stage Name' },
]);

const asArtist = ref(false);
const formErrors = ref({});

const validateField = (fieldName) => {
  formErrors.value[fieldName] = '';

  if (fieldName === 'password' && user.value.password.length < 8) {
    formErrors.value.password = "Password should be at least 8 characters long.";
  } else if (fieldName === 'Repassword' && user.value.password !== user.value.Repassword) {
    formErrors.value.Repassword = "Passwords do not match.";
  }
};

const handleFileChange = (event) => {
  user.value.profile = event.target.files[0];
};

const handleCoverChange = (event) => {
  artist.value.img_cover = event.target.files[0];
};

const signAsArtist = () => {
  asArtist.value = true;
};

const signAsUser = () => {
  asArtist.value = false;
};

const addUser = () => {
  formErrors.value = {};

  if (user.value.password.length < 8) {
    formErrors.value.password = "Password should be at least 8 characters long.";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(user.value.password)) {
    formErrors.value.password = "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
  }
  if (user.value.password !== user.value.Repassword) {
    formErrors.value.Repassword = "Passwords do not match.";
  }
 if(user.value.username.length <5){
  formErrors.value.username= "Username should be atleast 5 character long.";
 }
if(user.value.first_name.length<5){
  formErrors.value.first_name="firstname shoudl be atleast 5 character long.";
}
if(user.value.last_name.length<5){
  formErrors.value.last_name="lastname should be atleast 5 character long.";
}
if (!user.value.email) {
      formErrors.value.email = "Please provide an email.";
    }
if (!user.value.country){
  formErrors.value.country="Please provide country also.";
}
  if (Object.keys(formErrors.value).length === 0) {
    axios.post('http://127.0.0.1:8000/', {
      // User data
    })
      .then(response => {
        console.log("Registered successfully");
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

<style scoped>
.body {
  background-image: url();
}

.form-img {
  width: 45vw;
  background-image: url('../assets/images/pexels-eric-esma-302047-894156.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
