<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

// Données pour le nouveau blog
const newBlog = ref({
  title: '',
  date: '',
  content: '',
  img: null
})

// Liste des blogs existants
const blogs = ref([])

// Chargement des blogs au montage du composant
onMounted(async () => {
  await fetchBlogs()
})

async function fetchBlogs() {
  try {
    const response = await fetch(`${API_URL}/type/blog`)
    if (response.ok) {
      blogs.value = await response.json()
    }
  } catch (error) {
    console.error('Erreur lors du chargement des blogs:', error)
  }
}

function handleNewImageUpload(event) {
  newBlog.value.img = event.target.files[0]
}

function handleImageUpload(blog, event) {
  blog.img = event.target.files[0]
}

async function handleNewSubmit(event) {
  event.preventDefault();
  
  // Création de l'objet FormData
  const formData = new FormData();
  
  // Ajout des champs texte
  formData.append('type', 'blog');
  formData.append('title', newBlog.value.title);
  formData.append('date', newBlog.value.date);
  formData.append('content', newBlog.value.content);

  console.log(newBlog);
  
  // Ajout du fichier image si présent
  if (newBlog.value.img) {
    formData.append('img', newBlog.value.img);
  }

  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      // NE PAS mettre le header 'Content-Type' car il sera automatiquement 
      // défini avec le boundary correct par le navigateur
      body: formData
    });
    
    if (response.ok) {
      alert('Blog ajouté avec succès');
      // Réinitialisation du formulaire
      newBlog.value = {
        title: '',
        date: '',
        content: '',
        img: null
      };
      await fetchBlogs();
    } else {
      const errorData = await response.json();
      alert(`Erreur: ${errorData.message || 'Échec de la création du blog'}`);
    }
  } catch (error) {
    console.error('Erreur:', error);
    alert('Une erreur est survenue lors de la création du blog');
  }
}

async function handleSubmit(blog, event) {
  event.preventDefault()
  
  const jsonData = {
    type: 'blog'
  }

  if (blog.title) jsonData.title = blog.title
  if (blog.date) jsonData.date = blog.date
  if (blog.content) jsonData.content = blog.content
  if (blog.img) jsonData.img = blog.img.name
  else if (blog.img) jsonData.img = blog.img

  try {
    const response = await fetch(`${API_URL}/${blog.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
    
    if (response.ok) {
      alert('Blog modifié avec succès')
      await fetchBlogs()
    }
  } catch (error) {
    console.error('Erreur:', error)
  }
}

async function handleDelete(blogId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce blog ?')) {
    try {
      const response = await fetch(`${API_URL}/${blogId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        alert('Blog supprimé avec succès')
        await fetchBlogs()
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
        <!-- Formulaire de création -->
        <section class="card mb-5 shadow-sm p-4">
          <h4 class="mb-4"><i class="bi bi-journal-plus me-2"></i>Créer un nouveau blog</h4>
          <form @submit="handleNewSubmit" enctype="multipart/form-data">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Titre</label>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Titre du blog"
                  v-model="newBlog.title"
                  required
                >
              </div>
              <div class="col-md-6">
                <label class="form-label">Date</label>
                <input 
                  type="date" 
                  class="form-control"
                  v-model="newBlog.date"
                  required
                >
              </div>
              <div class="col-md-12">
                <label class="form-label">Contenu</label>
                <textarea 
                  class="form-control" 
                  rows="4" 
                  placeholder="Contenu du blog..."
                  v-model="newBlog.content"
                  required
                ></textarea>
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

          <!-- Boucle sur les blogs -->
          <div v-for="blog in blogs" :key="blog.id" class="card mb-4 shadow-sm p-3">
            <form @submit.prevent="handleSubmit(blog, $event)" enctype="multipart/form-data">
              <div class="row align-items-center">
                <!-- Image -->
                <div class="col-md-3 text-center">
                  <label :for="'blogImage' + blog.id" class="d-block cursor-pointer">
                    <img 
                      :src="blog.img || 'https://via.placeholder.com/150'" 
                      alt="Blog Image" 
                      class="img-fluid rounded border" 
                      style="cursor: pointer;"
                    >
                  </label>
                  <input 
                    type="file" 
                    class="form-control d-none" 
                    :id="'blogImage' + blog.id" 
                    accept="image/*"
                    @change="handleImageUpload(blog, $event)"
                  >
                </div>

                <!-- Inputs -->
                <div class="col-md-6">
                  <div class="mb-2">
                    <label class="form-label">Titre</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="blog.title"
                      required
                    >
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Date</label>
                    <input 
                      type="date" 
                      class="form-control" 
                      v-model="blog.date"
                      required
                    >
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Contenu</label>
                    <textarea 
                      class="form-control" 
                      rows="3"
                      v-model="blog.content"
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
                    @click="handleDelete(blog.id)"
                  >
                    <i class="bi bi-trash3"></i> Supprimer
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Message si aucun blog -->
          <div v-if="blogs.length === 0" class="alert alert-info">
            Aucun blog disponible. Ajoutez-en un avec le formulaire ci-dessus.
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped></style>