import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/views/LoginPage'
import HomePage from '@/views/HomePage'
import HomePage_admin from '@/views/HomePage_admin'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   // name: 'HelloWorld',
    //   component: HelloWorld
    // },

    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/home_admin',
      name: 'HomePage_admin',
      component: HomePage_admin
    },
  ]
})
