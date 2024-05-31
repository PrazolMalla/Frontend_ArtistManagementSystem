import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import store from './store/store.js'
import ToastPlugin from 'vue-toast-notification'
import * as MdIcons from 'oh-vue-icons/icons/md'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

const Fa = Object.values({ ...MdIcons })
addIcons(...Fa)
const app = createApp(App)

app.use()
app.use(router)
app.use(store)
app.use(ToastPlugin)
app.component('v-icon', OhVueIcon)
app.mount('#app')
