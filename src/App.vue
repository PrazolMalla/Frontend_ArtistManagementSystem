<template>
  <div class="w-full bg-dark-primary-color">
    <RouterView />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import store from './store/store';

// Reactive state
const API = "http://127.0.0.1:8000/";
const access_token = ref(localStorage.getItem("access_token"));
const refresh_token = ref(localStorage.getItem("refresh_token"));
const userId = ref(localStorage.getItem("userId"));

// Vue Router
const router = useRouter();

onMounted(() => {
    if (refresh_token.value) {
        if (isAccessTokenExpired()) {
            refreshAccessToken();
        } 
    } 
     store.dispatch('setLoggedInUserData')
});

const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${API}api/token/refresh/`, {'refresh': refresh_token.value}, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.status === 200) {
            localStorage.setItem("access_token", response.data.access);
            access_token.value = response.data.access;
            const data = jwtDecode(response.data.access);
            localStorage.setItem("userId", data.user_id);
            userId.value = data.user_id;
        } 
    } catch (error) {
        console.error('Error refreshing access token:', error);
    }
};

const isAccessTokenExpired = () => {
    if (!access_token.value) {
        return true;
    }
    const decodedToken = jwtDecode(access_token.value);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
};
</script>
<style scoped></style>
