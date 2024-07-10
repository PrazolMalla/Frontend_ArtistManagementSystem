<template>
  <PageLayout>
    <template #content>
      <BackgroundBlur v-if="is_blur" />
      <EditGenre v-if="is_OpenAdd" @close="toggleCloseAdd" />
      <ManageConfirmDialogue v-if="is_OpenDelete" actionQuestion="Do yo want to delete XYZ?"
        actionConfirm="Confirm Delete" @close="toggleCloseDelete" @confirm="confirmDelete" />
      <EditGenre v-if="is_OpenEdit" :genreId="editGenreId" @close="toggleCloseEdit" />
      <ManageConfirmDialogue v-if="is_OpenRestore" actionQuestion="Do yo want to restore XYZ?"
        actionConfirm="Confirm Restore" @close="toggleCloseRestore" @confirm="confirmRestore" />

      <div class="text-primary-text-color flex flex-col gap-2 w-full  ">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <div class="flex flex-col">
                <h1 class="text-lg font-bold">
                  All
                  <span v-if="is_tabShown == 'deleted'">Deleted</span>
                  Genre
                </h1>
                <div class="text-sm font-bold opacity-70">Total: {{ totalItems }}</div>
              </div>

              <div class="flex items-center space-x-4">
                <IconButton v-if="is_tabShown != 'deleted'" state="danger" name="fa-trash"
                  @action="toggleList('deleted', fetchDeletedGenre)" />
                <SmButton v-if="is_tabShown != 'all'" text="All" @action="toggleList('all', fetchGenre)" />

                <SmSearchbar text="Search Genre..." @action="searchGenre" />
                <IconButton @action="toggleOpenAdd" state="success" name="fa-plus" />

              </div>
            </div>

            <div class="flex flex-col justify-between">

              <div class="hidden sm:flex flex-row bg-transparent border-b border-b-primary-text-color">
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center font-semibold ">
                  <div v-if="is_tabShown == 'deleted'">Restore</div>
                  <div v-if="is_tabShown == 'all'">Edit</div>
                  <div v-if="is_tabShown == 'all'">Delete</div>
                </div>
              </div>

              <div v-if="is_tabShown == 'all'">

                <div v-for="genre in genres" :key="genre.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">

                  <ManageDetail :link="true" :id="genre.id" :title="genre.name" :subtitle="genre.weather"
                    type="genre" />

                  <div
                    class="flex w-full justify-around flex-row bg-transparent sm:hidden border-b border-b-primary-text-color">
                    <p>Edit</p>
                    <p>Delete</p>
                  </div>
                  <div class="flex w-full  justify-around items-center">

                    <IconButton @action="toggleOpenEdit(genre)" name="fa-regular-edit" state="success" />
                    <IconButton @action="toggleOpenDelete(genre.id)" name="fa-regular-trash-alt" state="danger" />
                  </div>
                </div>
                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchGenre)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Genre Found</div>
              </div>
              <div v-if="is_tabShown == 'deleted'">
                <div v-for="deletedgenre in deletedGenres" :key="deletedgenre.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                  <div class="flex items-center w-3/6">

                    <ManageDetail :link="true" :id="deletedgenre.id" :title="deletedgenre.name"
                      :subtitle="deletedgenre.weather" type="genre" />
                  </div>
                  <div class="flex w-full justify-around items-center">
                    <IconButton @action="toggleOpenRestore(deletedgenre.id)" name="fa-trash-restore" state="success" />
                  </div>
                </div>
                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchDeletedGenre)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Genre Found</div>
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
import ManageDetail from '@/components/manage/ManageDetail.vue'
import SmButton from '@/components/buttons/sm-button.vue'
import EditGenre from '@/components/manage/GenreForm.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import { useToast } from 'vue-toast-notification'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
const $toast = useToast()
const genres = ref([])
const totalItems = ref([0])
const currentPage = ref([1])
const isLoading = ref(false)
const is_tabShown = ref("all")
const deletedGenres = ref([])
const is_blur = ref(false)
const is_OpenAdd = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_OpenRestore = ref(false)
let toDeleteValue = 0
let toRestoreValue = 0
const base_url = import.meta.env.VITE_BASE_API_URL
const editGenreId = ref(null)


const handlePageChange = (page, func) => {
  currentPage.value = page
  func(page)
}

const searchGenre = (text) => {
  if (is_tabShown.value == "all") fetchGenre(1, text)
  else if (is_tabShown.value == "deleted") fetchDeletedGenre(1, text)
}

function toggleOpenAdd() {
  is_OpenAdd.value = true
  is_blur.value = true
}

function toggleCloseAdd() {
  is_OpenAdd.value = false
  is_blur.value = false
  fetchGenre(currentPage.value)
}

function toggleOpenEdit(genre) {
  is_OpenEdit.value = true
  is_blur.value = true
  editGenreId.value = genre.id
}

function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false
  fetchGenre(currentPage.value)
}

function toggleOpenDelete(deletevalue) {
  is_OpenDelete.value = true
  is_blur.value = true
  toDeleteValue = deletevalue
}

function toggleCloseDelete() {
  is_OpenDelete.value = false
  is_blur.value = false
  console.log(currentPage.value)
  fetchGenre(currentPage.value)
}

function toggleOpenRestore(restoreId) {
  is_OpenRestore.value = true
  is_blur.value = true
  toRestoreValue = restoreId
}

function toggleCloseRestore() {
  is_OpenRestore.value = false
  is_blur.value = false
  fetchDeletedGenre()
}



const toggleList = async (tabShown, func) => {
  is_tabShown.value = tabShown
  currentPage.value = 1
  func(currentPage.value)
}


const fetchGenre = async (page = 1, text = '') => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/genre/get/manage/?search=${text}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    genres.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching genres:', error)
  } finally {
    isLoading.value = false
  }
}


const fetchDeletedGenre = async (page = 1, text = '') => {
  try {
    const response = await axios.get(`${base_url}/api/genre/get/deleted/manage/?search=${text}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    deletedGenres.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching genres:', error)
  }
}

function confirmDelete() {
  axios({
    method: 'delete',
    url: `${base_url}/api/genre/delete/${toDeleteValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      genres.value = genres.value.filter((genre) => genre.id !== toDeleteValue)
      $toast.success('Genre is deleted', {
        position: 'top-right'
      })
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
    url: `${base_url}/api/genre/recover/${toRestoreValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      deletedGenres.value = deletedGenres.value.filter((deletedGenres) => deletedGenres.id !== toRestoreValue)
      $toast.success('Genre is Restored', {
        position: 'top-right'
      })
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
  fetchGenre(currentPage.value)
})
</script>
