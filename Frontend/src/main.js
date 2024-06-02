import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import store from './store/store.js'
import ToastPlugin from 'vue-toast-notification'

import PageLayout from './views/PageLayout.vue'
import PageLayoutWithPlayer from './views/PageLayoutWithPlayer.vue'
// import { OhVueIcon, addIcons } from "oh-vue-icons";
// import * as FaIcons from "oh-vue-icons/icons/fa";
// import { GiHamburgerMenu } from "oh-vue-icons/icons";

import * as MdIcons from 'oh-vue-icons/icons/md'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

const Fa = Object.values({ ...MdIcons })
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
