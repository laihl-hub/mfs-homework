import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home'
import About from '../components/About'
import NotFound from '../components/NotFound'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home
  },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/about',
      name:'About',
      component:About
    },
    {
      path:'/*',
      name:'NotFound',
      component:NotFound
    }
    
  ]
})
