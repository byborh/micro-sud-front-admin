import { createRouter, createWebHashHistory  } from 'vue-router'
import Machine from '../components/Machine.vue'
import BlockTextuelVue from '../components/BlockTextuel.vue'
import BlogVue from '../components/Blog.vue'
import SavoirFaireVue from '../components/SavoirFaire.vue'

const routes = [
  { path: '/', component: BlockTextuelVue },
  { path: '/machines', component: Machine },
  { path: '/blogs', component: BlogVue },
  { path: '/savoir-faire', component: SavoirFaireVue },

  // Route catch-all à la fin pour rediriger les routes non trouvées
  { path: '/:pathMatch(.*)*', component: BlockTextuelVue },
]

const router = createRouter({
  history: createWebHashHistory (),
  routes,
})

export default router
