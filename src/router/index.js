import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component:  () => import('../views/homePage/index.vue'),
      meta:{
        title:"homePage"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta:{
        title:"login"
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/index.vue'),
      meta:{
        title:"register"
      }
    },
    {
      path: '/productDetail',
      name: 'productDetail',
      component: () => import('../views/productDetail/index.vue'),
      meta:{
        title:"productDetail"
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
