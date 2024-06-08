<template lang="">
  <div
    class="mt-5 bg-light-primary-color h-[50vh] w-[80vw] p-6 lg:w-[30vw] md:h-[55vh] overflow-y-scroll overflow-x-hidden mb-20 md:w-[65vw] custom-scrollbar"
  >
    <h1 class="mb-4 text-2xl font-semibold md:w-[60vw]">Comments</h1>
    <div class="flex items-center gap-5">
      <img
        :src="`http://127.0.0.1:8000${userData.img_profile}`"
        alt=""
        class="w-14 h-14 border-4 rounded-full border-primary-text-color mt-4 hover:cursor-pointer hover:border-secondary-color"
      />
      <div class="flex flex-col gap-2">
        <input
          type="text"
          v-model="commentBody"
          class="h-9 lg:w-[20vw] w-[40vw] bg-transparent border-b-2 border-secondary-color focus:outline-none placeholder:text-slate-400"
          :placeholder="`Comment as ${userData.firstname}`"
        />
        <button
          @click="commentOnMusic(route.params.id)"
          class="bg-secondary-color rounded-md w-20 h-8 text-sm text-light-primary-color   hover:border hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"
        >
          Comment
        </button>
      </div>
    </div>

    <div v-for="(commenter, index) in comments" :key="index">
      <div class="flex justify-start items-center gap-2 mt-2">
        <img
          :src="`http://127.0.0.1:8000${commenter.user.img_profile}`"
          alt=""
          class="w-14 h-14 border-4 rounded-full border-primary-text-color mt-4 hover:cursor-pointer hover:border-secondary-color"
        />
        <div class="flex flex-col justify-center mt-4 h-24 text-wrap">
          <h2 class="text-lg font-medium">{{ commenter.user.firstname }}</h2>
          <p class="">{{ commenter.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import store from '@/store/store'
import axios from 'axios'
const comments = ref([])
let commentBody = ''
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

const route = useRoute()
const fetchCommentData = async (id) => {
  try {
    console.log(id)
    const response = await axios.get('http://127.0.0.1:8000/api/music/get/comment/' + id + '/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    comments.value = response.data
    console.log(comments)
  } catch (error) {
    console.error('Failed to fetch music data:', error)
  }
}
onMounted(() => {
  fetchCommentData(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => {
    fetchCommentData(newId)
  }
)

const userData = computed(() => {
  return store.getters.getLoggedInUserData
})

const commentOnMusic = async (id) => {
  console.log(id)
  try {
    console.log(id)
    const response = await axios.post(
      `http://127.0.0.1:8000/api/music/comment/`,
      {
        body: commentBody,
        music: id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(response)
    commentBody = ''
    $toast.success('Comment Added', {
      position: 'top-right'
    })
  } catch (error) {
    console.error('Failed to Comment:', error)
  }
}
</script>
<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 0.65rem;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #ece6d5;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #ff4000;
  border-radius: 1rem;
  border: 3px solid #ece6d5;
}
</style>
