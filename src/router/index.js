import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/tabbar'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Tabbar',
      path: '/',
      component: Tabbar,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: '/user',
          name: 'User',
          component: () => import(/* webpackChunkName: "user" */ '../views/user')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "Login" */ '../views/login')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import(/* webpackChunkName: "Search" */ '../views/search')
    },
    {
      path: '/search-result/:q',
      name: 'search-result',
      props: true,
      component: () => import(/* webpackChunkName: "SearchResult" */ '../views/searchResult')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      props: true,
      component: () => import(/* webpackChunkName: "SearchResult" */ '../views/details')
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import(/* webpackChunkName: "user-profile" */ '../views/userprofile')
    },
    {
      path: '/follow',
      name: 'Follow',
      component: () => import(/* webpackChunkName: "Follow" */ '../views/follow')
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import(/* webpackChunkName: "Chat" */ '../views/chat')
    }
  ]
})
