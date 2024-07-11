<template lang="">
  <div
    class="lg:w-1/2 rounded-lg bg-light-primary-color  p-6 h-full md:h-[60vh] overflow-y-scroll  custom-scrollbar"
  >
    <h1 class="mb-4 text-md font-semibold ">Comments</h1>
    <div class="flex items-center gap-5">
     
      <div class="flex w-full flex-col gap-2">
        <input
          type="text"
          v-model="commentBody"
          class="text-sm bg-transparent border-b-2 border-secondary-color focus:outline-none placeholder:text-primary-text-color"
          :placeholder="`Comment as ${userData.firstname}`"
        />
        <button
          @click="commentOnMusic(route.params.id)"
          class="bg-secondary-color p-1 rounded-full w-20 text-xs text-light-primary-color border hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"
        >
          Comment
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-3 mt-3">
    <div v-for="(comment, index) in comments" :key="index" class="flex flex-col items-center w-full">
     

         <div class="flex justify-between items-center gap-2 w-full">
            <div class="flex gap-2 items-center  k w-full ">

                <img :src="`${base_url}${comment?.user?.img_profile}`" alt=""  class="w-8 h-8 border-2 rounded-full border-primary-text-color hover:cursor-pointer hover:border-secondary-color" />
                <div class="flex flex-col justify-center text-wrap">
                  <TextTruncate  :text="comment.body" length="25" class="text-sm"/>
                  <h2 class="text-xs font-medium">{{ comment.user.firstname }}  <span v-if="comment.total_likes"> - {{ comment.total_likes }} Likes</span></h2>
                </div>
            </div>

            <div class="flex gap-2 ">
              
                <v-icon @click="toggleLike(comment.id, index)"
                  :name="comment.liked ? 'fa-heart' : 'fa-regular-heart'"
                  :fill="comment.liked ? '#ff4000' : '#302f31'"
                  scale="1"
                  class="cursor-pointer"
                />
                <v-icon v-if="comment.user.id === userData.id" @click="deleteComment(comment.id)"
                  name="fa-trash"
                  fill="#302f31"
                  scale="1"
                  class="cursor-pointer"
                />

                <v-icon @click="toggleReplies(index)"
                  :name="showReplies[index] ? 'md-cancel' : 'fa-reply'"
                  fill="#302f31"
                  scale="1"
                  class="cursor-pointer"
                />
            </div>
         </div>
          
      <div v-if="showReplies[index]" class="flex flex-col items-center w-full mt-3 pl-10 gap-3">
        <div  v-for="(reply, replyIndex) in comment.music_comment_replies"  :key="replyIndex" class="flex justify-between items-center gap-2 w-full" >
          
            <div class="flex gap-2 items-center  k w-full ">

                <img :src="`${base_url}${reply?.user?.img_profile}`" alt=""  class="w-8 h-8 border-2 rounded-full border-primary-text-color hover:cursor-pointer hover:border-secondary-color" />
                <div class="flex flex-col justify-center text-wrap">
                  <TextTruncate  :text="reply.body" length="25" class="text-sm" />
                  <h2 class="text-xs font-medium">{{ reply.user.firstname }}  <span v-if="reply.total_likes"> - {{ reply.total_likes }} Likes</span></h2>
                </div>
            </div>

            <div class="flex gap-2 ">
              
                <v-icon @click="toggleReplyLike(reply.id, index, replyIndex)"
                  :name="reply.liked ? 'fa-heart' : 'fa-regular-heart'"
                  :fill="reply.liked ? '#ff4000' : '#302f31'"
                  scale="1"
                  class="cursor-pointer"
                />
                <v-icon v-if="comment.user.id === userData.id" @click="deleteReply(reply.id)"
                  name="fa-trash"
                  fill="#302f31"
                  scale="1"
                  class="cursor-pointer"
                />
            </div>
         
        </div>


        <div class="flex w-full flex-col gap-2">
          <input
            type="text"
            v-model="replies[index].replyBody"
            class="text-sm bg-transparent border-b-2 border-secondary-color focus:outline-none placeholder:text-primary-text-color"
            :placeholder="`Reply as ${userData.firstname}`"
          />
          <button
            @click="replyToComment(route.params.id, comment.id, index)"
            class="bg-secondary-color p-1 rounded-full w-20 text-xs text-light-primary-color border hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"
          >
            Reply
          </button>
      </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import TextTruncate from '@/components/buttons/TextTruncate.vue'
import { ref, onMounted, watch, computed } from 'vue'
import store from '@/store/store'
import axios from 'axios'

const comments = ref([])
let commentBody = ''
const replies = ref([])
const showReplies = ref([])
const base_url = import.meta.env.VITE_BASE_API_URL;
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
  }
}
</script>

<style scoped></style>
