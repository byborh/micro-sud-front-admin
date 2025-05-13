<script setup></script>

<template>
  <main class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <!-- Formulaire de création -->
        <section class="card mb-5 shadow-sm p-4">
          <h4 class="mb-4"><i class="bi bi-tools me-2"></i>Ajouter un savoir-faire</h4>
          <form enctype="multipart/form-data">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Titre</label>
                <input type="text" class="form-control" placeholder="Ex : Matériaux usinés">
              </div>
              <div class="col-md-6">
                <label class="form-label">Image</label>
                <input type="file" class="form-control" accept="image/*">
              </div>
              <div class="col-md-12">
                <label class="form-label">Contenu (liste)</label>
                <textarea class="form-control" rows="4" placeholder="Entrez chaque élément sur une ligne séparée..."></textarea>
              </div>
              <div class="col-12 text-end">
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-plus-circle"></i> Ajouter
                </button>
              </div>
            </div>
          </form>
        </section>

        <!-- Liste des savoir-faire existants -->
        <section>
          <h4 class="mb-4"><i class="bi bi-card-checklist me-2"></i>Savoir-faire existants</h4>

          <!-- Exemple d'un savoir-faire -->
          <form class="card mb-4 shadow-sm p-3" enctype="multipart/form-data">
            <div class="row align-items-center">
              <!-- Image -->
              <div class="col-md-3 text-center">
                <label for="savoirImage1" class="d-block cursor-pointer">
                  <img src="https://via.placeholder.com/150" alt="Savoir-faire" class="img-fluid rounded border" style="cursor: pointer;">
                </label>
                <input type="file" class="form-control d-none" id="savoirImage1" accept="image/*">
              </div>

              <!-- Infos -->
              <div class="col-md-6">
                <div class="mb-2">
                  <label class="form-label">Titre</label>
                  <input type="text" class="form-control" value="Matériaux usinés">
                </div>
                <div class="mb-2">
                  <label class="form-label">Contenu (liste)</label>
                  <textarea class="form-control" rows="4">Acier
  Inox
  Aluminium
  Alliage de cuivre
  Titane
  Plastique
  Plastique chargé
  Inconel
  Densimet</textarea>
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



