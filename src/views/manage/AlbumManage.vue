<template>
  <PageLayout>
    <template #content>
      <BackgroundBlur v-if="is_blur" />
      <AlbumForm v-if="is_OpenAdd" @close="toggleCloseAdd" />
      <ManageConfirmDialogue v-if="is_OpenDelete" :actionQuestion="`Do yoy want to delete ${itemName}?`"
        actionConfirm="Confirm Delete" @close="toggleCloseDelete" @confirm="confirmDelete" />
      <AlbumForm v-if="is_OpenEdit" :albumId="editAlbumId" @close="toggleCloseEdit" />
      <ManageConfirmDialogue v-if="is_OpenRestore" :actionQuestion="`Do you want to restore ${itemName}?`"
        actionConfirm="Confirm Restore" @close="toggleCloseRestore" @confirm="confirmRestore" />
      <div class="text-primary-text-color flex flex-col gap-2 w-full">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <div class="flex flex-col">
                <h1 class="text-lg font-bold">
                  All
                  <span v-if="is_tabShown == 'deleted'">Deleted</span>
                  <span v-if="is_tabShown == 'disabled'">Disabled</span>
                  <span v-if="is_tabShown == 'hidden'">Hidden</span>
                  Albums
                </h1>
                <div class="text-sm font-bold opacity-70">Total: {{ totalItems }}</div>
              </div>
              <div class="flex items-center space-x-4">
                <SmButton v-if="is_tabShown != 'deleted' && userData.is_artist" text="Deleted"
                  @action="toggleList('deleted', fetchDeletedAlbum)" />
                <SmButton v-if="is_tabShown != 'disabled' && userData.is_staff" text="Disabled"
                  @action="toggleList('disabled', fetchDisabledAlbum)" />
                <SmButton v-if="is_tabShown != 'hidden' && userData.is_artist" text="Hidden"
                  @action="toggleList('hidden', fetchHiddenAlbum)" />
                <SmButton v-if="is_tabShown != 'all'" text="All" @action="toggleList('all', fetchAlbum)" />
                <SmSearchbar text="Search Album..." />
                <SmButton v-if="userData.is_artist" text="Add Album" @action="toggleOpenAdd" />
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div class="hidden sm:flex flex-row bg-transparent border-b border-b-primary-text-color">
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center">
                  <div class="font-semibold" v-if="userData.is_artist & is_tabShown == 'all'">Hide</div>
                  <div class="font-semibold" v-if="userData.is_staff & is_tabShown == 'all'">Disable</div>
                  <div class="font-semibold" v-if="is_tabShown == 'deleted'">Restore</div>
                  <div class="font-semibold" v-if="is_tabShown == 'disabled'">Disable</div>
                  <div class="font-semibold" v-if="is_tabShown == 'hidden'">Hide</div>
                  <div class="font-semibold" v-if="userData.is_artist & is_tabShown == 'all'">Edit</div>
                  <div class="font-semibold" v-if="userData.is_artist & is_tabShown == 'all'">Delete</div>
                </div>
              </div>
              <div v-if="is_tabShown == 'all'">
                <div v-for="album in albums" :key="album.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                  <ManageDetail :link="album.is_disabled" :id="album.id" :image="album.img_profile" :title="album.name"
                    :subtitle="album.artist_name" type="album" />
                  <div
                    class="flex w-full justify-around flex-row bg-transparent sm:hidden border-b border-b-primary-text-color">
                    <p v-if="userData.is_artist">Hide</p>
                    <p v-if="userData.is_staff">Disable</p>
                    <p v-if="userData.is_artist">Edit</p>
                    <p v-if="userData.is_artist">Delete</p>
                  </div>
                  <div class="flex w-full  justify-around items-center">

                    <EnableDisable v-if="userData.is_artist" mode="hide" :item="album"
                      @action="toggleHideAlbum(album)" />
                    <EnableDisable v-if="userData.is_staff" mode="disable" :item="album"
                      @action="toggleDisableAlbum(album)" />

                    <v-icon v-if="userData.is_artist" class="cursor-pointer" @click="toggleOpenEdit(album)"
                      name="fa-regular-edit" fill="#00b166" scale="1.5"></v-icon>
                    <v-icon v-if="userData.is_artist" class="cursor-pointer" @click="toggleOpenDelete(album)"
                      name="fa-regular-trash-alt" fill="#ff4000" scale="1.5"></v-icon>
                  </div>
                </div>


                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchAlbum)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Album Found</div>
              </div>




              <div v-if="is_tabShown == 'hidden'">
                <div v-for="hiddenalbum in hiddenAlbums" :key="hiddenalbum.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                  <ManageDetail :link="hiddenalbum.is_disabled" :id="hiddenalbum.id" :image="hiddenalbum.img_profile"
                    :title="hiddenalbum.name" :subtitle="hiddenalbum.artist_name" type="album" />

                  <div class="flex w-full justify-around items-center">
                    <EnableDisable mode="hide" :item="hiddenalbum" @action="toggleHideAlbum(hiddenalbum)" />
                  </div>
                </div>


                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchHiddenAlbum)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Album Found</div>
              </div>






              <div v-if="is_tabShown == 'disabled'">

                <div v-for="disabledalbum in disabledAlbums" :key="disabledalbum.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">

                  <ManageDetail :link="true" :id="disabledalbum.id" :image="disabledalbum.img_profile"
                    :title="disabledalbum.name" :subtitle="disabledalbum.artist_name" type="album" />
                  <div class="flex w-full justify-around items-center">
                    <EnableDisable mode="disable" :item="disabledalbum" @action="toggleDisableAlbum(disabledalbum)" />

                  </div>

                </div>

                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchDisabledAlbum)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Album Found</div>
              </div>



              <div v-if="is_tabShown == 'deleted'">
                <div v-for="deletedalbum in deletedAlbums" :key="deletedalbum.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">

                  <ManageDetail :link="true" :id="deletedalbum.id" :image="deletedalbum.img_profile"
                    :title="deletedalbum.name" :subtitle="deletedalbum.artist_name" type="album" />

                  <div class="flex w-full justify-around items-center">
                    <SmButton text="Restore" @action="toggleOpenRestore(deletedalbum)" />
                  </div>
                </div>


                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchDeletedAlbum)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Album Found</div>
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
import BackgroundBlur from '@/components/cards/BackgroundBlur.vue'
import PaginationCard from '@/components/cards/PaginationCard.vue'
import SmSearchbar from '@/components/buttons/sm-searchbar.vue'
import SmButton from '@/components/buttons/sm-button.vue'
import AlbumForm from '@/components/manage/AlbumForm.vue'
import EnableDisable from '@/components/buttons/enabledisable.vue'
import ManageDetail from '@/components/manage/ManageDetail.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import { useToast } from 'vue-toast-notification'
import store from '@/store/store'
const base_url = import.meta.env.VITE_BASE_API_URL;
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
const $toast = useToast()
const access_token = localStorage.getItem('access_token')
const userData = computed(() => store.getters.getLoggedInUserData)
const albums = ref([])
const is_tabShown = ref("all")
const deletedAlbums = ref([])
const disabledAlbums = ref([])
const hiddenAlbums = ref([])
const is_blur = ref(false)
const is_OpenAdd = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_OpenRestore = ref(false)
const isLoading = ref(false)
const totalItems = ref([0])
const currentPage = ref([1])
let toDeleteValue = 0
let toRestoreValue = 0
const itemName = ref()

