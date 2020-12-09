import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'

Vue.use(Vuelidate)
Vue.config.productionTip = false

// Importing the global css file
import "@/assets/css/style.css"

new Vue({
  render: h => h(App),
}).$mount('#app')
