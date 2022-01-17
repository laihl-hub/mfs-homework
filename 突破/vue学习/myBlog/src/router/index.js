import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'
import articleDel from '../components/articleDel'
import articleEditor from '../components/articleEditor'
import admin from '../components/admin'
import articleTable from '../components/articleTable'
import notFound from '../components/notFound'
import {Message} from 'element-ui'
import tagTable from '../components/tagTable'
import userTable from '../components/userTable'

Vue.use(Router)

const router= new Router({
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
      path:'/home/tag/:id',
      name:'homeByTag',
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
    },
    {
      path:'/articleEditor/add',
      name:'articleAdd',
      component:articleEditor
    },
    {
      path:'/articleEditor/:id/edit',
      name:'articleEdit',
      component:articleEditor
    },
    {
      path:'/admin',
      name:'admin',
      component:admin,
      // beforeEnter(from,to,next){
      //   if(window.localStorage.getItem('userId')){
      //     next()
      //   }else{
      //     next(false)
      //     Message.error('没有权限访问噢')
      //   }
      // },
      children:[
        {path:'/admin',
        name:'articleManage',
        component:articleTable
      },
      {
        path:'/admin/tag',
        name:'tagManage',
        component:tagTable
      },
      {
        path:'/admin/user',
        name:'userManage',
        component:userTable
      }
      ]
    },
    {
      path:'/404NotFound',
      name:'404NotFound',
      component:notFound
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.fullPath.indexOf('admin')!=-1){
    if(window.localStorage.getItem('userId')){
      next()
    }else{
      next(false)
      Message.error('没有权限访问噢')
    }
  }else{
    next()
  }
})

export default router
