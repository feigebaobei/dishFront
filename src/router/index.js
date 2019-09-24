import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      // component: index
      component: (resolve) => {
        require(['@/views/index'], resolve)
      }
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => {
        require(['@/views/login'], resolve)
      }
    },
    {
      path: '/market',
      name: 'market',
      component: (resolve) => {
        require(['@/views/market'], resolve)
      }
    }
  ]
})
