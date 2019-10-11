import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import consumer from './consumer.js'
import manage from './manage.js'

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
      path: '/test',
      name: 'test',
      component: (resolve) => {
        require(['@/views/test'], resolve)
      }
    },
    ...consumer,
    ...manage
  ]
})
