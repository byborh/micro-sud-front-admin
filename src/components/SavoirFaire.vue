<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

// Données pour le nouveau savoir-faire
const newSkill = ref({
  type: 'savoir_faire',
  title: '',
  content: '',
  img: null
})

// Liste des savoir-faire existants
const skills = ref([])

// Chargement des savoir-faire au montage du composant
onMounted(async () => {
  await fetchSkills()
})

async function fetchSkills() {
  try {
    const response = await fetch(`${API_URL}/type/savoir_faire`)
    if (response.ok) {
      skills.value = await response.json()
    }
  } catch (error) {
    console.error('Erreur lors du chargement des savoir-faire:', error)
  }
}

function handleNewImageUpload(event) {
  newSkill.value.img = event.target.files[0]
}

function handleImageUpload(skill, event) {
  skill.img = event.target.files[0]
}

async function handleNewSubmit(event) {
  event.preventDefault()
  
  const formData = new FormData()
  formData.append('type', 'savoir_faire')
  formData.append('title', newSkill.value.title)
  formData.append('content', newSkill.value.content)
  
  if (newSkill.value.img) {
    formData.append('img', newSkill.value.img)
  }

  console.log('newSkill', newSkill.value)
  console.log('formData', formData)

  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      body: formData
    })
    
    if (response.ok) {
      alert('Savoir-faire ajouté avec succès')
      newSkill.value = { type: 'savoir_faire', title: '', content: '', img: null }
      await fetchSkills()
    } else {
      const errorData = await response.json()
      alert(`Erreur: ${errorData.message || 'Échec de l\'ajout du savoir-faire'}`)
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Une erreur est survenue lors de l\'ajout du savoir-faire')
  }
}

async function handleSubmit(skill, event) {
  event.preventDefault()
  
  const formData = new FormData()
  formData.append('type', 'savoir_faire')
  formData.append('title', skill.title)
  formData.append('content', skill.content)
  
  if (skill.img instanceof File) {
    formData.append('img', skill.img)
  }

  try {
    const response = await fetch(`${API_URL}/${skill.id}`, {
      method: 'PATCH',
      body: formData
    })
    
    if (response.ok) {
      alert('Savoir-faire modifié avec succès')
      await fetchSkills()
    } else {
      const errorData = await response.json()
      alert(`Erreur: ${errorData.message || 'Échec de la modification'}`)
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Une erreur est survenue lors de la modification')
  }
}

async function handleDelete(skillId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce savoir-faire ?')) {
    try {
      const response = await fetch(`${API_URL}/${skillId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        alert('Savoir-faire supprimé avec succès')
        await fetchSkills()
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue lors de la suppression')
    }
  }
}
</script>

<template>
  <main class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <!-- Formulaire de création -->
        <section class="card mb-5 shadow-sm p-4">
          <h4 class="mb-4"><i class="bi bi-tools me-2"></i>Ajouter un savoir-faire</h4>
          <form @submit="handleNewSubmit" enctype="multipart/form-data">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Titre</label>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Ex : Matériaux usinés"
                  v-model="newSkill.title"
                  required
                >
              </div>
              <div class="col-md-6">
                <label class="form-label">Image</label>
                <input 
                  type="file" 
                  class="form-control" 
                  accept="image/*"
                  @change="handleNewImageUpload"
                >
              </div>
              <div class="col-md-12">
                <label class="form-label">Contenu (liste)</label>
                <textarea 
                  class="form-control" 
                  rows="4" 
                  placeholder="Entrez chaque élément sur une ligne séparée..."
                  v-model="newSkill.content"
                  required
                ></textarea>
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

          <!-- Boucle sur les savoir-faire -->
          <div v-for="skill in skills" :key="skill.id" class="card mb-4 shadow-sm p-3">
            <form @submit.prevent="handleSubmit(skill, $event)" enctype="multipart/form-data">
              <div class="row align-items-center">
                <!-- Image -->
                <div class="col-md-3 text-center">
                  <label :for="'skillImage' + skill.id" class="d-block cursor-pointer">
                    <img 
                      :src="skill.img || 'https://via.placeholder.com/150'" 
                      alt="Savoir-faire" 
                      class="img-fluid rounded border" 
                      style="cursor: pointer; max-height: 150px;"
                    >
                  </label>
                  <input 
                    type="file" 
                    class="form-control d-none" 
                    :id="'skillImage' + skill.id" 
                    accept="image/*"
                    @change="handleImageUpload(skill, $event)"
                  >
                  <small class="text-muted">Cliquez pour changer l'image</small>
                </div>

                <!-- Infos -->
                <div class="col-md-6">
                  <div class="mb-2">
                    <label class="form-label">Titre</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="skill.title"
                      required
                    >
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Contenu (liste)</label>
                    <textarea 
                      class="form-control" 
                      rows="4"
                      v-model="skill.content"
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
                    @click="handleDelete(skill.id)"
                  >
                    <i class="bi bi-trash3"></i> Supprimer
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Message si aucun savoir-faire -->
          <div v-if="skills.length === 0" class="alert alert-info">
            Aucun savoir-faire disponible. Ajoutez-en un avec le formulaire ci-dessus.
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