<template>
  <PageLayout>
    <template #content>
      <div class="text-primary-text-color flex flex-col gap-2">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-3xl font-bold">All Songs</h1>
              <div class="flex items-center space-x-4">
                <div
                  class="hidden md:flex lg:w-[15vw] h-10 my-4 justify-between border border-primary-text-color rounded-full"
                >
                  <input
                    type="text"
                    class="text-sm border-none w-full p-2 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color hidden sm:flex"
                    placeholder="Search Music..."
                  />
                  <v-icon
                    name="md-search"
                    fill="#302f31"
                    scale="1.5"
                    class="cursor-pointer hover:text-gray-950 mt-1 p-1"
                  />
                </div>
                <button
                  class="px-4 py-2 bg-secondary-color text-dark-primary-color rounded-full border-2 hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"
                >
                  Add Music
                </button>
              </div>
            </div>
            <div class="flex mb-4"></div>
            <table class="w-full bg-transparent rounded-lg">
              <thead>
                <tr class="bg-transparent border-b border-b-primary-text-color">
                  <th class="p-4 text-left">Name</th>

                  <th class="p-4 text-left">Release Date</th>
                  <th class="p-4 text-left">Hide/Unhide</th>
                  <th class="p-4 text-left">Enable/Disable</th>
                  <th class="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="song in songs"
                  :key="song.name"
                  class="border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color"
                >
                  <td class="p-4 flex items-center">
                    <img :src="song.image" alt="Song image" class="w-16 h-16 rounded-lg mr-4" />
                    <div>
                      <div class="font-bold text-secondary-color">{{ song.name }}</div>
                      <div class="">{{ song.artist }}</div>
                      <div>{{ song.album }}</div>
                    </div>
                  </td>
                  <td class="p-4">{{ song.releaseDate }}</td>
                  <td class="p-4">
                    <label class="relative inline-flex cursor-pointer items-center">
                      <input id="switch-2" type="checkbox" class="peer sr-only" />
                      <label for="switch-2" class="hidden"></label>
                      <div
                        class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                      ></div>
                    </label>
                  </td>
                  <td class="p-4">
                    <label class="relative inline-flex cursor-pointer items-center">
                      <input id="switch-2" type="checkbox" class="peer sr-only" />
                      <label for="switch-2" class="hidden"></label>
                      <div
                        class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                      ></div>
                    </label>
                  </td>

                  <td class="p-4">
                    <div class="flex gap-6">
                      <v-icon
                        name="fa-regular-edit"
                        fill="#00b166"
                        scale="1.5"
                        class="cursor-pointer"
                      />
                      <v-icon
                        name="fa-regular-trash-alt"
                        fill="#ff4000"
                        scale="1.5"
                        class="cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script setup>
import { ref } from 'vue'
import MusicSingleImage from '@/components/detail_page/MusicSingleImage.vue'
import LyricsComponent from '@/components/detail_page/music_detail/LyricsComponent.vue'
import CardsCarousel from '@/components/detail_page/CardsCarousel.vue'
import CommentComponent from '@/components/detail_page/music_detail/CommentsComponent.vue'

const songs = ref([
  {
    name: 'Wildflowers of California',
    artist: 'Patrick Ono',
    album: 'Raichu',
    releaseDate: '2 days ago',
    image: 'https://source.unsplash.com/800x800/?portrait'
  },
  {
    name: 'Night Towers',
    artist: 'Patrick Ono',
    album: 'Hello',
    releaseDate: 'Jun 16, 2023',
    image: 'https://source.unsplash.com/800x800/?portrait'
  },
  {
    name: 'Winter',
    artist: 'Patrick Ono',
    album: 'RRR',
    releaseDate: 'May 2, 2023',
    image: 'https://source.unsplash.com/800x800/?portrait'
  },
  {
    name: 'Just a Thought',
    artist: 'Patrick Ono',
    album: 'Hello',
    releaseDate: 'Jan 24, 2023',
    image: 'https://source.unsplash.com/800x800/?portrait'
  },
  {
    name: 'Memories',
    artist: 'Patrick Ono',
    album: 'Nirmal',
    releaseDate: 'Jan 6, 2023',
    image: 'https://source.unsplash.com/800x800/?portrait'
  }
])
</script>