const handlePageChange = (page, func) => {
  currentPage.value = page
  func(page)
}


const editAlbumId = ref(null)
function toggleOpenAdd() {
  is_OpenAdd.value = true
  is_blur.value = true
}
function toggleCloseAdd() {
  is_OpenAdd.value = false
  is_blur.value = false
  fetchAlbum()
}
function toggleOpenEdit(album) {
  is_OpenEdit.value = true
  is_blur.value = true
  editAlbumId.value = album.id

}
function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false
  fetchAlbum()
}
function toggleOpenDelete(deletevalue) {
  is_OpenDelete.value = true
  is_blur.value = true
  toDeleteValue = deletevalue.id
  itemName.value = deletevalue.name
  fetchDeletedAlbum()

}
function toggleCloseDelete() {
  is_OpenDelete.value = false
  is_blur.value = false
}

function toggleOpenRestore(restore) {
  is_OpenRestore.value = true
  is_blur.value = true
  toRestoreValue = restore.id
  itemName.value = restore.name
}
function toggleCloseRestore() {
  is_OpenRestore.value = false
  is_blur.value = false
}

const toggleList = async (tabShown, func) => {
  is_tabShown.value = tabShown
  currentPage.value = 1
  func(currentPage.value)
}

const fetchAlbum = async (page = 1) => {
  isLoading.value = true
  try {
    let data
    if (!userData.value.is_artist) {
      const response = await axios.get(`${base_url}/api/album/get/manage/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          page: page,
          page_size: 10
        }
      })
      data = response.data.results
      totalItems.value = response.data.count
    } else {
      const response = await axios.get(`${base_url}/api/album/get/loggedin/manage/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          page: page,
          page_size: 10
        }
      })
      data = response.data.results
      totalItems.value = response.data.count
    }
    albums.value = data
  } catch (error) {
    console.error('Error fetching Albums:', error)
  } finally {
    isLoading.value = false
  }
}


