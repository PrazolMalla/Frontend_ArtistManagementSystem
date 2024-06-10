<template>
  <fieldset
    class="border border-slate-700 rounded-md absolute sm:w-[60vw] ml-0 lg:ml-10 bg-dark-primary-color overflow-hidden z-40 m-auto"
  >
    <legend class="ml-10">Add Album</legend>

    <v-icon
      name="fa-times"
      fill="#302f31"
      scale="1"
      @click="closeAdd"
      class="absolute right-3 top-3 cursor-pointer"
    />
    <div class="form-container w-full p-10 h-full flex flex-wrap justify-center gap-5 align-middle">
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
          v-if="item.type !== 'file'"
        />
        <input
          type="file"
          :name="item.name"
          @change="handleFileChange"
          class="p-2 focus:outline-none w-full h-10 mb rounded-3xl border border-black focus:border-hover-yellow focus:ring focus:ring-btn-yellow focus:ring-opacity-50 text-black"
          v-else
        />
        <span v-if="formErrors[item.name]" class="text-orange-300 pl-3 text-sm">{{
          formErrors[item.name]
        }}</span>
      </div>

      <div class="w-full flex justify-center gap-2 align-middle">
        <button
          class="bg-btn-yellow h-10 w-2/6 hover:text-secondary-color text-slate-200 text-md rounded-full hover:border hover:bg-transparent border-secondary-color bg-secondary-color"
          type="submit"
          @click.prevent="addAlbum"
        >
          Add Album
        </button>
      </div>
    </div>
  </fieldset>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()

export default {
  emits: ['close'],
  data() {
    return {
      user: {
        name: '',
        description: '',
        img_profile: null
      },
      userInputField: [
        { id: '1', name: 'name', type: 'text', label: 'Name' },
        { id: '2', name: 'description', type: 'text', label: 'Description' },
        { id: '3', name: 'img_profile', type: 'file', label: 'Profile Image' }
      ],
      formErrors: {}
    }
  },
  methods: {
    closeAdd() {
      this.$emit('close')
    },

    validateField(fieldName) {
      this.formErrors[fieldName] = ''
    },

    addAlbum() {
      this.formErrors = {}

      if (this.user.name.length < 5) {
        this.formErrors.name = 'Name should be at least 5 characters long.'
      }
      if (this.user.description.length < 5) {
        this.formErrors.description = 'Description should be at least 5 characters long.'
      }

      if (Object.keys(this.formErrors).length === 0) {
        const formData = new FormData()
        formData.append('name', this.user.name)
        formData.append('description', this.user.description)
        formData.append('img_profile', this.user.img_profile)

        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/api/album/post/`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'multipart/form-data', 
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
          .then((response) => {
            console.log(response)
            this.closeAdd()
            this.user = {
              name: '',
              description: '',
              img_profile: null
            }

            $toast.success('Album Added', {
              position: 'top-right'
            })
            this.closeAdd()
            this.user = {
              name: '',
              description: '',
              img_profile: null
            }
          })
          .catch((err) => {
            console.log(err.response)
          })
      }
    },

    handleFileChange(event) {
      this.user.img_profile = event.target.files[0]
    }
  }
}
</script>

<style scoped></style>
