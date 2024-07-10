<template>
  <PageLayout>
    <template #content>

      <BackgroundBlur v-if="is_blur" />
      <ThemeForm v-if="is_OpenAdd" @close="toggleCloseAdd" />
      <ManageConfirmDialogue v-if="is_OpenDelete" actionQuestion="Do yo want to delete XYZ?"
        actionConfirm="Confirm Delete" @close="toggleCloseDelete" @confirm="confirmDelete" />
      <ThemeForm v-if="is_OpenEdit" :themeId="editThemeId" @close="toggleCloseEdit" />
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
                  Theme
                </h1>
                <div class="text-sm font-bold opacity-70">Total: {{ totalItems }}</div>
              </div>

              <div class="flex items-center space-x-4">
                <SmButton v-if="is_tabShown != 'all'" text="All" @action="toggleList('all', fetchTheme)" />
                <SmButton v-if="is_tabShown != 'deleted'" text="Deleted"
                  @action="toggleList('deleted', fetchDeletedTheme)" />
                <SmSearchbar text="Search Theme..." />
                <SmButton text="Add Theme" @action="toggleOpenAdd" />

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
                <div v-for="theme in themes" :key="theme.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">


                  <ManageDetail :link="true" :id="theme.id" :image="theme.img_profile" :title="theme.name"
                    :subtitle="theme.darkPrimaryColor" type="theme" />

                  <div
                    class="flex w-full justify-around flex-row bg-transparent sm:hidden border-b border-b-primary-text-color">
                    <p v-if="userData">Edit</p>
                    <p v-if="userData">Delete</p>
                  </div>
                  <div class="flex w-full  justify-around items-center">

                    <v-icon class="cursor-pointer" @click="toggleOpenEdit(theme)" name="fa-regular-edit" fill="#00b166"
                      scale="1.5"></v-icon>
                    <v-icon class="cursor-pointer" @click="toggleOpenDelete(theme.id)" name="fa-regular-trash-alt"
                      fill="#ff4000" scale="1.5"></v-icon>
                  </div>
                </div>
                <PaginationCard v-if="totalItems > 1" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchTheme)" />
                <div v-if="totalItems == 0"
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Theme Found</div>
              </div>
              <div v-if="is_tabShown == 'deleted'">
                <div v-for="deletedtheme in deletedThemes" :key="deletedtheme.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                  <div class="flex items-center w-3/6">
                    <ManageDetail :link="true" :id="deletedtheme.id" :image="deletedtheme.img_profile"
                      :title="deletedtheme.name" :subtitle="deletedtheme.darkPrimaryColor" type="theme" />
                  </div>
                  <div class="flex w-full justify-around items-center">
                    <SmButton text="Restore" @action="toggleOpenRestore(deletedtheme.id)" />
                  </div>
                </div>
                <PaginationCard v-if="totalItems > 1" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchDeletedTheme)" />
                <div v-if="totalItems == 0"
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Theme Found</div>
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
import ThemeForm from '@/components/manage/ThemeForm.vue'
import PaginationCard from '@/components/cards/PaginationCard.vue'
import SmSearchbar from '@/components/buttons/sm-searchbar.vue'
import ManageDetail from '@/components/manage/ManageDetail.vue'
import SmButton from '@/components/buttons/sm-button.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import { useToast } from 'vue-toast-notification'
import store from '@/store/store'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
const $toast = useToast()
const userData = computed(() => store.getters.getLoggedInUserData)
const themes = ref([])
const totalItems = ref([0])
const currentPage = ref(1)
const isLoading = ref(false)
const is_tabShown = ref('all')
const deletedThemes = ref([])
const is_blur = ref(false)
const is_OpenAdd = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_OpenRestore = ref(false)
let toDeleteValue = 0
let toRestoreValue = 0
const base_url = import.meta.env.VITE_BASE_API_URL
const editThemeId = ref(null)

function toggleOpenAdd() {
  is_OpenAdd.value = true
  is_blur.value = true
}

function toggleCloseAdd() {
  is_OpenAdd.value = false
  is_blur.value = false
  fetchTheme(currentPage.value)
}

function toggleOpenEdit(theme) {
  is_OpenEdit.value = true
  is_blur.value = true
  editThemeId.value = theme.id
}

function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false
  fetchTheme(currentPage.value)
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
  fetchTheme(currentPage.value)
}

function toggleOpenRestore(restoreId) {
  is_OpenRestore.value = true
  is_blur.value = true
  toRestoreValue = restoreId
}

function toggleCloseRestore() {
  is_OpenRestore.value = false
  is_blur.value = false
  fetchDeletedTheme()
}





const toggleList = async (tabShown, func) => {
  is_tabShown.value = tabShown
  currentPage.value = 1
  func(currentPage.value)
}


const handlePageChange = (page, func) => {
  currentPage.value = page
  func(page)
}



const fetchTheme = async (page = 1) => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/theme/get/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    themes.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching themes:', error)
  } finally {
    isLoading.value = false
  }
}


const fetchDeletedTheme = async (page = 1) => {
  try {
    const response = await axios.get(`${base_url}/api/theme/get/deleted/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    deletedThemes.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching themes:', error)
  }
}

function confirmDelete() {
  axios({
    method: 'delete',
    url: `${base_url}/api/theme/delete/${toDeleteValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      themes.value = themes.value.filter((theme) => theme.id !== toDeleteValue)
      $toast.success('Theme is deleted', {
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
    url: `${base_url}/api/theme/recover/${toRestoreValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      deletedThemes.value = deletedThemes.value.filter((deletedThemes) => deletedThemes.id !== toRestoreValue)
      $toast.success('Theme is Restored', {
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
  fetchTheme(currentPage.value)
})
</script>