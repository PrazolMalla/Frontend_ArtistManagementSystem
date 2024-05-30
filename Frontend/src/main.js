import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import store from './store/store.js'
import ToastPlugin from 'vue-toast-notification'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/fa";
import { GiHamburgerMenu } from "oh-vue-icons/icons";


const Fa = Object.values({ ...FaIcons });
addIcons(GiHamburgerMenu);

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ToastPlugin)
app.component("v-icon", OhVueIcon);
app.mount('#app')
