import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import store from './store/store.js'
import ToastPlugin from 'vue-toast-notification'

import PageLayout from '@/components/page_layout/PageLayout.vue'
import PageLayoutWithPlayer from '@/components/page_layout/PageLayoutWithPlayer.vue'
import DefaultUser from '@/assets/images/defaultUser.png'
import DefaultMusic from '@/assets/images/defaultMusic.jpg'
import * as FaIcons from 'oh-vue-icons/icons/fa'
import * as MdIcons from 'oh-vue-icons/icons/md'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

const Fa = Object.values({ ...MdIcons, ...FaIcons })
addIcons(...Fa)

const app = createApp(App)

app.use()
app.use(router)
app.use(store)
app.use(ToastPlugin)
app.component('PageLayout', PageLayout)
app.component('PageLayoutWithPlayer', PageLayoutWithPlayer)
app.component('v-icon', OhVueIcon)
app.mount('#app')
