<template>
  <div :class="`max-w-4xl mx-auto p-6 bg-${theme}.background shadow-md rounded-lg`">
    <div class="flex justify-end mb-4">
      <select v-model="theme" class="px-4 py-2 border rounded-lg">
        <option value="theme1">Theme 1</option>
        <option value="theme2">Theme 2</option>
      </select>
    </div>
    <div class="flex items-center space-x-6">
      <img
        :src="user.avatar"
        alt="User Avatar"
        class="w-24 h-24 rounded-full border-2"
        :class="`border-${theme}.primary`"
      />
      <div>
        <h2 :class="`text-2xl font-bold text-${theme}.primary`">{{ user.name }}</h2>
        <p :class="`text-${theme}.secondary`">{{ user.email }}</p>
      </div>
    </div>
    <div class="mt-6 space-y-4">
      <h3 :class="`text-xl font-semibold text-${theme}.primary`">Profile Information</h3>
      <p :class="`text-${theme}.primary`">{{ user.bio }}</p>
    </div>
    <div class="mt-6 flex justify-end">
      <button
        @click="isEditing = true"
        :class="`px-4 py-2 bg-${theme}.primary text-white rounded-lg hover:bg-${theme}.secondary transition duration-300`"
      >
        Edit Profile
      </button>
    </div>
    <div v-if="isEditing" class="mt-6">
      <form @submit.prevent="saveProfile">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            v-model="user.name"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Bio</label>
          <textarea
            v-model="user.bio"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            @click="isEditing = false"
            class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
          >
            Cancel
          </button>
          <button type="submit" :class="`px-4 py-2 bg-${theme}.primary text-white rounded-lg`">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        avatar: 'https://via.placeholder.com/150',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.'
      },
      isEditing: false,
      theme: 'theme1' // Default theme
    }
  },
  methods: {
    saveProfile() {
      // Logic to save profile
      this.isEditing = false
    }
  }
}
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
