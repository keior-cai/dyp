import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/customer/home/home'
import DyList from '@/page/customer/home/components/dyList'
import YyList from '@/page/customer/home/components/yyList'
import order from '@/page/customer/home/components/order'
import My from '@/page/customer/home/components/my'
import Movies from '@/page/customer/movies/movies'
import AdminLogin from '@/page/admin/login/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'dyList/:id',
          name: 'dyList',
          component: DyList
        },
        {
          path: 'yyList',
          name: 'yyList',
          component: YyList
        },
        {
          path: 'order',
          name: 'order',
          component: order
        },
        {
          path: 'my',
          name: 'my',
          component: My
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/movies/:id',
      name: 'movies',
      component: Movies,
      props: true
    },
    { path: '/', redirect: '/main/yyList' }
  ]
})
