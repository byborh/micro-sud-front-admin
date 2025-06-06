<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

// Données pour le formulaire d'ajout
const newMachine = ref({
  title: '',
  content: '',
  img: null,
  imgPreview: null
})

// Liste des machines existantes
const machines = ref([])

// Chargement des machines au montage du composant
onMounted(async () => {
  console.log('Composant monté, chargement des machines...')
  await fetchMachines()
})

async function fetchMachines() {
  console.log('Début de fetchMachines')
  try {
    const response = await fetch(`${API_URL}/type/machine`)
    console.log('Réponse reçue:', response)
    if (response.ok) {
      machines.value = await response.json()
      console.log('Machines chargées:', machines.value)
    } else {
      console.error('Erreur dans la réponse:', response.status)
    }
  } catch (error) {
    console.error('Erreur lors du chargement des machines:', error)
  }
}

function handleNewImageUpload(event) {
  console.log('Nouvelle image sélectionnée', event.target.files)
  const file = event.target.files[0];
  if (file) {
    newMachine.value.img = file;
    newMachine.value.imgPreview = URL.createObjectURL(file);
    console.log('Nouvelle image configurée:', newMachine.value.img)
  }
}

function handleImageUpload(machine, event) {
  console.log('Image modifiée pour machine', machine.id, event.target.files)
  const file = event.target.files[0];
  if (file) {
    machine.img = file;
    machine.imgPreview = URL.createObjectURL(file);
    console.log('Image modifiée configurée:', machine.img)
  }
}

async function handleNewSubmit(event) {
  event.preventDefault()
  console.log('Soumission nouvelle machine', newMachine.value)
  
  const formData = new FormData()
  formData.append('type', 'machine')
  formData.append('title', newMachine.value.title)
  formData.append('content', newMachine.value.content)
  
  // Debug: Afficher le contenu de FormData
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value)
  }

  if (newMachine.value.img) {
    formData.append('img', newMachine.value.img)
    console.log('Image ajoutée à FormData:', newMachine.value.img)
  }

  try {
    console.log('Envoi requête POST à:', API_URL)
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      body: formData
    })
    
    console.log('Réponse reçue:', response)
    if (response.ok) {
      const responseData = await response.json()
      console.log('Réponse complète:', responseData)
      alert('Machine ajoutée avec succès')
      newMachine.value = {
        title: '',
        content: '',
        img: null,
        imgPreview: null
      }
      await fetchMachines()
    } else {
      const errorData = await response.json()
      console.error('Erreur serveur:', errorData)
      alert(`Erreur: ${errorData.message || 'Échec de l\'ajout de la machine'}`)
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Une erreur est survenue lors de l\'ajout de la machine')
  }
}

async function handleSubmit(machine, event) {
  event.preventDefault()
  console.log('Soumission modification machine', machine)
  
  const formData = new FormData()
  formData.append('type', 'machine')
  formData.append('title', machine.title)
  formData.append('content', machine.content)
  
  // Debug: Afficher le contenu de FormData
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value)
  }

  if (machine.img instanceof File) {
    formData.append('img', machine.img)
    console.log('Image ajoutée à FormData:', machine.img)
  }

  try {
    console.log('Envoi requête PATCH à:', `${API_URL}/${machine.id}`)
    const response = await fetch(`${API_URL}/${machine.id}`, {
      method: 'PATCH',
      body: formData
    })
    
    console.log('Réponse reçue:', response)
    if (response.ok) {
      const responseData = await response.json()
      console.log('Réponse complète:', responseData)
      alert('Machine modifiée avec succès')
      await fetchMachines()
    } else {
      const errorData = await response.json()
      console.error('Erreur serveur:', errorData)
      alert(`Erreur: ${errorData.message || 'Échec de la modification'}`)
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Une erreur est survenue lors de la modification')
  }
}

async function handleDelete(machineId) {
  console.log('Tentative de suppression machine', machineId)
  if (confirm('Êtes-vous sûr de vouloir supprimer cette machine ?')) {
    try {
      const response = await fetch(`${API_URL}/${machineId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Réponse suppression:', response)
      if (response.ok) {
        alert('Machine supprimée avec succès')
        await fetchMachines()
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue lors de la suppression')
    }
  }
}
</script>

<template>
  <!-- Le template reste inchangé -->
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
                      :src="newMachine.imgPreview || 'https://via.placeholder.com/150'" 
                      class="img-fluid rounded border" 
                      style="cursor: pointer; height: 150px; object-fit: cover;"
                    >
                  </label>
                  <input 
                    type="file" 
                    class="form-control d-none" 
                    id="newMachineImage" 
                    accept="image/*"
                    @change="handleNewImageUpload"
                    required
                  >
                  <small class="text-muted">Cliquez pour changer l'image</small>
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
                      required
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
                        :src="machine.imgPreview || machine.img || 'https://via.placeholder.com/150'" 
                        class="img-fluid rounded border" 
                        style="cursor: pointer; height: 150px; object-fit: cover;"
                      >
                    </label>
                    <input 
                      type="file" 
                      class="form-control d-none" 
                      :id="'machineImage' + machine.id" 
                      accept="image/*"
                      @change="handleImageUpload(machine, $event)"
                    >
                    <small class="text-muted">Cliquez pour changer l'image</small>
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
                        required
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

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>