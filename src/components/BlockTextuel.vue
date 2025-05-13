<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

// Types de blocs textuels disponibles
const TEXTUAL_TYPES = ['historique', 'engagements', 'savoir_faire']

// Liste des blocs textuels existants
const textBlocks = ref([])

// Chargement des blocs au montage du composant
onMounted(async () => {
  await fetchTextBlocks()
})

// Récupère les 3 blocs textuels (un de chaque type)
async function fetchTextBlocks() {
  textBlocks.value = []
  
  try {
    // On charge chaque type de bloc séparément
    for (const type of TEXTUAL_TYPES) {
      const response = await fetch(`${API_URL}/type/${type}`)
      if (response.ok) {
        const data = await response.json()
        // On s'assure qu'on a bien un tableau (au cas où l'API renvoie un objet seul)
        const blocks = Array.isArray(data) ? data : [data]
        blocks.forEach(block => {
          // On ajoute le type au bloc pour l'utiliser dans les requêtes
          block.textualType = type
          textBlocks.value.push(block)
        })
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des blocs textuels:', error)
  }
}

async function handleSubmit(textBlock, event) {
  event.preventDefault()
  
  // On utilise le type spécifique du bloc pour la requête
  const jsonData = {
    type: textBlock.textualType,
    title: textBlock.title,
    content: textBlock.content
  }

  try {
    const response = await fetch(`${API_URL}/${textBlock.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
    
    if (response.ok) {
      alert('Bloc textuel modifié avec succès')
      // On pourrait recharger les données si nécessaire
      // await fetchTextBlocks()
    }
  } catch (error) {
    console.error('Erreur:', error)
  }
}
</script>

<template>
  <main class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <!-- Liste des blocs textuels existants -->
        <section>
          <h4 class="mb-4"><i class="bi bi-pencil-square me-2"></i>Blocs textuels existants</h4>

          <!-- Boucle sur les blocs textuels -->
          <div v-for="textBlock in textBlocks" :key="textBlock.id" class="card mb-4 shadow-sm p-4">
            <form @submit.prevent="handleSubmit(textBlock, $event)">
              <div class="mb-3">
                <label class="form-label">Type de bloc</label>
                <input 
                  type="text" 
                  class="form-control" 
                  :value="textBlock.textualType"
                  disabled
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Titre</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="textBlock.title"
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Contenu</label>
                <textarea 
                  class="form-control" 
                  rows="6"
                  v-model="textBlock.content"
                  required
                ></textarea>
              </div>
              <div class="text-end">
                <button type="submit" class="btn btn-success d-flex align-items-center gap-2">
                  <i class="bi bi-pencil-square"></i> Sauvegarder
                </button>
              </div>
            </form>
          </div>

          <!-- Message si aucun bloc -->
          <div v-if="textBlocks.length === 0" class="alert alert-info">
            Chargement des blocs textuels...
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped></style>