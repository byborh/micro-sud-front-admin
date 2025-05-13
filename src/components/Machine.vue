<script setup>
import { ref, onMounted } from "vue";

const API_URL = import.meta.env.VITE_API_URL;

// Données pour le formulaire d'ajout
const newMachine = ref({
  title: "",
  model: "",
  description: "",
  imageFile: null,
});

// Liste des machines existantes
const machines = ref([]);

// Chargement des machines au montage du composant
onMounted(async () => {
  await fetchMachines();
});

async function fetchMachines() {
  try {
    const response = await fetch(`${API_URL}/contentblocks`);
    if (response.ok) {
      machines.value = await response.json();
    }
  } catch (error) {
    console.error("Erreur lors du chargement des machines:", error);
  }
}

function handleNewImageUpload(event) {
  newMachine.value.imageFile = event.target.files[0];
}

function handleImageUpload(machine, event) {
  machine.imageFile = event.target.files[0];
}

async function handleNewSubmit(event) {
  event.preventDefault();

  const jsonData = {
    type: "machine",
    title: newMachine.value.title,
    model: newMachine.value.model,
    description: newMachine.value.description,
    img: newMachine.value.imageFile?.name || "img",
  };

  try {
    const response = await fetch(`${API_URL}/contentblocks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    if (response.ok) {
      alert("Machine ajoutée avec succès");
      // Réinitialiser le formulaire
      newMachine.value = {
        title: "",
        model: "",
        description: "",
        imageFile: null,
      };
      // Recharger la liste
      await fetchMachines();
    }
  } catch (error) {
    console.error("Erreur:", error);
  }
}

async function handleSubmit(machine, event) {
  event.preventDefault();

  const jsonData = {
    id: machine.id,
    type: "machine",
    title: machine.title,
    model: machine.model,
    description: machine.description,
    img: machine.imageFile?.name || machine.img || "img",
  };

  try {
    const response = await fetch(`${API_URL}/contentblocks/${machine.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    if (response.ok) {
      alert("Machine modifiée avec succès");
      await fetchMachines();
    }
  } catch (error) {
    console.error("Erreur:", error);
  }
}

async function handleDelete(machineId) {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette machine ?")) {
    try {
      const response = await fetch(`${API_URL}/contentblocks/${machineId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Machine supprimée avec succès");
        await fetchMachines();
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  }
}
</script>

<template>
  <main class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <!-- Formulaire de création de machine -->
        <section class="card mb-5 shadow-sm p-4">
          <h4 class="mb-4"><i class="bi bi-plus-circle me-2"></i>Ajouter une machine</h4>
          <form @submit="handleNewSubmit" enctype="multipart/form-data">
            <div class="row g-3">
              <div class="col-md-4 text-center">
                <label for="newMachineImage" class="d-block">
                  <img
                    src="https://via.placeholder.com/150"
                    class="img-fluid rounded border"
                    style="cursor: pointer"
                  />
                </label>
                <input
                  type="file"
                  class="form-control d-none"
                  id="newMachineImage"
                  accept="image/*"
                  @change="handleNewImageUpload"
                />
              </div>
              <div class="col-md-8">
                <div class="mb-2">
                  <label class="form-label">Nom de la machine</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ex : DMG-MORI"
                    v-model="newMachine.title"
                    required
                  />
                </div>
                <div class="mb-2">
                  <label class="form-label">Modèle</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ex : DMU50 3ème Génération"
                    v-model="newMachine.model"
                    required
                  />
                </div>
                <div class="mb-2">
                  <label class="form-label">Description</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Ex : 5 Axes Continue 650x520x475"
                    v-model="newMachine.description"
                  ></textarea>
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

          <!-- Boucle sur les machines -->
          <div
            v-for="machine in machines"
            :key="machine.id"
            class="card mb-4 shadow-sm p-3"
          >
            <form
              @submit.prevent="handleSubmit(machine, $event)"
              enctype="multipart/form-data"
            >
              <div class="row align-items-center">
                <!-- Image -->
                <div class="col-md-3 text-center">
                  <label
                    :for="'machineImage' + machine.id"
                    class="d-block cursor-pointer"
                  >
                    <img
                      :src="machine.img || 'https://via.placeholder.com/150'"
                      alt="Machine Image"
                      class="img-fluid rounded border"
                      style="cursor: pointer"
                    />
                  </label>
                  <input
                    type="file"
                    class="form-control d-none"
                    :id="'machineImage' + machine.id"
                    accept="image/*"
                    @change="handleImageUpload(machine, $event)"
                  />
                </div>

                <!-- Inputs -->
                <div class="col-md-6">
                  <div class="mb-2">
                    <label class="form-label">Nom de la machine</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="machine.title"
                      required
                    />
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Modèle</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="machine.model"
                      required
                    />
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Description</label>
                    <textarea
                      class="form-control"
                      rows="3"
                      v-model="machine.description"
                    ></textarea>
                  </div>
                </div>

                <!-- Actions -->
                <div class="col-md-3 text-end">
                  <button
                    type="submit"
                    class="btn btn-success mb-2 w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    <i class="bi bi-pencil-square"></i> Modifier
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
                    @click="handleDelete(machine.id)"
                  >
                    <i class="bi bi-trash3"></i> Supprimer
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Message si aucune machine -->
          <div v-if="machines.length === 0" class="alert alert-info">
            Aucune machine disponible. Ajoutez-en une avec le formulaire ci-dessus.
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
