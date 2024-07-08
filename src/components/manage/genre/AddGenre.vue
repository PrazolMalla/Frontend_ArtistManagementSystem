<template>
 <fieldset
    class="border mt-20 border-slate-700 rounded-md absolute sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 m-auto"
  >
    <legend class="ml-10">Add Genre</legend>
     <v-icon
      name="fa-times"
      fill="#302f31"
      scale="1"
      @click="closeAdd"
      class="absolute right-3 cursor-pointer"
    />
    <div
      class="form-container w-full p-10 h-full bg-dark-primary-color flex flex-wrap justify-start gap-3 align-middle"
    >
      
       
        <input
          type="text"
          placeholder="Name"
          v-model="genre.name"
          class="px-5 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black" required
        />
        <select
          v-model="genre.weather"
          class="rounded-3xl px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50" 
        >
          <option value="" disabled>Select Weather</option>
          <option v-for="weather in weatherData" :key="weather" :value="weather">
            {{ weather }}
          </option>
        </select>
      <button
        class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color m-1"
        type="submit"
        @click="addGenre"
      >
        Add Genre
      </button>
    </div>
  </fieldset>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification' 
const emit = defineEmits(['close']);
const weatherData = ref([])
const base_url  = import.meta.env.VITE_BASE_API_URL;
const genre = reactive({
  name: '',
  weather: ''
});

const closeAdd = () => {
  emit('close');
};

  const fetchWeather = async () =>{
          await axios
            .get(`${base_url}/api/genre/get/weather/`)
            .then((response) => {

              weatherData.value = response.data.weather
              console.log(weatherData.value)
            })
            .catch((error) => {
              console.error(error)
            })
    }


const addGenre = () => {
  axios({
    method: 'post',
    url: `${base_url}/api/genre/post/`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    },
    data: {
      "name": genre.name,
      "weather": genre.weather
    }
  })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        useToast().success('Genre is Added', {
          position: 'top-right'
        });
        closeAdd()
      }
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
onMounted(fetchWeather)
</script>

<style scoped></style>
