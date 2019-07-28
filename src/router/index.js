import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Chat from '@/components/Chat'
import Login from '@/components/Login'
// import Avatar from '@/components/Avatar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
