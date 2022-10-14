import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.path === '/home' || to.path === '/personal') {
    store.commit('updateRouter', to.name)
  }
  if (store.state.access_token || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})
export default router
