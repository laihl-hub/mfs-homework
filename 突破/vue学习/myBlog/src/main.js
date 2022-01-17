// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll'
import axios from 'axios';

axios.defaults.withCredentials=true

Vue.use(ElementUI)
Vue.use(infiniteScroll)

Vue.config.productionTip = false

Vue.filter('dateTime',(data,format='YYYY/MM/DD HH:mm:ss')=>{
  return moment(data).format(format)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
