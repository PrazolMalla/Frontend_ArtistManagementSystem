<template>

  <div class="flex flex-row items-center lg:h-screen h-full w-full bg-dark-primary-color p-5">
      <div class="form-container md:w-5/6 w-full p-10 h-full bg-dark-primary-color  flex flex-wrap justify-start gap-5  align-middle">
                <div v-for="item in userInputField" :key="item.id" class="w-full sm:w-5/12   text-white">
                  <label :for="item.name" class="text-md font-helvetica text-white">
                        {{ item.label }}
                      </label>
                    <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="user[item.name]"  class="p-2  focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black" >
                    <span v-if="formErrors[item.name]" class="text-orange-500">{{ formErrors[item.name] }}</span>
                </div>
                   <div class="w-full sm:w-3/12  text-white flex flex-col mt-2">
                      <label for="img" class="cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50">Profile Pic</label>
                      <input type="file" id="img" name="profile" @change="handleFileChange"  class="hidden " >

                      <span v-if="formErrors.profile" class="text-orange-500 mt-1 block">{{ formErrors.profile }}</span>
                    </div>
                <div class="w-full sm:w-3/12   text-white flex flex-col  mt-2">
                      <label for="img" class="cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50">Cover Pic</label>
                      <input type="file" id="img" name="profile" @change="handleFileChange"  class="hidden " >

                      <span v-if="formErrors.profile" class="text-orange-500 mt-1 block">{{ formErrors.profile }}</span>
                    </div>

                <div class="flex flex-col">
                  <select v-model="user.gender" id="gender" name="gender"
                    class="rounded-3xl  px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
                    <option value="" disabled>Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                  <span v-if="formErrors.gender" class="text-orange-500">{{ formErrors.gender }}</span>
                </div>
                <div class="w-full text-center">
                  <input type="checkbox" class="w-5" v-model="isArtist" @change="updateIsArtist">
                  <label for="isArtist"  class=" p-2 text-slate-100" >Are you signing  as an Artist?</label>
                </div>
                <div class="w-full flex justify-center gap-2 align-middle">
                      <button
                      class="bg-btn-yellow h-10 w-2/6 text-white text-md rounded-full border border-slate-color"
                      type="submit">
                        Sign Up
                    </button>
                      <div class="text-slate-300 mt-2 ">
                       <span class="px-2 text-slate-500"> or </span>
                    <RouterLink to="/">
                        Login
                    </RouterLink>
                  </div>
                </div>

      </div>


      <div class="form-img hidden md:flex"></div>
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
    formErrors.value.first_name="Firstname should be atleast 5 characters long.";
  }
  if(user.value.last_name.length<5){
    formErrors.value.last_name="Lastname should be atleast 5 characters long.";
  }
  if (!user.value.email) {
    formErrors.value.email = "Please provide an email.";
  }
  if (!user.value.country){
    formErrors.value.country="Please provide your country.";
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
  height:90vh;
  background-image: url('../assets/images/bobmarley.webp');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>