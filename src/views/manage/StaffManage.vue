<template>
  <PageLayout>
    <template #content>
      <BackgroundBlur v-if="is_blur" />
      <StaffForm v-if="is_OpenAdd" @close="toggleCloseAdd" />
      <ManageConfirmDialogue v-if="is_OpenDelete" actionQuestion="Do yo want to delete XYZ?"
        actionConfirm="Confirm Delete" @close="toggleCloseDelete" @confirm="confirmDelete" />
      <StaffForm v-if="is_OpenEdit" :staffId="editStaffId" @close="toggleCloseEdit" />
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
                  <span v-if="is_tabShown == 'disabled'">Disabled</span>
                  Staff
                </h1>
                <div class="text-sm font-bold opacity-70">Total: {{ totalItems }}</div>
              </div>

              <div class="flex items-center space-x-4">
                <IconButton v-if="is_tabShown != 'deleted'" state="danger" name="fa-trash"
                  @action="toggleList('deleted', fetchDeletedStaff)" />
                <IconButton v-if="is_tabShown != 'disabled'" @action="toggleList('disabled', fetchDisabledStaff)"
                  state="danger" name="md-disabledvisible-sharp" />
                <SmButton v-if="is_tabShown != 'all'" text="All" @action="toggleList('all', fetchStaff)" />
                <SmSearchbar text="Search Staff..." @action="searchStaff" />
                <IconButton @action="toggleOpenAdd" state="success" name="fa-plus" />

              </div>
            </div>

            <div class="flex flex-col justify-between">

              <div class="hidden sm:flex flex-row bg-transparent border-b border-b-primary-text-color">
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center font-semibold ">
                  <div v-if="is_tabShown == 'deleted'">Restore</div>
                  <div v-if="is_tabShown == 'all' || is_tabShown == 'disabled'">Disable</div>
                  <div v-if="is_tabShown == 'all'">Edit</div>
                  <div v-if="is_tabShown == 'all'">Delete</div>
                </div>
              </div>

              <div v-if="is_tabShown == 'all'">

                <div v-for=" staff in staffs" :key="staff.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">

                  <ManageDetail :link="true" :id="staff.id" :image="staff.img_profile"
                    :title="`${staff.firstname} ${staff.lastname}`" :subtitle="`@${staff.username}`" type="staff" />

                  <div
                    class="flex w-full justify-around flex-row bg-transparent sm:hidden border-b border-b-primary-text-color">
                    <p>Disable</p>
                    <p>Edit</p>
                    <p>Delete</p>
                  </div>
                  <div class="flex w-full  justify-around items-center">
                    <EnableDisable mode="disable" :item="staff" @action="toggleDisableStaff(staff)" />
                    <IconButton @click="toggleOpenEdit(staff)" name="fa-regular-edit" state="success" />
                    <IconButton @click="toggleOpenDelete(staff.id)" name="fa-regular-trash-alt" state="danger" />
                  </div>
                </div>
                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchStaff)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Staff Found</div>
              </div>
              <div v-if="is_tabShown == 'disabled'">
                <div v-for="disabledstaff in disabledStaffs" :key="disabledstaff.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">


                  <ManageDetail :link="true" :id="disabledstaff.id" :image="disabledstaff.img_profile"
                    :title="`${disabledstaff.firstname} ${disabledstaff.lastname}`"
                    :subtitle="`@${disabledstaff.username}`" type="staff" />
                  <div class="flex w-full justify-around items-center">
                    <EnableDisable mode="disable" :item="disabledstaff" @action="toggleDisableStaff(disabledstaff)" />
                  </div>
                </div>
                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchDisabledStaff)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Album Found</div>
              </div>

              <div v-if="is_tabShown == 'deleted'">
                <div v-for="deletedstaff in deletedStaffs" :key="deletedstaff.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                  <div class="flex items-center w-3/6">

                    <ManageDetail :link="true" :id="deletedstaff.id" :image="deletedstaff.img_profile"
                      :title="`${deletedstaff.firstname} ${deletedstaff.lastname}`"
                      :subtitle="`@${deletedstaff.username}`" type="staff" />
                  </div>
                  <div class="flex w-full justify-around items-center">
                    <IconButton @action="toggleOpenRestore(deletedstaff.id)" name="fa-trash-restore" state="success" />
                  </div>
                </div>
                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchDeletedStaff)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Staff Found</div>
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
import StaffForm from '@/components/manage/StaffForm.vue'
import EnableDisable from '@/components/buttons/enabledisable.vue'
import PaginationCard from '@/components/cards/PaginationCard.vue'
import SmSearchbar from '@/components/buttons/sm-searchbar.vue'
import ManageDetail from '@/components/manage/ManageDetail.vue'
import SmButton from '@/components/buttons/sm-button.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import { useToast } from 'vue-toast-notification'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const access_token = localStorage.getItem('access_token')
const $toast = useToast()
const staffs = ref([])
const totalItems = ref(0)
const currentPage = ref(1)
const isLoading = ref(false)
const is_tabShown = ref("all")
const deletedStaffs = ref([])
const disabledStaffs = ref([])
const is_blur = ref(false)
const is_OpenAdd = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_OpenRestore = ref(false)
let toDeleteValue = 0
let toRestoreValue = 0
const base_url = import.meta.env.VITE_BASE_API_URL
const editStaffId = ref(null)


