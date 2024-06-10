<template>
  <div v-if="weather" class="w-full mx-auto text-center my-10 p-5 rounded-md" :class="weatherClass">
    <button v-if="!location" @click="getLocation" class="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded">
      Get Location
    </button>
    <div v-if="weather">
      <div class="flex flex-col gap-3">
      
          <div class="flex  justify-between items-center">
            <p class="text-xl font-bold">{{ weather.main.temp }}°</p>
          <p class="text-xl">{{ weather.name }}</p>
          <p class="text-lg">{{ weather.weather[0].main }}</p>
          <p class="text-lg">{{ timeOfDay }}</p>
      
          <v-icon :name="getWeatherIcon" scale="2"/>
          </div>
          <div class="flex flex-col gap-5">
              <div class="flex flex-col  gap-2 items-start flex-wrap">
                <p class="text-lg text-gray-text-color">Recommended Genre</p>
                <div class="flex gap-2">
                  <router-link to="/genre/" class="flex flex-col bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-white border-blue-500 hover:text-blue-500 text-white" v-for="genre in genreData">
                   {{ genre.name }}
                  </router-link>
                </div>
              </div>

              <div class="flex flex-col  gap-2 items-start flex-wrap">
                  <p class="text-lg text-gray-text-color">Recommended Music</p>
                  <div class="flex gap-2">
                   <MusicCard v-for="music in musicData" :key="music.id" class="p-5" :musicData="music" linkto="music"/></div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import MusicCard from '../cards/MusicCard-2.vue';
import axios from 'axios';
    const location = ref(null);
    const error = ref(null);
    const weather = ref(null);
    const genreData = ref(null);
    const musicData = ref(null);

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      } else {
        error.value = "Geolocation is not supported by this browser.";
      }
    };

    const successCallback = (position) => {
      location.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      localStorage.setItem('location', JSON.stringify(location.value));
      fetchWeatherData(location.value.latitude, location.value.longitude);
      error.value = null;
    };

    const errorCallback = (err) => {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          error.value = "User denied the request for Geolocation.";
          break;
        case err.POSITION_UNAVAILABLE:
          error.value = "Location information is unavailable.";
          break;
        case err.TIMEOUT:
          error.value = "The request to get user location timed out.";
          break;
        case err.UNKNOWN_ERROR:
          error.value = "An unknown error occurred.";
          break;
      }
    };

    
    const fetchGenre = async (weatherMain) =>{
          await axios
            .get(`http://127.0.0.1:8000/api/genre/get/weather/${weatherMain}`)
            .then((response) => {
              genreData.value = response.data
            })
            .catch((error) => {
              console.error(error)
            })
    }
    const fetchMusic = async (weatherMain) =>{
          await axios
            .get(`http://127.0.0.1:8000/api/music/get/weather/${weatherMain}`)
            .then((response) => {
              musicData.value = response.data
            })
            .catch((error) => {
              console.error(error)
            })
    }

    const fetchWeatherData = async (lat, lon) => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat,
            lon,
            exclude: 'minutely,hourly',
            units: 'metric',
            appid: '3cf62da66ab3f658628dc40ed4a8bb97'
          }
        });
        weather.value = response.data;
        fetchGenre(response.data.weather[0].main)
        fetchMusic(response.data.weather[0].main)
      } catch (err) {
        error.value = "Failed to fetch weather data.";
      }
    };

    const getWeatherIcon = computed(() => {
      if (!weather.value) return '';
      const weatherId = weather.value.weather[0].id;
      if (weatherId >= 200 && weatherId < 300) {
        return 'md-thunderstorm';
      } else if (weatherId >= 300 && weatherId < 500) {
        return 'md-rainy';
      } else if (weatherId >= 500 && weatherId < 600) {
        return 'md-rainy-heavy';
      } else if (weatherId >= 600 && weatherId < 700) {
        return 'md-snowy';
      } else if (weatherId >= 700 && weatherId < 800) {
        return 'md-foggy';
      } else if (weatherId === 800) {
        return 'md-sunny';
      } else if (weatherId > 800) {
        return 'md-cloudy';
      } else {
        return 'md-weather-warning';
      }
    });

    const weatherClass = computed(() => {
      if (!weather.value) return '';
      const main = weather.value.weather[0].main.toLowerCase();
      switch (main) {
        case 'clear':
          return 'bg-gradient-to-r from-blue-400 via-blue-300 to-orange-500 text-white';
        case 'clouds':
          return 'bg-gradient-to-r from-gray-400 via-gray-300 to-orange-500 text-white';
        case 'rain':
          return 'bg-gradient-to-r from-blue-500 via-blue-600 to-orange-500 text-white';
        case 'drizzle':
          return 'bg-gradient-to-r from-blue-200 via-blue-300 to-orange-500 text-white';
        case 'thunderstorm':
          return 'bg-gradient-to-r from-purple-400 via-purple-500 to-orange-500 text-white';
        case 'snow':
          return 'bg-gradient-to-r from-gray-100 via-gray-200 to-orange-500 text-black';
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
          return 'bg-gradient-to-r from-gray-300 via-gray-400 to-orange-500 text-black';
        default:
          return 'bg-gradient-to-r from-gray-400 via-gray-500 to-orange-500 text-white';
      }
    });

    const timeOfDay = computed(() => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) {
        return 'Morning';
      } else if (hour >= 12 && hour < 18) {
        return 'Afternoon';
      } else if (hour >= 18 && hour < 24) {
        return 'Evening';
      } else {
        return 'Night';
      }
    });

    onMounted(() => {
      const savedLocation = localStorage.getItem('location');
      if (savedLocation) {
        const parsedLocation = JSON.parse(savedLocation);
        location.value = parsedLocation;
        fetchWeatherData(parsedLocation.latitude, parsedLocation.longitude);
      } else {
        getLocation();
      }
    });

</script>

<style scoped>
</style>
