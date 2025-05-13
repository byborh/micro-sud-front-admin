<script setup></script>

<template>
  <main class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <!-- Formulaire de création -->
        <section class="card mb-5 shadow-sm p-4">
          <h4 class="mb-4"><i class="bi bi-journal-plus me-2"></i>Créer un nouveau blog</h4>
          <form enctype="multipart/form-data">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Titre</label>
                <input type="text" class="form-control" placeholder="Titre du blog">
              </div>
              <div class="col-md-6">
                <label class="form-label">Date</label>
                <input type="date" class="form-control">
              </div>
              <div class="col-md-12">
                <label class="form-label">Contenu</label>
                <textarea class="form-control" rows="4" placeholder="Contenu du blog..."></textarea>
              </div>
              <div class="col-md-6">
                <label class="form-label">Image</label>
                <input type="file" class="form-control" accept="image/*">
              </div>
              <div class="col-12 text-end">
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-plus-circle"></i> Publier le blog
                </button>
              </div>
            </div>
          </form>
        </section>

        <!-- Liste des blogs existants -->
        <section>
          <h4 class="mb-4"><i class="bi bi-journal-text me-2"></i>Articles existants</h4>

          <!-- Blog Exemple -->
          <form class="card mb-4 shadow-sm p-3" enctype="multipart/form-data">
            <div class="row align-items-center">
              <!-- Image -->
              <div class="col-md-3 text-center">
                <label for="blogImage1" class="d-block cursor-pointer">
                  <img src="https://via.placeholder.com/150" alt="Blog Image" class="img-fluid rounded border" style="cursor: pointer;">
                </label>
                <input type="file" class="form-control d-none" id="blogImage1" accept="image/*">
              </div>

              <!-- Inputs -->
              <div class="col-md-6">
                <div class="mb-2">
                  <label class="form-label">Titre</label>
                  <input type="text" class="form-control" value="Lancement de notre nouvelle machine">
                </div>
                <div class="mb-2">
                  <label class="form-label">Date</label>
                  <input type="date" class="form-control" value="2025-05-11">
                </div>
                <div class="mb-2">
                  <label class="form-label">Contenu</label>
                  <textarea class="form-control" rows="3">Nous sommes fiers de lancer notre nouvelle génération de machines industrielles...</textarea>
                </div>
              </div>

              <!-- Actions -->
              <div class="col-md-3 text-end">
                <button type="submit" class="btn btn-success mb-2 w-100 d-flex align-items-center justify-content-center gap-2">
                  <i class="bi bi-pencil-square"></i> Modifier
                </button>
                <button type="button" class="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2">
                  <i class="bi bi-trash3"></i> Supprimer
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
