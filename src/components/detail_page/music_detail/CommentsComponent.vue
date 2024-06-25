<template lang="">
  <div
    class="mt-5 bg-light-primary-color h-[50vh] w-[80vw] p-6 lg:w-[30vw] md:h-[55vh] overflow-y-scroll overflow-x-hidden mb-20 md:w-[65vw] custom-scrollbar"
  >
    <h1 class="mb-4 text-2xl font-semibold md:w-[60vw]">Comments</h1>
    <div class="flex items-center gap-5">
      <img
        :src="`${base_url}${comment.user.img_profile}`"
        alt=""
        class="w-14 h-14 border-4 rounded-full border-primary-text-color mt-4 hover:cursor-pointer hover:border-secondary-color"
      />
      <div class="flex flex-col gap-2">
        <input
          type="text"
          v-model="commentBody"
          class="h-9 lg:w-[20vw] w-[40vw] bg-transparent border-b-2 border-secondary-color focus:outline-none placeholder:text-primary-text-color"
          :placeholder="`Comment as ${userData.firstname}`"
        />
        <button
          @click="commentOnMusic(route.params.id)"
          class="bg-secondary-color rounded-md w-20 h-8 text-sm text-light-primary-color hover:border hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"
        >
          Comment
        </button>
      </div>
    </div>

    <div v-for="(comment, index) in comments" :key="index">
      <div class="flex justify-start items-center gap-2">
        <img
          :src="`${base_url}${comment.user.img_profile}`"
          alt=""
          class="w-14 h-14 border-4 rounded-full border-primary-text-color mt-4 hover:cursor-pointer hover:border-secondary-color"
        />
        <div class="flex flex-col justify-center mt-4 h-24 text-wrap">
          <h2 class="text-lg font-medium">{{ comment.user.firstname }}</h2>
          <p class="">{{ comment.body }}</p>
        </div>
        <div class="flex items-center gap-2 mt-8">
          <button
            @click="toggleLike(comment.id, index)"
            class="flex items-center gap-1 mt-4 text-sm text-secondary-color hover:underline"
          >
            <v-icon
              :name="comment.liked ? 'bi-suit-heart-fill' : 'bi-suit-heart'"
              :fill="comment.liked ? '#ff4000' : '#302f31'"
              scale="1"
              class="cursor-pointer"
            />
            {{ comment.total_likes }}
          </button>
        </div>
        <div v-if="comment.user.id === userData.id" class="flex items-center gap-2">
          <button
            @click="deleteComment(comment.id)"
            class="mt-12 text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
        <button
          @click="toggleReplies(index)"
          class="mt-12 text-sm text-secondary-color hover:underline"
        >
          {{ showReplies[index] ? 'Hide Replies' : 'Show Replies' }}
        </button>
      </div>
      <div v-if="showReplies[index]" class="pl-10 mt-2">
        <div
          v-for="(reply, replyIndex) in comment.music_comment_replies"
          :key="replyIndex"
          class="flex gap-2 mt-2"
        >
          <img
            :src="`${base_url}${reply.user.img_profile}`"
            alt=""
            class="w-10 h-10 border-4 rounded-full border-primary-text-color hover:cursor-pointer hover:border-secondary-color"
          />
          <div class="flex flex-col justify-center text-wrap">
            <h2 class="text-md font-medium">{{ reply.user.firstname }}</h2>
            <p class="">{{ reply.body }}</p>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <button
              @click="toggleReplyLike(reply.id, index, replyIndex)"
              class="flex items-center gap-1 mt-4 text-sm text-secondary-color hover:underline"
            >
              <v-icon
                :name="reply.liked ? 'bi-suit-heart-fill' : 'bi-suit-heart'"
                :fill="reply.liked ? '#ff4000' : '#302f31'"
                scale="1"
                class="cursor-pointer"
              />
              {{ reply.total_likes }}
            </button>
          </div>
          <div v-if="reply.user.id === userData.id" class="flex items-center gap-2 mt-6">
            <button @click="deleteReply(reply.id)" class="text-sm text-red-600 hover:underline">
              Delete
            </button>
          </div>
        </div>

        <div class="flex items-center gap-2 mt-2">
          <input
            type="text"
            v-model="replies[index].replyBody"
            class="h-8 w-[35vw] bg-transparent border-b-2 border-secondary-color focus:outline-none placeholder:text-primary-text-color"
            :placeholder="`Reply as ${userData.firstname}`"
          />
          <button
            @click="replyToComment(route.params.id, comment.id, index)"
            class="bg-secondary-color rounded-md w-20 h-7 text-sm text-light-primary-color hover:border hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"
          >
            Reply
          </button>
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
const replies = ref([])
const showReplies = ref([])
const base_url  = import.meta.env.VITE_BASE_API_URL;
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

