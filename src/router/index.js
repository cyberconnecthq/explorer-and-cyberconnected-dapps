import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Social from '@/components/Social.vue'
// import HelloWorld from '@/components/HelloWorld.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/search/:address',
    name: 'search',
    component: Social,
  }
]

const router = new VueRouter({
  routes
})

export default router
