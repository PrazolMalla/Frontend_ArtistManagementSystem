<template>
  <div class="flex justify-evenly items-center min-h-screen w-full bg-dark-primary-color p-5">
      <div class="form-container  w-full p-10 h-full bg-dark-primary-color  flex flex-wrap justify-start gap-5  align-middle">
                <div v-for="item in userInputField" :key="item.id" class="w-full sm:w-5/12   text-white">
                  <label :for="item.name" class="text-sm  font-helvetica text-slate-300 pl-3">
                        {{ item.label }}
                      </label>
                    <input :type="item.type" :name="item.name" @blur="validateField(item.name)" v-model="user[item.name]"  class="p-2  focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black" >
                    <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{ formErrors[item.name] }}</span>
                </div>
                   <div class="w-full sm:w-3/12  text-white flex flex-col mt-2">
                      <label for="img" class="cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50">Profile Pic</label>
                      <input type="file" id="img" name="profile" @change="handleFileChange"  class="hidden " >

                      <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{ formErrors.profile }}</span>
                    </div>
                <div class="w-full sm:w-3/12   text-white flex flex-col  mt-2">
                      <label for="img" class="cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50">Cover Pic</label>
                      <input type="file" id="img" name="profile" @change="handleFileChange"  class="hidden " >

                      <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{ formErrors.profile }}</span>
                    </div>

                <div class="flex flex-col">
                  <select v-model="user.gender" id="gender" name="gender"
                    class="rounded-3xl  px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
                    <option value="" disabled>Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                  <span v-if="formErrors.gender" class="text-orange-300">{{ formErrors.gender }}</span>
                </div>
                <div class="w-full text-center">
                  <input type="checkbox" class="w-5" v-model="isArtist" @change="updateIsArtist">
                  <label for="isArtist"  class=" p-2 text-slate-100 hover:text-secondary-color" >Are you signing  as an Artist?</label>
                </div>
                <div class="w-full flex justify-center gap-2 align-middle">
                      <button
                      class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
                      type="submit" @click="addUser">
                        Sign Up
                    </button>
                      <div class="text-slate-300 mt-2 ">
                       <span class="px-2 text-slate-500 "> or </span>
                    <RouterLink to="/" class="hover:text-secondary-color">
                        Login
                    </RouterLink>
                  </div>
                </div>

      </div>


      <div class="form-img hidden md:flex rounded-lg"></div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';

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
  gender: '',
  img_profile: null,
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
     const RegisterSubmit = ()  => {
      axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/user/post/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          "email": user.email, "username":  user.username, "password": user.password, "firstname":  user.firstname, "lastname":  user.lastname, "dob": user.dob, "gender":  user.gender, "country": user.country, "img_profile": user.img_profile, "is_artist": user.is_artist
            },
      }).then(response => {
        console.log(response)
        if(response.status == 200){
                      localStorage.setItem("refresh_token",response.data.refreshJWT);
                      localStorage.setItem("access_token",response.data.accessJWT);
                      this.$router.push('/dashboard')
        }
      }).catch(err => {
        console.log(err.response.data)
      });
    }
}
}
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