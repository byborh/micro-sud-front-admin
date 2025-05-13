<script setup></script>

<template>
  <main class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">

          <!-- Formulaire de création de machine -->
          <section class="card mb-5 shadow-sm p-4">
            <h4 class="mb-4"><i class="bi bi-plus-circle me-2"></i>Ajouter une machine</h4>
            <form enctype="multipart/form-data">
              <div class="row g-3">
                <div class="col-md-4 text-center">
                  <label for="newMachineImage" class="d-block">
                    <img src="https://via.placeholder.com/150" class="img-fluid rounded border" style="cursor: pointer;">
                  </label>
                  <input type="file" class="form-control d-none" id="newMachineImage" accept="image/*">
                </div>
                <div class="col-md-8">
                  <div class="mb-2">
                    <label class="form-label">Nom de la machine</label>
                    <input type="text" class="form-control" placeholder="Ex : DMG-MORI">
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Modèle</label>
                    <input type="text" class="form-control" placeholder="Ex : DMU50 3ème Génération">
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" rows="3" placeholder="Ex : 5 Axes Continue 650x520x475"></textarea>
                  </div>
                  <div class="text-end">
                    <button type="submit" class="btn btn-primary">
                      <i class="bi bi-plus-circle-fill me-1"></i> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>

          <!-- Liste des machines existantes -->
          <section>
            <h4 class="mb-4"><i class="bi bi-gear-fill me-2"></i>Machines existantes</h4>

            <!-- Carte Machine -->
            <form class="card mb-4 shadow-sm p-3" enctype="multipart/form-data">
              <div class="row align-items-center">
                <!-- Image -->
                <div class="col-md-3 text-center">
                  <label for="machineImage1" class="d-block cursor-pointer">
                    <img src="https://via.placeholder.com/150" alt="Machine Image" class="img-fluid rounded border" style="cursor: pointer;">
                  </label>
                  <input type="file" class="form-control d-none" id="machineImage1" accept="image/*">
                </div>

                <!-- Inputs -->
                <div class="col-md-6">
                  <div class="mb-2">
                    <label class="form-label">Nom de la machine</label>
                    <input type="text" class="form-control" value="DMG-MORI">
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Modèle</label>
                    <input type="text" class="form-control" value="DMU50 3ème Génération">
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" rows="3">5 Axes Continue 650x520x475</textarea>
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

            <!-- D'autres machines pourraient suivre ici -->

          </section>

        </div>
      </div>
  </main>
</template>

<style scoped></style>
