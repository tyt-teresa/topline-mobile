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
    }
  ]
})
