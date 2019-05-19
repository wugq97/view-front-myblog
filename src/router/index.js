import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'
import Login from '@/views/login'
import Logon from '@/views/logon'
import Chat from '@/views/chat'
import File from '@/views/file'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Layout,
      redirect: '/index',
      children: [{
        path: 'index',
        name: 'index',
        component: () => import('@/views/index')
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/search')
      },
      {
        path: 'article/:id',
        name: 'article',
        component: () => import('@/views/article')
      }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logon',
      name: 'logon',
      component: Logon
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '/file',
      name: 'file',
      component: File
    }
  ]
})
