import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'
import router from './router/index'

const pinia = createPinia()
const app = createApp()

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')