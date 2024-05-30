<template>
     <aside class="bg-gray-900 text-white w-64 p-4 hidden sm:block h-lvh">
          <nav class="space-y-4">
            <router-link to="/home" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Home</router-link>
            <router-link to="/profile" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Profile</router-link>
            <router-link to="/my_songs" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">My Songs</router-link>
            <router-link to="/upload_song" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Upload Song</router-link>
            <router-link to="/" class="block px-4 py-2 text-lg font-medium hover:bg-gray-700 rounded">Logout</router-link>
          </nav>
        </aside>
</template>