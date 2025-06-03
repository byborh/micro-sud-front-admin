<script>
export default {
  name: 'ConnexionVue',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('http://localhost:3000/api/v0.0.2/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.loginForm),
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Stockage du token dans localStorage
          localStorage.setItem('authToken', data.token);
          
          // Redirection vers la page d'accueil admin
          this.$router.push('/machines');
        } else {
          const errorData = await response.json();
          alert(`Erreur: ${errorData.message || 'Échec de la connexion'}`);
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la connexion');
      }
    }
  }
}
</script>

<template>
<div class="container mt-5">
    <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
        <div class="card shadow">
        <div class="card-body p-4">
            <h2 class="text-center mb-4">Connexion</h2>
            <form @submit.prevent="handleLogin">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                type="email"
                class="form-control"
                id="email"
                v-model="loginForm.email"
                required
                >
            </div>
            <div class="mb-4">
                <label for="password" class="form-label">Mot de passe</label>
                <input
                type="password"
                class="form-control"
                id="password"
                v-model="loginForm.password"
                required
                >
            </div>
            <button type="submit" class="btn btn-success w-100">Se connecter</button>
            </form>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<style scoped>
</style>