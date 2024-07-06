<template>
  <PageLayout>
    <template #content>
      <div
        v-if="is_blur"
        class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-center gap-10 items-center"
      ></div>
      <AddStaff v-if="is_OpenAdd" @close="toggleCloseAdd"/>
      <ManageConfirmDialogue
        v-if="is_OpenDelete"
        actionQuestion="Do yo want to delete XYZ?"
        actionConfirm="Confirm Delete"
        @confirm="confirmDelete"
        @close="toggleCloseDelete"
      />

      <EditStaff v-if="is_OpenEdit" :staffId="editStaffId" @close="toggleCloseEdit" />
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
              <h1 class="text-lg sm:text-md font-bold"  v-if="!is_deletedShown">All Staffs</h1>
              <h1 class="text-lg sm:text-md font-bold" v-else>All Deleted Staffs</h1>
              <div class="flex items-center gap-3">
                 <div v-if="!is_deletedShown" @click="showDeletedList" class="border text-xs bg-secondary-color text-dark-primary-color  py-1 px-2 rounded-lg hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">Deleted</div>
               <div v-if="is_deletedShown" @click="showAllList" class="border text-xs bg-secondary-color text-dark-primary-color  py-1 px-2 rounded-lg hover:text-secondary-color hover:bg-dark-primary-color border-secondary-color cursor-pointer select-none">All</div>
                
                 <div class="hidden md:flex lg:w-[15vw] h-7 my-4 justify-between border border-primary-text-color rounded-lg">
                  <input
                    type="text"
                    class="text-xs border-none w-full p-2 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color hidden sm:flex"
                    placeholder="Search Staff..."
                  />
                  <v-icon
                    name="md-search"
                    fill="#302f31"
                    scale="1.5"
                    class="cursor-pointer hover:text-gray-950 p-1"
                  />
                </div>
                <button class="px-2 py-1 text-xs bg-secondary-color text-dark-primary-color rounded-lg border-2 hover:bg-transparent hover:border-secondary-color hover:text-secondary-color"  @click="toggleOpenAdd" >
                  Add Staff
                </button>
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div class="hidden sm:flex flex-row bg-transparent sm:border-b sm:border-b-primary-text-color">
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center">
                  <div class="font-semibold" v-if="!is_deletedShown">Disable</div>
                  <div class="font-semibold" v-if="!is_deletedShown ">Edit</div>
                  <div class="font-semibold" v-else>Restore</div>
                </div>
              </div>

              <div v-if="!is_deletedShown" v-for="staff in staffs" :key="staff.name"  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <router-link :to="`/staff/${staff.id}`" class="flex items-center w-3/6">
                  <img
                    :src="`${base_url}${staff.img_profile}`"
                    alt="Staff image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ staff.firstname }} {{ staff.lastname }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ staff.username }}</div>
                    </div>
                  </div>
                </router-link>
                
                  <div class="flex w-full justify-around items-center">
                
                    <label class="relative inline-flex cursor-pointer items-center">
                      <input :id="'disableswitch-'+ staff.id" type="checkbox" v-model="staff.is_disabled" @change="toggleDisableStaff(staff)" class="peer sr-only" />
                      <label :for="'disableswitch-'+ staff.id" class="hidden"></label>
                      <div
                        class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                      ></div>
                    </label>
                    <v-icon class="cursor-pointer"  name="fa-regular-edit" @click="toggleOpenEdit(staff.id)"  fill="#00b166" scale="1.5"></v-icon>
                  </div>
                </div>




                <div v-else v-for="deletedStaff in deletedStaffs" :key="deletedStaffs.name"  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                <div class="flex items-center w-3/6">
                  <img
                    :src="`${base_url}${deletedStaff.img_profile}`"
                    alt="Staff image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ deletedStaff.firstname }} {{ deletedStaff.lastname }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ deletedStaff.username }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="flex w-full justify-around items-center">
                  <div @click="toggleOpenRestore(deletedStaff.id)" v-if="true" class="border border-secondary-color  rounded bg-secondary-color hover:text-secondary-color hover:bg-transparent text-sm p-1 text-dark-primary-color">Restore</div>
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
import AddStaff from '@/components/manage/staff/AddStaff.vue'
import EditStaff from '@/components/manage/staff/EditStaff.vue'
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const access_token = localStorage.getItem('access_token');
import { ref, onMounted } from 'vue'
import axios from 'axios'
const staffs = ref([])
const deletedStaffs = ref([])
const is_deletedShown = ref(false)
const is_blur = ref(false)
const is_OpenAdd = ref(false)
const is_OpenEdit = ref(false)
const is_OpenDelete = ref(false)
const is_OpenRestore = ref(false)
let toRestoreValue = 0
const editStaffId = ref(null)
const base_url  = import.meta.env.VITE_BASE_API_URL;

function toggleOpenAdd() {
  is_OpenAdd.value = true
  is_blur.value = true
}
function toggleCloseAdd() {
  is_OpenAdd.value = false
  is_blur.value = false
  fetchStaff()
}
function toggleOpenEdit(staff) {
  is_OpenEdit.value = true
  is_blur.value = true
  editStaffId.value = staff
}
function toggleCloseEdit() {
  is_OpenEdit.value = false
  is_blur.value = false

  fetchStaff()
}

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


const fetchStaff = async () => {
  try {
    const response = await axios.get(`${base_url}/api/staff/get/`)
    const data = response.data
    staffs.value = data
  } catch (error) {
    console.error('Error fetching staffs:', error)
  }
}
const fetchDeletedStaff = async () => {
  try {
    const response = await axios.get(`${base_url}/api/staff/get/deleted/`)
    const data = response.data
    deletedStaffs.value = data
  } catch (error) {
    console.error('Error fetching Deleted staffs:', error)
  }
}


onMounted(() =>{
  fetchStaff()
  fetchDeletedStaff()
})
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
function confirmRestore() {
  axios({
    method: 'delete',
    url: `${base_url}/api/user/recover/${toRestoreValue}`,
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

</style>