const handlePageChange = (page, func) => {
  currentPage.value = page
  func(page)
}

const searchStaff = (text) => {
  if (is_tabShown.value == "all") fetchStaff(1, text)
  else if (is_tabShown.value == "disabled") fetchDisabledStaff(1, text)
  else if (is_tabShown.value == "deleted") fetchDeletedStaff(1, text)
}


const toggleList = async (tabShown, func) => {
  is_tabShown.value = tabShown
  currentPage.value = 1
  func(currentPage.value)
}

function toggleOpenAdd() {
  is_OpenAdd.value = true
  is_blur.value = true
}

function toggleCloseAdd() {
  is_OpenAdd.value = false
  is_blur.value = false
  fetchStaff(currentPage.value)
}

function toggleOpenEdit(staff) {
  is_OpenEdit.value = true
  is_blur.value = true
  editStaffId.value = staff.id
}

function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false
  fetchStaff(currentPage.value)
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
  fetchStaff(currentPage.value)
}

function toggleOpenRestore(restoreId) {
  is_OpenRestore.value = true
  is_blur.value = true
  toRestoreValue = restoreId
}

function toggleCloseRestore() {
  is_OpenRestore.value = false
  is_blur.value = false
  fetchDeletedStaff()
}



const fetchStaff = async (page = 1, text = '') => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/staff/get/manage/?search=${text}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    staffs.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching staffs:', error)
  } finally {
    isLoading.value = false
  }
}


const fetchDeletedStaff = async (page = 1, text = '') => {
  try {
    const response = await axios.get(`${base_url}/api/staff/get/deleted/manage/?search=${text}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    deletedStaffs.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching staffs:', error)
  }
}

const fetchDisabledStaff = async (page = 1, text = '') => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/staff/get/disabled/manage/?search=${text}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    disabledStaffs.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching Staff:', error)
  } finally {
    isLoading.value = false
  }
}


const toggleDisableStaff = async (staff) => {
  const originalIsDisabled = !staff.is_disabled;
  const newIsDisabled = !originalIsDisabled;
  const action = newIsDisabled ? 'disable' : 'enable';

  const requestUrl = `${base_url}/api/user/${action}/${staff.id}/`;

  try {
    await axios.delete(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    $toast.success(`Staff is made ${newIsDisabled ? 'disable' : 'enable'}`);
  } catch (error) {
    console.error(error);
    $toast.error(`Error occur while making staff ${newIsDisabled ? 'disable' : 'enable'}`);
    staff.is_disabled = originalIsDisabled;
  }
}


function confirmDelete() {
  axios({
    method: 'delete',
    url: `${base_url}/api/staff/delete/${toDeleteValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      staffs.value = staffs.value.filter((staff) => staff.id !== toDeleteValue)
      $toast.success('Staff is deleted', {
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
    url: `${base_url}/api/staff/recover/${toRestoreValue}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      deletedStaffs.value = deletedStaffs.value.filter((deletedStaffs) => deletedStaffs.id !== toRestoreValue)
      $toast.success('Staff is Restored', {
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
  fetchStaff(currentPage.value)
})
</script>
