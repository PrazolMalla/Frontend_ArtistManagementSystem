<template>
  <PageLayout>
    <template #content>
      <div
        v-if="is_blur"
        class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-center gap-10 items-center"
      ></div>
     

      <div class="text-primary-text-color flex flex-col gap-2 w-full p-2">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">

               <h1 class="text-md sm:text-lg font-bold">
                  All
                    <span v-if="is_disabledShown">Disabled</span>
                  Artist
                </h1>

                <div class="flex items-center gap-3">
                  <SmButton v-if="is_disabledShown" text="All" @action="showAllList" />
                  <SmButton v-else text="Disabled" @action="showDisabledList" />
                 <SmSearchbar text="Search Artist..."/>
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div class="hidden sm:flex flex-row bg-transparent">
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center">
                  <div class="font-semibold" v-if="!is_disabledShown">Disable</div>
                  <div class="font-semibold" v-else>Disable</div>
                </div>
              </div>

              <div v-if="!is_disabledShown" v-for="artist in artists" :key="artist.name"  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                
                 <ManageDetail :link="false" :id="artist.id" :image="artist.img_profile" :title="`${artist.firstname} ${artist.lastname}`" :subtitle="artist.username" type="artist" />
                
               <div class="flex w-full justify-around items-center">
                 <EnableDisable mode="disable" :item="artist" @action="toggleDisableArtist(artist)"/>

              </div>
                </div>


                <div v-else v-for="disabledArtist in disabledArtists" :key="disabledArtists.name"  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                 <ManageDetail :link="true" :id="disabledArtist.id" :image="disabledArtist.img_profile" :title="`${disabledArtist.firstname} ${disabledArtist.lastname}`" :subtitle="disabledArtist.username" type="artist" />
                <div class="flex w-full justify-around items-center">
                  
                  <div class="flex w-full justify-around items-center">
                     <EnableDisable mode="disable" :item="disabledArtist" @action="toggleDisableArtist(disabledArtist)"/>
                  </div>
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
import SmSearchbar from '@/components/buttons/sm-searchbar.vue'
import SmButton from '@/components/buttons/sm-button.vue'
import EnableDisable from '@/components/buttons/enabledisable.vue'
import ManageDetail from '@/components/manage/ManageDetail.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const access_token = localStorage.getItem('access_token');
import { ref, onMounted } from 'vue'
import axios from 'axios'
const artists = ref([])
const disabledArtists = ref([])
const is_disabledShown = ref(false)
const is_blur = ref(false)
const base_url  = import.meta.env.VITE_BASE_API_URL;

const showDisabledList = async () => {
  fetchDisabledArtist()
    is_disabledShown.value = true
}
const showAllList = async () => {
 is_disabledShown.value = false
}


const fetchArtist = async () => {
  try {
    const response = await axios.get(`${base_url}/api/artist/get/`)
    const data = response.data
    artists.value = data
  } catch (error) {
    console.error('Error fetching artists:', error)
  }
}
const fetchDisabledArtist = async () => {
  try {
    const response = await axios.get(`${base_url}/api/artist/get/disabled/`)
    disabledArtists.value = response.data
  } catch (error) {
    console.error('Error fetching Disabled artists:', error)
  }
}


onMounted(() =>{
  fetchArtist()
  fetchDisabledArtist()
})
const toggleDisableArtist = async (artist) => {
  const originalIsDisabled = !artist.is_disabled;
  const newIsDisabled = !originalIsDisabled;
  const action = newIsDisabled ? 'disable' : 'enable';

  const requestUrl = `${base_url}/api/user/${action}/${artist.id}/`;

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

</script>

<style scoped>

</style>
