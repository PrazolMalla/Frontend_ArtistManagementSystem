<template>
  <PageLayoutWithPlayer id="display-flex">
    <template #content>
      <div class="settings-container  p-5">
        <h1 class="text-3xl font-bold mb-5">Settings</h1>
        <button @click="logout" class="logout-button bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700">Logout</button>
      </div>
    </template>
  </PageLayoutWithPlayer>
</template>

<script>
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      router.push('/');
      $toast.success('Logout sucess', {
          position: 'top-right'
        });

    };

    return {
      logout
    }
  }
}
</script>
