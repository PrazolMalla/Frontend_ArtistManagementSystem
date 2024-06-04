<template>
  <fieldset class="border border-slate-700 rounded-md">
    <legend class="ml-10">Add Album</legend>
    <div
      class="form-container w-full p-10 h-full bg-dark-primary-color flex flex-wrap justify-start gap-5 align-middle"
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

export default {
  data() {
    return {
      user: {
        name: '',
        description: '',
      },
      userInputField: [
        { id: '1', name: 'name', type: 'text', label: 'Name' },
        { id: '2', name: 'description', type: 'text', label: 'Description' },
      ],
      formErrors: {},
    }
  },
  methods: {
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
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/api/album/post/`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: this.user
        })
          .then((response) => {
            console.log(response)
            if (response.status == 200) {
              localStorage.setItem('refresh_token', response.data.refreshJWT)
              localStorage.setItem('access_token', response.data.accessJWT)
              this.$router.push('/dashboard')
            }
          })
          .catch((err) => {
            console.log(err.response.data)
          })
      }
    }
  }
}
</script>

<style scoped></style>
