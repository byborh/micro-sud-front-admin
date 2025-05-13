<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <router-link class="nav-link" to="/">Block Textuel</router-link>
            <router-link class="nav-link" to="/machines">Machines</router-link>
            <router-link class="nav-link" to="/blogs">Blog</router-link>
            <router-link class="nav-link" to="/savoir-faire">Savoir-faire</router-link>

            <!-- <li class="nav-item"><a class="nav-link active" href="index.html">Accueil</a></li>
            <li class="nav-item"><a class="nav-link" href="machine.html">Machines</a></li>
            <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
            <li class="nav-item"><a class="nav-link" href="savoir_faire.html">Savoir-faire</a></li>
            <li class="nav-item"><a class="nav-link" href="block_textuel.html">Block Textuel</a></li> -->
          </ul>
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
          style="object-fit: cover; transition: transform 0.3s ease;"
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
        >
      </div>

    </div>
  </header>
</template>

<style scoped></style>
