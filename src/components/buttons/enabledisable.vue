<template>
                    <label v-if="mode=='hide'" class="relative inline-flex cursor-pointer items-center">
                      <input :id="'hideswitch-'+ item.id" type="checkbox" v-model="item.is_hidden" @change="action()" class="peer sr-only" />
                      <label :for="'hideswitch-'+ item.id" class="hidden"></label>
                      <div
                        class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                      ></div>
                    </label>
                      <label v-else class="relative inline-flex cursor-pointer items-center">
                      <input :id="'disablewitch-'+ item.id" type="checkbox" v-model="item.is_disabled" @change="action()" class="peer sr-only" />
                      <label :for="'disableswitch-'+ item.id" class="hidden"></label>
                      <div
                        class="peer h-4 w-11 rounded-full border bg-primary-text-color after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-primary-text-color after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary-color peer-checked:after:translate-x-full"
                      ></div>
                    </label>

                 
</template>
<script setup>
defineProps(['item', 'mode'])
const emit = defineEmits(['action'])
function action() {
  emit('action')
}
</script>