import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth"

const checkAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  let isAuth = false
  onAuthStateChanged(getAuth(), (user) => {
    if (user && !isAuth) {
      isAuth = true
      next()
    } else if(!user && !isAuth) {
      isAuth = true
      next('/auth')
    }
  })
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthPage.vue')
  },
  {
    path: '/interview/:id',
    name: 'Interview',
    component: () => import('@/views/InterviewPage.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/views/ListPage.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('@/views/StatisticPage.vue'),
    beforeEnter: checkAuth
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
