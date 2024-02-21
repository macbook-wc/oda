import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component:  () => import('../views/homePage/index.vue'),
      meta:{
        title:"ODA-homePage"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta:{
        title:"ODA-login"
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/index.vue'),
      meta:{
        title:"ODA-register"
      }
    },
    {
      path: '/productDetail',
      name: 'productDetail',
      component: () => import('../views/productDetail/index.vue'),
      meta:{
        title:"ODA-productDetail"
      }
    },
    {
      path: '/teamPage',
      name: 'teamPage',
      component: () => import('../views/teamPage/index.vue'),
      meta:{
        title:"ODA-teamPage"
      }
    }
    , {
      path: '/downLoadChangePage',
      name: 'downLoadChangePage',
      component: () => import('../views/downLoadChangePage/index.vue'),
      meta:{
        title:"downLoadChangePage"
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const title = (to.meta.title ? to.meta.title : '') + ''
  document.title = title
  next()
})
export default router
