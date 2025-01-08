import getToken from '@/utils/getToken'
import CategoryView from '@/views/admin/category/CategoryView.vue'
import AdminLogin from '@/views/admin/login/AdminLogin.vue'
import ProductsView from '@/views/admin/products/ProductsView.vue'
import TagView from '@/views/admin/tag/TagView.vue'
import AccountBasics from '@/views/public/AccountBasics.vue'
import AccountOrder from '@/views/public/AccountOrder.vue'
import AccountView from '@/views/public/AccountView.vue'
import DetailView from '@/views/public/DetailView.vue'
import ForgotView from '@/views/public/ForgotView.vue'
import HomeView from '@/views/public/HomeView.vue'
import LoginView from '@/views/public/LoginView.vue'
import RegisterView from '@/views/public/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'public',
      meta: {
        requiredAuth: false,
        layout: 'PublicLayout',
      },
      children: [
        {
          path: '/',
          name: "home",
          component: HomeView
        },
        {
          path: '/login',
          name: "login",
          component: LoginView
        },
        {
          path: '/register',
          name: "register",
          component: RegisterView
        },
        {
          path: '/detail/:product_slug/:variant_slug',
          name: "detail",
          component: DetailView
        },
        {
          path: '/forget_password',
          name: "forget_password",
          component: ForgotView
        },
        {
          path: '/account',
          name: "account",
          redirect: '/account/basics',
          component: AccountView,
          children: [
            {
              path: 'basics',
              name: "basics",
              component: AccountBasics
            },
            {
              path: 'orders',
              name: "orders",
              component: AccountOrder
            }
          ]
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
