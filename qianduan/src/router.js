import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import page0 from './views/page0.vue'
import page1 from './views/page1.vue'
import page2 from './views/page2.vue'
import page3 from './views/upolds/page3'
import page4 from './views/upolds/page4.vue'
import page5 from './views/upolds/page5.vue'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  // mode: '',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: '菜单1',
      component: Home,
      iconCls: 'el-icon-message',
      hiddren:true,
      children:[
        { path:'/', name:'第一页',component:page0},
        { path:'/page1', name:'第二页',component:page1},
        { path:'/page2', name:'绘图页',component:page2}
      ]
    },
    {
      path: '/',
      name: '小说',
      component: Home,
      iconCls: 'el-icon-star-on',
      hiddren:true,
      children:[
        { path:'/page3', name:'下载页',component:page3},
        { path:'/page5', name:'上传页',component:page5},
        { path:'/page4', name:'第四页',component:page4}
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
