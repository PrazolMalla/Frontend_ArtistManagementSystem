<template>
  <PageLayout>
    <template #content>
      <BackgroundBlur v-if="is_blur" />

      <div class="text-primary-text-color flex flex-col gap-2 w-full  ">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <div class="flex flex-col">
                <h1 class="text-lg font-bold">
                  All
                  <span v-if="is_tabShown == 'deleted'">Deleted</span>
                  <span v-if="is_tabShown == 'disabled'">Disabled</span>
                  User
                </h1>
                <div class="text-sm font-bold opacity-70">Total: {{ totalItems }}</div>
              </div>

              <div class="flex items-center space-x-4">
                <SmButton v-if="is_tabShown != 'deleted'" text="Deleted"
                  @action="toggleList('deleted', fetchDeletedUser)" />
                <SmButton v-if="is_tabShown != 'disabled'" text="Disabled"
                  @action="toggleList('disabled', fetchDisabledUser)" />
                <SmButton v-if="is_tabShown != 'all'" text="All" @action="toggleList('all', fetchUser)" />
                <SmSearchbar text="Search User..." />
              </div>
            </div>

            <div class="flex flex-col justify-between">

              <div class="hidden sm:flex flex-row bg-transparent border-b border-b-primary-text-color">
                <div class="w-3/6 font-semibold">Name</div>
                <div class="flex w-full justify-around items-center font-semibold ">
                  <div v-if="is_tabShown == 'all' || is_tabShown == 'disabled'">Disable</div>
                </div>
              </div>

              <div v-if="is_tabShown == 'all'">
                <div v-for=" user in users" :key="user.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">

                  <ManageDetail :link="true" :id="user.id" :image="user.img_profile"
                    :title="`${user.firstname} ${user.lastname}`" :subtitle="`@${user.username}`" type="user" />

                  <div
                    class="flex w-full justify-around flex-row bg-transparent sm:hidden border-b border-b-primary-text-color">
                    <p>Disable</p>
                  </div>
                  <div class="flex w-full  justify-around items-center">
                    <EnableDisable mode="disable" :item="user" @action="toggleDisableUser(user)" />

                  </div>
                </div>
                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchUser)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  User Found</div>
              </div>
              <div v-if="is_tabShown == 'disabled'">
                <div v-for="disableduser in disabledUsers" :key="disableduser.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">


                  <ManageDetail :link="true" :id="disableduser.id" :image="disableduser.img_profile"
                    :title="`${disableduser.firstname} ${disableduser.lastname}`"
                    :subtitle="`@${disableduser.username}`" type="user" />
                  <div class="flex w-full justify-around items-center">
                    <EnableDisable mode="disable" :item="disableduser" @action="toggleDisableUser(disableduser)" />
                  </div>
                </div>
                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchDisabledUser)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  Album Found</div>
              </div>

              <div v-if="is_tabShown == 'deleted'">
                <div v-for="deleteduser in deletedUsers" :key="deleteduser.name"
                  class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color py-2">
                  <div class="flex items-center w-3/6">

                    <ManageDetail :link="true" :id="deleteduser.id" :image="deleteduser.img_profile"
                      :title="`${deleteduser.firstname} ${deleteduser.lastname}`" :subtitle="`@${deleteduser.username}`"
                      type="user" />
                  </div>
                </div>
                <PaginationCard v-if="totalItems" :totalItems="totalItems" :currentPage="currentPage"
                  @action="page => handlePageChange(page, fetchDeletedUser)" />
                <div v-else
                  class="font-bold text-lg text-primary-text-color opacity-50 p-5 flex justify-center items-center">No
                  User Found</div>
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
import EnableDisable from '@/components/buttons/enabledisable.vue'
import PaginationCard from '@/components/cards/PaginationCard.vue'
import SmSearchbar from '@/components/buttons/sm-searchbar.vue'
import ManageDetail from '@/components/manage/ManageDetail.vue'
import SmButton from '@/components/buttons/sm-button.vue'
import { useToast } from 'vue-toast-notification'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const access_token = localStorage.getItem('access_token')
const $toast = useToast()
const users = ref([])
const totalItems = ref(0)
const currentPage = ref(1)
const isLoading = ref(false)
const is_tabShown = ref("all")
const deletedUsers = ref([])
const disabledUsers = ref([])
const is_blur = ref(false)
const base_url = import.meta.env.VITE_BASE_API_URL


const handlePageChange = (page, func) => {
  currentPage.value = page
  func(page)
}

const toggleList = async (tabShown, func) => {
  is_tabShown.value = tabShown
  currentPage.value = 1
  func(currentPage.value)
}

const fetchUser = async (page = 1) => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/user/get/manage/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    users.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    isLoading.value = false
  }
}


const fetchDeletedUser = async (page = 1) => {
  try {
    const response = await axios.get(`${base_url}/api/user/get/deleted/manage/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    deletedUsers.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const fetchDisabledUser = async (page = 1) => {
  isLoading.value = true
  try {
    const response = await axios.get(`${base_url}/api/user/get/disabled/manage/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      params: {
        page: page,
        page_size: 10
      }
    })
    disabledUsers.value = response.data.results
    totalItems.value = response.data.count
  } catch (error) {
    console.error('Error fetching User:', error)
  } finally {
    isLoading.value = false
  }
}


const toggleDisableUser = async (user) => {
  const originalIsDisabled = !user.is_disabled;
  const newIsDisabled = !originalIsDisabled;
  const action = newIsDisabled ? 'disable' : 'enable';

  const requestUrl = `${base_url}/api/user/${action}/${user.id}/`;

  try {
    await axios.delete(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    $toast.success(`User is made ${newIsDisabled ? 'disable' : 'enable'}`);
  } catch (error) {
    console.error(error);
    $toast.error(`Error occur while making user ${newIsDisabled ? 'disable' : 'enable'}`);
    user.is_disabled = originalIsDisabled;
  }
}
onMounted(() => {
  fetchUser(currentPage.value)
})
</script>
