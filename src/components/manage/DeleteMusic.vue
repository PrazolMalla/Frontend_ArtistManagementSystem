<template>

  <fieldset class="border border-slate-700 rounded-md fixed sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 mt-20">
    <legend class="ml-10 ">Delete Music</legend>
    <v-icon
        name="fa-times"
        fill="#302f31"
        scale="1"
        @click="closeDelete"
        class="absolute right-3 cursor-pointer "
      />
    <div
      class="form-container w-full p-10 h-full  flex flex-wrap justify-center gap-5 align-middle"
    >
    <p class="text-xl">Are you sure you want to delete XYZ Music?</p>
      <div class="w-full flex justify-center gap-2 align-middle">
        <button
          class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
          type="submit"
          @click="deleteMusic"
        >
          Confirm Deletion
        </button>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

const user = ref({
  name: '',
  description: '',
  language: '',
  release_at: '',
  album: '',
  artist: '',
  band: '',
  genre: '',
  img_profile: null,
  music_file: null,
});


const emit = defineEmits(['close']);

function closeDelete() {
  emit('close');
}


function deleteMusic() {


  if (Object.keys(formErrors.value).length === 0) {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/user/post/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: user.value.email,
        username: user.value.username,
        password: user.value.password,
        firstname: user.value.firstname,
        lastname: user.value.lastname,
        dob: user.value.dob,
        gender: user.value.gender,
        country: user.value.country,
        img_profile: user.value.img_profile,
        is_artist: user.value.is_artist,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem('refresh_token', response.data.refreshJWT);
          localStorage.setItem('access_token', response.data.accessJWT);
          this.$router.push('/dashboard');
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
}

</script>

<style scoped></style>
