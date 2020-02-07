import Vue from 'vue'
import App from './App'
import router from './router'

import './vant'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './muse'
import 'muse/material-icons.css'
import Time from './utils/time.js'

import { API } from './api/index'

import { Get, Post } from './utils/Request.js'
Vue.prototype.$Get = Get
Vue.prototype.$Post = Post
Vue.prototype.$API = API

Vue.use(ElementUI)
Vue.use(Time)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
