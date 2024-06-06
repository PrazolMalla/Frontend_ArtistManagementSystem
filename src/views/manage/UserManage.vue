<template>
  <PageLayout>
    <template #content>
      <div  v-if="is_blur" class="fixed top-16 bggradientpopup w-screen h-screen z-40 flex flex-col justify-center gap-10 items-center"></div>
      <ManageConfirmDialogue v-if="is_OpenRestore" actionQuestion="Do yo want to restore XYZ?" actionConfirm="Confirm Restore" @close="toggleCloseRestore" />
        
      <div class="text-primary-text-color flex flex-col gap-2 w-full">
        <div class="flex h-screen">
          <div class="flex-1 mt-5">
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-lg sm:text-3xl font-bold">All Users</h1>
              <div class="flex items-center">
                <div
                  class="md:flex lg:w-[15vw] h-10 my-4 justify-between border border-primary-text-color rounded-full"
                >
                  <input
                    type="text"
                    class="text-sm border-none w-full p-2 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color hidden sm:flex"
                    placeholder="Search User..."
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
              <div
                class="hidden sm:flex flex-row bg-transparent"
              >
                <div class="w-3/6  font-semibold">Name</div>
                <div class="flex  w-full justify-around items-center">


                <div class="font-semibold">Disable</div>
                <div class="font-semibold">Restore</div>
                </div>
              </div>
              <div
                v-for="user in users"
                :key="user.name"
                class="flex sm:flex-row flex-col items-center border-b border-b-primary-text-color cursor-pointer hover:bg-light-primary-color"
              >
                <router-link  :to="`/user/${user.id}`" class="flex items-center w-3/6  ">
                  <img
                    :src="`http://127.0.0.1:8000${user.img_profile}`"
                    alt="User image"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-lg mr-4"
                  />

                  <div class="w-1-6">
                    <div class="font-bold text-secondary-color text-sm sm:text-base md:text-md">
                      {{ user.name }}
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-2">
                      <div class="text-sm sm:text-base">{{ user.firstname }}</div>

                      <div class="text-sm sm:text-base">{{ user.album }}</div>
                    </div>
                  </div>
                </router-link>
                <div
                  class="flex w-full justify-around flex-row bg-transparent sm:hidden border-b border-b-primary-text-color"
                >
                  <p>Disable</p>
                  <p>Restore</p>
                </div>
                <div class="flex w-full justify-around items-center">
                
                    <label class="relative inline-flex cursor-pointer items-center">
                      <input :id="'disableswitch-'+ user.id" type="checkbox" v-model="user.is_disabled" @change="toggleDisableUser(user)" class="peer sr-only" />
                            <label :for="'disableswitch-'+ user.id" class="hidden"></label>
                      <div
                        class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                      ></div>
                    </label>
                    <div v-if="true">
                      <div @click="toggleOpenRestore" v-if="true" class="border border-secondary-color  rounded bg-secondary-color hover:text-secondary-color hover:bg-transparent text-sm p-1 text-dark-primary-color">Restore</div>
                      <div v-if="false" class="border  border-secondary-color  rounded bg-transparent text-sm p-1 text-secondary-colo">Restored</div>
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
import ManageConfirmDialogue from '@/components/manage/ManageConfirmDialogue.vue'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const access_token = localStorage.getItem('access_token');

import { ref, onMounted } from 'vue'
import axios from 'axios'
const users = ref([])

const is_blur = ref(false)
const is_OpenRestore = ref(false)


function toggleCloseRestore() {
  is_OpenRestore.value = false
  is_blur.value = false
}

function toggleOpenRestore() {
  is_OpenRestore.value = true
  is_blur.value = true
}

const fetchUser = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user/get/')
    const data = response.data
    users.value = data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

onMounted(fetchUser)
const toggleDisableUser = async (user) => {
  const originalIsDisabled = !user.is_disabled;
  const newIsDisabled = !originalIsDisabled;
  const action = newIsDisabled ? 'disable' : 'enable';

  const requestUrl = `http://127.0.0.1:8000/api/user/${action}/${user.id}/`;

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
