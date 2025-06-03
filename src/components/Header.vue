<script>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { logout, isAuthenticated } from '../utils/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const connected = ref(isAuthenticated())
    
    const handleLogout = async () => {
      await logout()
      connected.value = isAuthenticated() // Met à jour l'état
      router.push('/')
    }

    return { connected, handleLogout }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">  <!-- me-auto pousse le bouton à droite -->
          <li class="nav-item">
            <RouterLink class="nav-link" to="/block-textuel">Block Textuel</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/machines">Machines</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/blogs">Blog</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/savoir-faire">Savoir-faire</RouterLink>
          </li>
        </ul>
        
        <!-- Bouton de déconnexion aligné à droite -->
        <div class="d-flex" v-if="connected">
          <button 
            @click="handleLogout" 
            class="btn btn-outline-danger ms-3"
          >
            <i class="bi bi-box-arrow-right"></i> Déconnexion
          </button>
        </div>
      </div>
    </div>
  </nav>

  <header class="bg-light py-4">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- Texte -->
      <div>
        <h1 class="display-4 text-dark mb-1">Micro-Sud Dashboard</h1>
        <h4 class="text-secondary fw-normal">Le Dashboard de Micro-Sud</h4>
      </div>

      <!-- Image -->
      <div>
        <img
          alt="Photo de Micro Sud"
          src="../../public/img/micro-sud-logo.avif"
          class="img-fluid rounded-3"
          style="max-height: 80px; object-fit: contain; transition: transform 0.3s ease;"
          @mouseover="$event.target.style.transform='scale(1.05)'"
          @mouseout="$event.target.style.transform='scale(1)'"
        >
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar-nav {
  width: 100%;
}
/* Style optionnel pour améliorer l'apparence */
.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}
</style>