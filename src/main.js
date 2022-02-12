import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

Vue.use(Notifications)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
