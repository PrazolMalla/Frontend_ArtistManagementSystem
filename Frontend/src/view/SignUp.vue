<template>
    <div class="flex flex-row items-center h-screen w-full">
      <div class="form-container w-full h-full bg-white flex flex-row">
        <div class=" flex justify-center items-center">
          <div class="flex justify-center items-center  h-[90%] form-img hidden sm:block w-4/5 my-8 ml-24 rounded-lg">
        </div>
      </div>
        <div class="w-[55vw] h-full  sm:mx-12 mx-auto sm:mr-24 bg-white flex items-center justify-center">
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
                <input :type="item.type" :name="item.name" @blur="" v-model="user[item.name]"  class="p-2 mt-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50" required >
              </div>

              <div class="w-full md:w-96 mt-4">
                <label for="profile" class="text-md font-helvetica text-black">
                  Profile Picture
                </label>
                <input type="file" name="profile" v-on="user.profile"  class="p-2 mt-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50" >
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
            </div>
          </div>
            <div class="mt-4">
              <label for="bio" class="text-md font-helvetica text-black">Bio</label>
              <textarea
                class="p-2 mt-2 w-full focus:outline-none  h-24 mb rounded-3xl border  border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50"
                v-model="user.bio">
              </textarea>
            </div>
            <div v-if="asartist">
              <div v-if="formErrors.length > 0" class="text-red-500">
                <ul>
                  <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
                </ul>
              </div>
              <div class="mt-6">
                <button
                  class="bg-btn-yellow w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-hover-yellow hover:border hover:border-purple-color hover:text-purple-color"
                  type="submit">
                    SignUp
                </button>
                  <button
                  class="mt-4 bg-btn-yellow w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-hover-yellow hover:border hover:border-purple-color hover:text-purple-color"
                  type="submit" @click="SignUser()">
                    Sign Up As Artist
                </button>
              </div>
            </div>
            <div v-else>
              <div class="mt-2 md:flex md:flex-wrap md:justify-between">
                <div class="mt-4 w-full md:w-96 " v-for="item in artistInputField" :key="item.id">
                  <label :for="item.name" class="text-md font-helvetica text-black">
                    {{ item.label }}
                  </label>
                  <input :type="item.type" :name="item.name" v-model="artist[item.name]" class="p-2 mt-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50" required>
                </div>
             
              <div class="w-full md:w-96 mt-4">
                <label for="img_cover" class="text-md font-helvetica text-black">
                  Image Cover
                </label>
                <input type="file" name="img_cover" v-on="user.profile"  class="p-2 mt-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50" >
              </div>
            </div>
              <div v-if="formErrors.length > 0" class="text-red-500">
                <ul>
                  <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
                </ul>
              </div>
              <div class="mt-6">
                <button
                  class="bg-btn-yellow w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-hover-yellow hover:border hover:border-purple-color hover:text-purple-color"
                  type="submit">
                    SignUp
                </button>
                  <button
                  class="mt-4 bg-btn-yellow w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-hover-yellow hover:border hover:border-purple-color hover:text-purple-color"
                  type="submit" @click="SignArtist()">
                    Sign Up As User
                </button>
              </div>
             
            </div>

              <RouterLink to="/">
                  <button
                  class="mt-4 bg-btn-yellow w-full h-[3rem] text-white text-xl font-bold rounded-3xl hover:bg-hover-yellow hover:border hover:border-purple-color hover:text-purple-color"
                  type="submit">
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
    const user = ref({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        dob: '',
        password: '',
        Repassword: '',
        country: '',
        bio:'',
        gender:'',
        profile:null,

    });
    const artist = ref({
      stage_name: '',
      img_cover: null,
    });

    const userInputField = ref([
      { id: '1', name: 'first_name', type: 'text', label: 'First Name'},
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

    const asartist=ref(false);
    const SignArtist= ()=>{
        asartist.value=true;
    };
    const SignUser= ()=>{
        asartist.value=false;
    };
    const formErrors=ref([])
    const addUser = () => {
      formErrors.value = [];
        if (user.value.password.length < 8) {
          formErrors.value.push("Password should be at least 8 characters long.");
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(user.value.password)) {
          formErrors.value.push("Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        }
        if (user.value.password !== user.value.Repassword) {
          formErrors.value.push("Passwords do not match.");
        }
  
      if (formErrors.value.length === 0) {
          axios.post('http://127.0.0.1:8000/', {
              
          })
          .then(response => {
              console.log("registered");
          })
          .catch(error => {
              console.error(error);
          });
      }
  };
</script>
 <!--    <script>
    export default {
      data() {
        return {
          user: {
            email: '',
            first_name: '',
            last_name: '',
            dob: '',
            gender: '',
            country: '',
            password: ''
          }
        };
      },
      methods: {
        async signup() {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/artists/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.user)
            });
    
            if (response.ok) {
              const data = await response.json();
              console.log('Artist created successfully:', data);
              this.$router.push('/');
            } else {
              const errorData = await response.json();
              console.error('Error creating artist:', errorData);
            }
          } catch (error) {
            console.error('Network error:', error);
          }
        }
      }
    };
    </script> -->
    
  
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