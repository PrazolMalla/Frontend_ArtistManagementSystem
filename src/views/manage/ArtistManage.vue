<template>
  <PageLayout>
    <template #content>
      <div
        v-if="is_blur"
        class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-center gap-10 items-center"
      ></div>
      <ManageConfirmDialogue
        v-if="is_OpenRestore"
        actionQuestion="Do yo want to restore XYZ?"
        actionConfirm="Confirm Restore"
        @close="toggleCloseRestore"
        @confirm="confirmRestore"
      />

      <div class="text-primary-text-color flex flex-col gap-2 w-full p-2">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-lg sm:text-3xl font-bold"  v-if="!is_deletedShown">All Artists</h1>
              <h1 class="text-lg sm:text-3xl font-bold" v-else>All Deleted Artists</h1>
              <div class="flex items-center gap-3">
                 <div v-if="!is_deletedShown" @click="showDeletedList" class="border text-sm bg-secondary-color text-dark-primary-color  p-2 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none"> Show Deleted</div>
               <div v-if="is_deletedShown" @click="showAllList" class="border text-sm bg-secondary-color text-dark-primary-color  p-2 rounded-md hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Show All</div>
                
                <div
                  class="md:flex lg:w-[15vw] h-10 my-4 justify-between border border-primary-text-color rounded-full"
                >
                
                  <input
                    type="text"
                    class="text-sm border-none w-full p-2 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color hidden sm:flex"
                    placeholder="Search Artist..."
                  />
                  <v-icon
                    name="md-search"
                    fill="#302f31"
                    scale="1.5"
                    class="cursor-pointer hover:text-gray-950 mt-1 p-1"
                  />
                </div>
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div class="hidden sm:flex flex-row bg-transparent">
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center">
                  <div class="font-semibold" v-if="!is_deletedShown">Disable</div>
                  <div class="font-semibold" v-else>Restore</div>
                </div>
              </div>

              <div v-if="!is_deletedShown" v-for="artist in artists" :key="artist.name"  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <router-link :to="`/artist/${artist.id}`" class="flex items-center w-3/6">
                  <img
                    :src="`http://127.0.0.1:8000${artist.img_profile}`"
                    alt="Artist image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ artist.firstname }} {{ artist.lastname }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ artist.username }}</div>
                    </div>
                  </div>
                </router-link>
                
                <div class="flex w-full justify-around items-center">
                
                    <label class="relative inline-flex cursor-pointer items-center">
                      <input :id="'disableswitch-'+ artist.id" type="checkbox" v-model="artist.is_disabled" @change="toggleDisableArtist(artist)" class="peer sr-only" />
                      <label :for="'disableswitch-'+ artist.id" class="hidden"></label>
                      <div
                        class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                      ></div>
                    </label>
                  </div>
                </div>




                <div v-else v-for="deletedArtist in deletedArtists" :key="deletedArtists.name"  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <div class="flex items-center w-3/6">
                  <img
                    :src="`http://127.0.0.1:8000${deletedArtist.img_profile}`"
                    alt="Artist image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ deletedArtist.firstname }} {{ deletedArtist.lastname }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ deletedArtist.username }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="flex w-full justify-around items-center">
                  <div @click="toggleOpenRestore(deletedArtist.id)" v-if="true" class="border border-secondary-color  rounded bg-secondary-color hover:text-secondary-color hover:bg-transparent text-sm p-1 text-dark-primary-color">Restore</div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
  
    </template>
  </PageLayout>
</template>

<script setup>
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const access_token = localStorage.getItem('access_token');
import { ref, onMounted } from 'vue'
import axios from 'axios'
const artists = ref([])
const deletedArtists = ref([])
const is_deletedShown = ref(false)
const is_blur = ref(false)
const is_OpenRestore = ref(false)
let toRestoreValue = 0

function toggleCloseRestore() {
  is_OpenRestore.value = false
  is_blur.value = false
}

function toggleOpenRestore(id) {
  is_OpenRestore.value = true
  is_blur.value = true
  toRestoreValue = id
}

const showDeletedList = async () => {
    is_deletedShown.value = true
}
const showAllList = async () => {
 is_deletedShown.value = false
}


const fetchArtist = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/artist/get/')
    const data = response.data
    artists.value = data
  } catch (error) {
    console.error('Error fetching artists:', error)
  }
}
const fetchDeletedArtist = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/artist/get/deleted/')
    const data = response.data
    deletedArtists.value = data
  } catch (error) {
    console.error('Error fetching Deleted artists:', error)
  }
}


onMounted(() =>{
  fetchArtist()
  fetchDeletedArtist()
})
const toggleDisableArtist = async (artist) => {
  const originalIsDisabled = !artist.is_disabled;
  const newIsDisabled = !originalIsDisabled;
  const action = newIsDisabled ? 'disable' : 'enable';

  const requestUrl = `http://127.0.0.1:8000/api/user/${action}/${artist.id}/`;

  try {
    await axios.delete(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    $toast.success(`Artist is made ${newIsDisabled ? 'disable' : 'enable'}`);
  } catch (error) {
    console.error(error);
    $toast.error(`Error occur while making artist ${newIsDisabled ? 'disable' : 'enable'}`);
    artist.is_disabled = originalIsDisabled;
  }
}
function confirmRestore() {
  axios({
    method: 'delete',
    url: `http://127.0.0.1:8000/api/user/recover/${toRestoreValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      deletedArtists.value = deletedArtists.value.filter((deletedArtists) => deletedArtists.id !== toRestoreValue)
      $toast.success('Artist is Restored', {
        position: 'top-right'
      })
      console.log(response)
      if (response.status === 200) {
        is_OpenRestore.value = false
        is_blur.value = false
      }
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}


</script>

<style scoped>
.bggradientpopup {
  background: #ffffff3f;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
