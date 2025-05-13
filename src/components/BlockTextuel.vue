<script setup></script>

<template>
  <main class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">

        <h4 class="mb-4"><i class="bi bi-pencil-square me-2"></i>Modifier les blocs textuels</h4>

        <!-- Block textuel existant -->
        <form class="card shadow-sm p-4 mb-4">
          <div class="mb-3">
            <label class="form-label">Titre</label>
            <input type="text" class="form-control" value="ENGAGEMENTS">
          </div>
          <div class="mb-3">
            <label class="form-label">Contenu</label>
            <textarea class="form-control" rows="6">Il est indispensable que notre société fournisse des prestations répondant aux exigences de nos clients, aux exigences légales et réglementaires applicables et leur apporte satisfaction.

  Pour cela, nous avons mis en place un Système de Management de la Qualité que l’on se doit de respecter...</textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-success">
              <i class="bi bi-floppy"></i> Sauvegarder
            </button>
          </div>
        </form>

        <!-- Ajouter d'autres blocs ici si besoin -->

      </div>
    </div>
  </main>
</template>

<style scoped></style>
