<template>
    <div class="flex flex-col sm:flex-row items-center h-screen w-full  bg-dark-primary-color " >
      <div class="form-container w-full h-full bg-light-primary-color flex sm:flex-row flex-col">
        <div class="w-full sm:w-[50vw] h-full bg-dark-primary-color flex items-center justify-center">
          <form
            id="form"
            class="w-full sm:w-[400px] h-[500px] flex flex-col justify-center"
            @submit.prevent="login"
          >
            <h1 class="text-4xl font-bold text-center mb-5 font-helvetica text-white">Welcome Back</h1>
            <div class="mt-4">
              <label for="email" class="mt-4  text-xl font-bold font-helvetica text-white">Email</label>
              <br />
              <input
                type="email"
                class="mt-2 p-2 focus:outline-none  w-full h-[3rem]  mb rounded-3xl border-2"
                id="email"
                v-model="user.email"
                required
              />
            </div>
            <div class="mt-4">
              <label for="password" class="text-xl font-bold font-helvetica text-white">Password</label>
              <br />
              <input
                type="password"
                class="p-2 mt-2 focus:outline-none w-full h-[3rem] mb rounded-3xl border-2"
                v-model="user.password"
              />
            </div>
            <div class="mt-6">
                
              <button
                class="bg-secondary-color w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-transparent hover:border hover:border-pink-500 hover:text-pink-500"
                type="submit"
              >
                Login
              </button>
              <div class="relative flex items-center justify-center mt-8 mb-4">
              <hr class="w-full border-transparent">
              <span class="absolute px-3 bg-whites font-medium text-white">Or Create an Account</span>
            </div>
              <router-link to="/signup">
                <button
                  class="mt-4 bg-secondary-color w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-transparent hover:border hover:border-pink-500 hover:text-pink-500"
                  type="button"
                >
                  Sign Up
                </button>
              </router-link>
            </div>
          </form>
        </div>
        <div class="md:flex justify-center items-center hidden p-16">
          <div class="flex justify-center items-center form-img h-screen w-full sm:w-full  rounded-lg">
            <div class="relative w-full h-full flex justify-center items-center">
              <div class="absolute w-[70%] h-[60%] z-10 flex justify-center items-center">
                <h1 class="font-helvetica text-4xl text-white p-10 font-bold">
                  Artistry Amplified
                  <br />
                  <br />
                  <span class="text-white text-4xl font-helvetica font-normal">Revolutionizing the Industry with Our Artist Management System</span>
                </h1>
              </div>
              <div class="absolute w-[80%] h-[10rem] sm:h-[20rem] bg-button-color rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { useToast } from 'vue-toast-notification';

  const router = useRouter();
  const $toast=useToast();
  const user = ref({
    email: '',
    password: ''
  });

  const login = () => {
    axios.post('http://127.0.0.1:8000/api/login/', user.value)
      .then(response => {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        router.push('/');
        
      })
      .catch(error => {
        console.error('Error logging in:', error);
        alert('Invalid credentials. Please try again.');
        // this.$toast.error('Invalid Username or password', {
        //     position: 'top'
        //   });
      });
  };
</script>

  
  <style scoped>
  .body {
    background-image: url();
  }
  
  .form-img {
    width: 45vw;
    height: 95%;
    background-image: url('../assets/background.jpeg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  </style>
  