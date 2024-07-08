<template>
    <div class="hidden md:flex lg:w-[15vw] h-7 my-4 justify-between border border-primary-text-color rounded-lg">
                  <input
                    type="text"
                    class="text-xs border-none w-full p-2 bg-transparent focus:outline-none text-xsm text-primary-text-color placeholder:text-primary-text-color hidden sm:flex"
                    :placeholder="text"
                  />
                  <v-icon
                    name="md-search"
                    fill="#302f31"
                    scale="1.5"
                    class="cursor-pointer hover:text-gray-950 p-1"
                  />
                </div>
</template>

<script setup>
    
defineProps(['text'])

// const emit = defineEmits(['action'])
// function action() {
//   emit('action')
// }
</script>