const route = useRoute()
const fetchCommentData = async (id) => {
  try {
    const response = await axios.get(`${base_url}/api/music/get/comment/` + id + '/', {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    comments.value = response.data.map((comment) => ({
      ...comment,
      liked: comment.likes.some((like) => like.user.id === userData.value.id),
      music_comment_replies: comment.music_comment_replies.map((reply) => ({
        ...reply,
        liked: reply.likes.some((like) => like.user.id === userData.value.id)
      }))
    }))
    replies.value = comments.value.map(() => ({ replyBody: '' }))
    showReplies.value = comments.value.map(() => false)

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
  try {
    const response = await axios.post(
      `${base_url}/api/music/comment/`,
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
    commentBody = ''
    $toast.success('Comment Added', {
      position: 'top-right'
    })
    fetchCommentData(id)
  } catch (error) {
    console.error('Failed to Comment:', error)
  }
}

const replyToComment = async (musicId, commentId, index) => {
  try {
    const response = await axios.post(
      `${base_url}/api/music/comment/reply/`,
      {
        body: replies.value[index].replyBody,
        comment: commentId
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      }
    )
    replies.value[index].replyBody = ''
    $toast.success('Reply Added', {
      position: 'top-right'
    })
    fetchCommentData(musicId)
  } catch (error) {
    console.error('Failed to Reply:', error)
  }
}

const toggleReplies = (index) => {
  showReplies.value[index] = !showReplies.value[index]
}

const deleteComment = async (commentId) => {
  try {
    await axios.delete(`${base_url}/api/music/delete/comment/${commentId}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    $toast.success('Comment Deleted', {
      position: 'top-right'
    })
    fetchCommentData(route.params.id)
  } catch (error) {
    console.error('Failed to delete comment:', error)
    $toast.error('Failed to delete comment', {
      position: 'top-right'
    })
  }
}

const deleteReply = async (replyId) => {
  try {
    await axios.delete(`${base_url}/api/music/delete/comment/reply/${replyId}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    $toast.success('Reply Deleted', {
      position: 'top-right'
    })
    fetchCommentData(route.params.id)
  } catch (error) {
    $toast.error('Failed to delete reply', {
      position: 'top-right'
    })
  }
}

const toggleLike = async (commentId, index) => {
  try {
    const response = await axios.post(
      `${base_url}/api/music/likeunlike/comment/${commentId}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      }
    )

    comments.value[index].liked = !comments.value[index].liked
    comments.value[index].total_likes += comments.value[index].liked ? 1 : -1
  } catch (error) {
    console.log(error)
  }
}

const toggleReplyLike = async (replyId, commentIndex, replyIndex) => {
  try {
    const response = await axios.post(
      `${base_url}/api/music/likeunlike/comment/reply/${replyId}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      }
    )

    comments.value[commentIndex].music_comment_replies[replyIndex].liked =
      !comments.value[commentIndex].music_comment_replies[replyIndex].liked
    comments.value[commentIndex].music_comment_replies[replyIndex].total_likes += comments.value[
      commentIndex
    ].music_comment_replies[replyIndex].liked
      ? 1
      : -1
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
