import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import store from './store'
import ToastPlugin from 'vue-toast-notification'
const app = createApp(App)

app.use(router)
app.use(store)
app.use(ToastPlugin)
app.mount('#app')
