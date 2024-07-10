<template>
    <fieldset
        class="border border-border-color rounded-md absolute z-10 ml-[5vw] w-[90vw] sm:w-[60vw] sm:ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden  m-auto px-5 pb-5">
        <CloseButton @action="emit('close')" />
        <div
            class="form-container w-full p-10 h-full bg-dark-primary-color flex flex-wrap justify-start gap-3 align-middle">


            <input type="text" placeholder="Name" v-model="genre.name"
                class="px-2 p-1 focus:outline-none w-full text-xs mb rounded-3xl border border-border-color focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-primary-text-color"
                required />
            <select v-model="genre.weather"
                class="rounded-3xl p-1 border border-border-color text-xs primary-text-colo focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50">
                <option value="" disabled>Select Weather</option>
                <option v-for="weather in weatherData" :key="weather" :value="weather">
                    {{ weather }}
                </option>
            </select>
            <button
                class="bg-btn-yellow h-7 w-2/6 text-sm hover:text-secondary-color text-light-primary-color rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
                type="submit" @click="confirm">
                Edit Genre
            </button>
        </div>
    </fieldset>
</template>

<script setup>
import CloseButton from '@/components/buttons/CloseButton.vue'
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const emit = defineEmits(['close']);
const weatherData = ref([])
const access_token = localStorage.getItem('access_token')
const base_url = import.meta.env.VITE_BASE_API_URL;
const genre = ref({
    name: '',
    weather: ''
});
const props = defineProps({
    genreId: {
        type: Number,
        required: true
    }
})

const fetchWeather = async () => {
    await axios
        .get(`${base_url}/api/genre/get/weather/`)
        .then((response) => {

            weatherData.value = response.data.weather
        })
        .catch((error) => {
            console.error(error)
        })
}

const fetchGenreData = async () => {
    try {
        const response = await axios.get(`${base_url}/api/genre/get/${props.genreId}/`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        genre.value = response.data
    } catch (error) {
        console.error('Error fetching genre data:', error)
    }

}

const confirm = () => {
    if (props.genreId) {
        axios.patch(`${base_url}/api/genre/edit/${props.genreId}/`, genre.value, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then((response) => {
                $toast.success('Genre Updated', {
                    position: 'top-right'
                })
                emit('close')
            })
            .catch((error) => {
                $toast.error('Error Updating Genre')
            })
    }
    else {
        axios.post(`${base_url}/api/genre/add/`, genre.value, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((response) => {
            $toast.success('Genre Added', {
                position: 'top-right'
            })
            emit('close')
        }).catch((error) => {
            $toast.error('Error Adding Genre')
        })
    }
}


onMounted(() => {
    fetchWeather()
    if (props.genreId) fetchGenreData()
})

</script>
