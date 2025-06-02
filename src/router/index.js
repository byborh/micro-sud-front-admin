import { createRouter, createWebHashHistory } from 'vue-router'
import { isAuthenticated } from '../utils/auth'

const routes = [
  { 
    path: '/', 
    component: () => import('../components/Connexion.vue'),
    meta: { requiresAuth: false } 
  },
  { 
    path: '/block-textuel', 
    component: () => import('../components/BlockTextuel.vue'),
    meta: { requiresAuth: true } 
  },
  { 
    path: '/machines', 
    component: () => import('../components/Machine.vue'),
    meta: { requiresAuth: true } 
  },
  { 
    path: '/blogs', 
    component: () => import('../components/Blog.vue'),
    meta: { requiresAuth: true } 
  },
  { 
    path: '/savoir-faire', 
    component: () => import('../components/SavoirFaire.vue'),
    meta: { requiresAuth: true } 
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: () => import('../components/BlockTextuel.vue'),
    meta: { requiresAuth: true } 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Garde de navigation (navigation guard)
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Redirige vers la page de connexion si non authentifié
    next('/');
  } else {
    next();
  }
})

export default router