const fetchDeletedAlbum = async (page = 1) => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/album/get/deleted/manage/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    deletedAlbums.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching Album:', error)
  } finally {
    isLoading.value = false
  }
}



const fetchDisabledAlbum = async (page = 1) => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/album/get/disabled/manage/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    disabledAlbums.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching Album:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchHiddenAlbum = async (page = 1) => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/album/get/hidden/manage/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    hiddenAlbums.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching Album:', error)
  } finally {
    isLoading.value = false
  }
}





const toggleHideAlbum = async (album) => {
  const originalIsHidden = !album.is_hidden
  const newIsHidden = !originalIsHidden
  const action = newIsHidden ? 'hide' : 'unhide'

  const requestUrl = `${base_url}/api/album/${action}/${album.id}/`

  try {
    await axios.delete(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    $toast.success(`Album will be ${newIsHidden ? 'hidden' : 'visible'} to public`)
  } catch (error) {
    console.error(error)
    $toast.error(`Error occur while making album ${newIsHidden ? 'hidden' : 'visible'}`)
    album.is_hidden = originalIsHidden
  }
}


const toggleDisableAlbum = async (album) => {
  const originalIsDisabled = !album.is_disabled
  const newIsDisabled = !originalIsDisabled
  const action = newIsDisabled ? 'disable' : 'enable'

  const requestUrl = `${base_url}/api/album/${action}/${album.id}/`

  try {
    await axios.delete(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    $toast.success(`Album is made ${newIsDisabled ? 'disable' : 'enable'}`)
  } catch (error) {
    console.error(error)
    $toast.error(`Error occur while making album ${newIsDisabled ? 'disable' : 'enable'}`)
    album.is_disabled = originalIsDisabled
  }
}
function confirmDelete() {
  axios({
    method: 'delete',
    url: `${base_url}/api/album/delete/${toDeleteValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      albums.value = albums.value.filter((album) => album.id !== toDeleteValue)
      $toast.success('Album is deleted', {
        position: 'top-right'
      })
      console.log(response)
      if (response.status === 200) {
        is_OpenDelete.value = false
        is_blur.value = false
      }
    })
    .catch((err) => {
      console.log(err.response.data)
    })
}


function confirmRestore() {
  axios({
    method: 'delete',
    url: `${base_url}/api/album/recover/${toRestoreValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      deletedAlbums.value = deletedAlbums.value.filter((deletedAlbums) => deletedAlbums.id !== toRestoreValue)
      $toast.success('Album is Restored', {
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

onMounted(() => {
  fetchAlbum(currentPage.value)
})
</script>

<style scoped></style>
