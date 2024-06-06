<template>

  <fieldset class="border border-slate-700 rounded-md fixed sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 m-auto">
    <legend class="ml-10 ">Edit Music</legend>
    <v-icon
        name="fa-times"
        fill="#302f31"
        scale="1"
        @click="closeEdit"
        class="absolute right-3 cursor-pointer "
      />
    <div
      class="form-container w-full p-10 h-full  flex flex-wrap justify-center gap-5 align-middle"
    >
      <div
        v-for="item in userInputField"
        :key="item.id"
        class="w-full sm:w-5/12 text-secondary-color"
      >
        <label :for="item.name" class="text-sm font-helvetica text-primary-text-color pl-3">
          {{ item.label }}
        </label>
        <input
          :type="item.type"
          :name="item.name"
          @blur="validateField(item.name)"
          v-model="user[item.name]"
          class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
        />
        <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
          formErrors[item.name]
        }}</span>
      </div>
      <div class="w-full sm:w-2/12 text-secondary-color flex flex-col mt-2">
        <label
          for="img"
          class="cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          >Music Profile Pic</label
        >
        <input type="file" id="img" name="profile" @change="handleFileChange" class="hidden" />

        <span v-if="formErrors.profile" class="text-orange-300 mt-1 pl-3 block text-sm">{{
          formErrors.profile
        }}</span>
      </div>

      <div class="w-full sm:w-2/12 text-secondary-color flex flex-col mt-2">
        <label
          for="img"
          class="cursor-pointer items-center p-2 text-sm text-gray-900 bg-gray-50 rounded-full focus-within:outline-none focus-within:border-hover-yellow focus-within:ring focus-within:ring-btn-yellow focus-within:ring-opacity-50"
          >File(mp3/mp4)</label
        >
        <input type="file" id="img" name="profile" @change="handleFileChange" class="hidden" />

        <span v-if="formErrors.file" class="text-orange-300 mt-1 pl-3 block text-sm">{{
          formErrors.file
        }}</span>
      </div>

      

      <div class="flex flex-col">
        <select
          v-model="user.album"
          id="gender"
          name="album"
          class="rounded-3xl px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50"
        >
          <option value="" disabled>Album</option>
          <option v-for="item in albumData">{{ item.name }}</option>
        </select>
        <span v-if="formErrors.album" class="text-orange-300">{{ formErrors.album }}</span>
      </div>

      <div class="flex flex-col">
        <select
          v-model="user.genre"
          id="gender"
          name="genre"
          class="rounded-3xl px-3 py-2 mt-2 border border-black text-black focus:outline-none focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50"
        >
          <option value="" disabled>Genre</option>
          <option v-for="item in genreData">{{ item.name }}</option>
        </select>
        <span v-if="formErrors.gemre" class="text-orange-300">{{ formErrors.genre }}</span>
      </div>

      <div class="w-full text-center">
        <input type="checkbox" class="w-5" v-model="isArtist" @change="updateIsArtist" />
        <label for="isArtist" class="p-2 text-primary-text-color hover:text-secondary-color"
          >Are you adding this music as (XYZ) Band?</label
        >
      </div>
      <div class="w-full flex justify-center gap-2 align-middle">
        <button
          class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
          type="submit"
          @click="addMusic"
        >
          Edit Music
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

const userInputField = ref([
  { id: '1', name: 'name', type: 'text', label: 'Name' },
  { id: '2', name: 'description', type: 'text', label: 'Description' },
  { id: '3', name: 'language', type: 'text', label: 'Language' },
  { id: '4', name: 'release_at', type: 'date', label: 'Released At' }
]);

const formErrors = ref('');

const store = useStore();
const albumData = computed(() => store.state.albumData);
const genreData = computed(() => store.state.genreData);
import { defineProps, defineEmits } from 'vue';


const emit = defineEmits(['close']);

function closeEdit() {
  emit('close');
}

onMounted(() => {
  store.dispatch('setAlbumData');
  store.dispatch('setGenreData');
});

function validateField(fieldName) {
  formErrors.value[fieldName] = '';
}

function addMusic() {
  formErrors.value = {};
  if (user.value.name.length < 5) {
    formErrors.value.name = 'Username should be at least 5 characters long.';
  }
  if (user.value.description.length < 5) {
    formErrors.value.description = 'Description should be at least 5 characters long.';
  }

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
