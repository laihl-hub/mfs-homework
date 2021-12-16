import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'
import articleDel from '../components/articleDel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/home/:kind',
      name:'HomeWithParams',
      component:Home
    },
    {
      path:'/about',
      name:'About',
      component:About
    },
    {
      path:'/articleDel/:id',
      name:'articleDel',
      component:articleDel
    },
    {
      path:'/latestAticleDel/:id',
      name:'latestAticleDel',
      component:articleDel
    }
  ]
})
