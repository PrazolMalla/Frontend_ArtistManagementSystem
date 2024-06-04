<template>
  <div class="flex flex-col sm:flex-row items-center h-screen w-full bg-dark-primary-color">
    <div class="form-container w-full h-full bg-light-primary-color flex sm:flex-row flex-col">
      <div
        class="w-[90vw] m-auto sm:w-[50vw] h-full bg-dark-primary-color flex items-center justify-center"
      >
        <form
          id="form"
          class="w-full sm:w-[500px] h-[500px] flex flex-col gap-4 justify-center p-10 bg-brown-900 rounded-xl border-4 border-primary-text-color"
          @submit.prevent="login"
        >
          <h1 class="text-4xl font-bold text-center mb-5 font-helvetica text-secondary-color">
            Welcome Back
          </h1>

          <div>
            <label for="email" class="text-sm font-helvetica text-primary-text-color pl-3">
              Email</label
            >
            <input
              type="email"
              class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
              id="email"
              v-model="user.email"
              required
            />
          </div>
          <div>
            <label for="password" class="text-sm font-helvetica text-primary-text-color pl-3">
              Password</label
            >
            <input
              type="password"
              class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
              id="email"
              v-model="user.password"
              required
            />
          </div>
          <div class="w-full flex justify-start gap-2 align-middle items-center">
            <button
              class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-light-primary-color font-semibold text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
              type="submit"
            >
              Login
            </button>
            <div class="text-primary-text-color mt-2">
              <span class="px-2 text-slate-500"> Don't Have an account? </span>
              <RouterLink to="/signup" class="hover:text-secondary-color"> SignUp </RouterLink>
            </div>
          </div>
        </form>
      </div>
      <div class="md:flex justify-center items-center hidden p-16">
        <div class="flex justify-center items-center form-img h-screen w-full sm:w-full rounded-lg">
          <div class="relative w-full h-full flex justify-center items-center">
            <div class="absolute w-[70%] h-[60%] z-10 flex justify-center items-center">
              <h1 class="font-helvetica text-4xl text-light-primary-color p-10 font-bold">
                Artistry Amplified
                <br />
                <br />
                <span class="text-light-primary-color text-4xl font-helvetica font-normal"
                  >Revolutionizing the Industry with Our Artist Management System</span
                >
              </h1>
            </div>
            <div
              class="absolute w-[80%] h-[10rem] sm:h-[20rem] bg-button-color rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import { onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode'

// const access_token =localStorage.getItem("access_token");
const refresh_token = localStorage.getItem('refresh_token')
const router = useRouter()
const $toast = useToast()
const user = ref({
  email: '',
  password: ''
})

const login = () => {
  //  if(user.value.email && user.value.password){
  //       axios
  //         .post(`http://127.0.0.1:8000/api/token/`, user.value, {
  //           headers: {
  //           "content-Type": "application/json",
  //           },
  //         })
  //         .then((response) => {
  //         if(response.status == 200){
  //             localStorage.setItem("refresh_token",response.data.refresh);
  //             localStorage.setItem("access_token",response.data.access);
  //             let data = jwtDecode(response.data.access)
  //             localStorage.setItem("userId", data.user_id)
  //             console.log(data.user_id)
  //             this.$store.dispatch('setUserData')
  //            router.push('/');
  //         }
  //         else if(response.status == 401){
  //           this.$toast.error(response.detail, {
  //               position: 'top'
  //             });
  //         }
  //         })
  //         .catch(error => {
  //           console.error('Error logging in:', error);
  //           alert('Invalid credentials. Please try again.');
  //           this.$toast.error('Invalid Username or password', {
  //               position: 'top'
  //             });
  //         });
  //       }
  //       else{
  //           this.$toast.error('Invalid Username or password', {
  //               position: 'top'
  //             });
  //       }

  axios
    .post('http://127.0.0.1:8000/api/login/', user.value)
    .then((response) => {
      const accessToken = response.data.access_token
      const refreshToken = response.data.refresh_token
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)

      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

      router.push('/')
    })
    .catch((error) => {
      console.error('Error logging in:', error)
      alert('Invalid credentials. Please try again.')
      // this.$toast.error('Invalid Username or password', {
      //     position: 'top'
      //   });
    })
}
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
