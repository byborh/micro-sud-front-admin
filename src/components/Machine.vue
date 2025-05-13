<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

// Données pour le formulaire d'ajout
const newMachine = ref({
  title: '',
  content: '',
  img: null
})

// Liste des machines existantes
const machines = ref([])

// Chargement des machines au montage du composant
onMounted(async () => {
  await fetchMachines()
})

async function fetchMachines() {
  try {
    const response = await fetch(`${API_URL}/type/machine`)
    if (response.ok) {
      machines.value = await response.json()
    }
  } catch (error) {
    console.error('Erreur lors du chargement des machines:', error)
  }
}

function handleNewImageUpload(event) {
  newMachine.value.img = event.target.files[0]
}

function handleImageUpload(machine, event) {
  machine.img = event.target.files[0]
}

async function handleNewSubmit(event) {
  event.preventDefault()
  
  const jsonData = {
    type: 'machine',
    title: newMachine.value.title,
    content: newMachine.value.content,
    img: newMachine.value.img?.name || 'img'
  }

  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
    
    if (response.ok) {
      alert('Machine ajoutée avec succès')
      newMachine.value = {
        title: '',
        content: '',
        img: null
      }
      await fetchMachines()
    }
  } catch (error) {
    console.error('Erreur:', error)
  }
}

async function handleSubmit(machine, event) {
  event.preventDefault()
  
  // Construire l'objet complet comme pour les blogs
  const jsonData = {
    type: 'machine',
    title: machine.title,
    content: machine.content
  }

  // Gestion spécifique de l'image
  if (machine.img) {
    jsonData.img = machine.img.name || machine.img
  }

  try {
    const response = await fetch(`${API_URL}/${machine.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
    
    if (response.ok) {
      alert('Machine modifiée avec succès')
      await fetchMachines()
    }
  } catch (error) {
    console.error('Erreur:', error)
  }
}

async function handleDelete(machineId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette machine ?')) {
    try {
      const response = await fetch(`${API_URL}/${machineId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        alert('Machine supprimée avec succès')
        await fetchMachines()
      }
    } catch (error) {
      console.error('Erreur:', error)
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
                    <img src="https://via.placeholder.com/150" class="img-fluid rounded border" style="cursor: pointer;">
                  </label>
                  <input 
                    type="file" 
                    class="form-control d-none" 
                    id="newMachineImage" 
                    accept="image/*"
                    @change="handleNewImageUpload"
                  >
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
                    >
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Description</label>
                    <textarea 
                      class="form-control" 
                      rows="3" 
                      placeholder="Ex : 5 Axes Continue 650x520x475"
                      v-model="newMachine.content"
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
            <div v-for="machine in machines" :key="machine.id" class="card mb-4 shadow-sm p-3">
              <form @submit.prevent="handleSubmit(machine, $event)" enctype="multipart/form-data">
                <div class="row align-items-center">
                  <!-- Image -->
                  <div class="col-md-3 text-center">
                    <label :for="'machineImage' + machine.id" class="d-block cursor-pointer">
                      <img 
                        :src="machine.img || 'https://via.placeholder.com/150'" 
                        alt="Machine Image" 
                        class="img-fluid rounded border" 
                        style="cursor: pointer;"
                      >
                    </label>
                    <input 
                      type="file" 
                      class="form-control d-none" 
                      :id="'machineImage' + machine.id" 
                      accept="image/*"
                      @change="handleImageUpload(machine, $event)"
                    >
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
                      >
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Description</label>
                      <textarea 
                        class="form-control" 
                        rows="3"
                        v-model="machine.content"
                      ></textarea>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="col-md-3 text-end">
                    <button type="submit" class="btn btn-success mb-2 w-100 d-flex align-items-center justify-content-center gap-2">
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