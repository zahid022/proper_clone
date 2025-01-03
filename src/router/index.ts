import getToken from '@/utils/getToken'
import CategoryView from '@/views/admin/category/CategoryView.vue'
import AdminLogin from '@/views/admin/login/AdminLogin.vue'
import ProductsView from '@/views/admin/products/ProductsView.vue'
import TagView from '@/views/admin/tag/TagView.vue'
import HomeView from '@/views/public/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
    {
      path: '/',
      name: 'public',
      meta: {
        requiredAuth: false,
        layout: 'PublicLayout',
      },
      children: [
        {
          path : '/',
          name : "home",
          component : HomeView
        },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/products',
      meta: {
        requiredAuth: true,
        layout: 'AdminLayout',
      },
      children: [
        {
          path: 'products',
          name: 'products',
          component: ProductsView,
        },
        {
          path: 'category',
          name: 'category',
          component: CategoryView,
        },
        {
          path: 'tag',
          name: 'tag',
          component: TagView,
        }
      ]
    },
    {
      path: '/admin-login',
      name: 'admin-login',
      component: AdminLogin,
      meta: {
        requiredAuth: false,
        layout: '',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = getToken()

  if (to.name === 'admin-login' && token) {
    next({ name: 'admin' })
  } else if (to.meta.requiredAuth && !token) {
    next({ name: 'admin-login' })
  } else {
    next()
  }
})

export default router
