<template>
  <PageLayout>
    <template #content>
      <BackgroundBlur v-if="is_blur" />


      <div class="text-primary-text-color flex flex-col gap-2 w-full p-2">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <div class="flex flex-col">
                <h1 class="text-lg font-bold">
                  All
                  <span v-if="is_tabShown == 'disabled'">Disabled</span>
                  <span v-if="is_tabShown == 'deleted'">Deleted</span>
                  Artist
                </h1>
                <div class="text-sm font-bold opacity-70">Total: {{ totalItems }}</div>
              </div>

              <div class="flex items-center gap-3 ">
                <IconButton v-if="is_tabShown != 'deleted'" state="danger" name="fa-trash"
                  @action="toggleList('deleted', fetchDeletedArtist)" />
                <IconButton v-if="is_tabShown != 'disabled'" state="danger" name="md-disabledvisible-sharp"
                  @action="toggleList('disabled', fetchDisabledArtist)" />
                <SmButton v-if="is_tabShown != 'all'" text="All" @action="toggleList('all', fetchArtist)" />
                <SmSearchbar text="Search Artist..." @action="searchArtist" />
              </div>
            </div>

            <div class="flex flex-col justify-between ">
              <div class="hidden sm:flex flex-row bg-transparent border-b border-b-primary-text-color py-2">
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center">
                  <div class="font-semibold" v-if="is_tabShown == 'all' | is_tabShown == 'disabled'">Disable</div>
                </div>
              </div>

              <div v-if="is_tabShown == 'all'">
                <div v-for="artist in artists" :key="artist.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">

                  <ManageDetail :link="false" :id="artist.id" :image="artist.img_profile"
                    :title="`${artist.firstname} ${artist.lastname}`" :subtitle="artist.username" type="artist" />

                  <div class="flex w-full justify-around items-center">
                    <EnableDisable mode="disable" :item="artist" @action="toggleDisableArtist(artist)" />

                  </div>
                </div>
                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchArtist)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Artist Found</div>

              </div>


              <div v-if="is_tabShown == 'disabled'">

                <div v-for="disabledArtist in disabledArtists" :key="disabledArtists.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                  <ManageDetail :link="true" :id="disabledArtist.id" :image="disabledArtist.img_profile"
                    :title="`${disabledArtist.firstname} ${disabledArtist.lastname}`"
                    :subtitle="disabledArtist.username" type="artist" />
                  <div class="flex w-full justify-around items-center">

                    <div class="flex w-full justify-around items-center">
                      <EnableDisable mode="disable" :item="disabledArtist"
                        @action="toggleDisableArtist(disabledArtist)" />
                    </div>
                  </div>
                </div>
                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchDisabledArtist)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Artist Found</div>
              </div>





              <div v-if="is_tabShown == 'deleted'">

                <div v-for="deletedArtist in deletedArtists" :key="deletedArtists.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                  <ManageDetail :link="true" :id="deletedArtist.id" :image="deletedArtist.img_profile"
                    :title="`${deletedArtist.firstname} ${deletedArtist.lastname}`" :subtitle="deletedArtist.username"
                    type="artist" />
                  <div class="flex w-full justify-around items-center">

                    <div class="flex w-full justify-around items-center">
                      <EnableDisable mode="disable" :item="deletedArtist"
                        @action="toggleDisableArtist(deletedArtist)" />
                    </div>
                  </div>
                </div>
                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchDeletedArtist)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Artist Found</div>
              </div>


              <div class="mb-32"></div>
            </div>
          </div>
        </div>
      </div>

    </template>
  </PageLayout>
</template>

<script setup>
import IconButton from '@/components/buttons/icon-button.vue'
import BackgroundBlur from '@/components/cards/BackgroundBlur.vue'
import PaginationCard from '@/components/cards/PaginationCard.vue'
import SmSearchbar from '@/components/buttons/sm-searchbar.vue'
import SmButton from '@/components/buttons/sm-button.vue'
import EnableDisable from '@/components/buttons/enabledisable.vue'
import ManageDetail from '@/components/manage/ManageDetail.vue'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const access_token = localStorage.getItem('access_token');
import { ref, onMounted } from 'vue'
import axios from 'axios'
const artists = ref([])
const totalItems = ref(0)
const currentPage = ref(1)
const isLoading = ref(false)
const disabledArtists = ref([])
const deletedArtists = ref([])
const is_tabShown = ref("all")
const is_blur = ref(false)
const base_url = import.meta.env.VITE_BASE_API_URL;


const handlePageChange = (page, func) => {
  currentPage.value = page
  func(page)
}

const searchArtist = (text) => {
  if (is_tabShown.value == "all") fetchArtist(1, text)
  else if (is_tabShown.value == "disabled") fetchDisabledArtist(1, text)
  else if (is_tabShown.value == "deleted") fetchDeletedArtist(1, text)
}

const toggleList = async (tabShown, func) => {
  is_tabShown.value = tabShown
  currentPage.value = 1
  func(currentPage.value)
}


const fetchArtist = async (page = 1, text = '') => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/artist/get/manage/?search=${text}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    artists.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching artists:', error)
  }

  isLoading.value = false
}
const fetchDisabledArtist = async (page = 1, text = '') => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/artist/get/disabled/manage/?search=${text}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    disabledArtists.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching Disabled artists:', error)
  }

  isLoading.value = false
}

const fetchDeletedArtist = async (page = 1, text = '') => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/artist/get/deleted/manage/?search=${text}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    deletedArtists.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching Deleted artists:', error)
  }

  isLoading.value = false
}


onMounted(() => {
  fetchArtist(currentPage.value)
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

<style scoped></style>
