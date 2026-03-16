<template>
  <div class="mine-view">
    <div class="header">
      <h1>My Favorites</h1>
      <p class="subtitle">Your saved movies and preferences</p>
    </div>

    <div class="content">
      <div v-if="favorites.length === 0" class="empty-state">
        <div class="empty-icon">⭐</div>
        <h3>No favorites yet</h3>
        <p>Start browsing movies and add your favorites here!</p>
        <router-link to="/movie" class="browse-button">
          Browse Movies
        </router-link>
      </div>

      <div v-else class="favorites-grid">
        <div
          v-for="movie in favorites"
          :key="movie.id"
          class="favorite-card"
        >
          <div class="favorite-poster">
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
              :alt="movie.title"
              class="poster-image"
            />
            <div v-else class="poster-placeholder">
              No Image
            </div>
          </div>
          <div class="favorite-info">
            <h3 class="movie-title">{{ movie.title }}</h3>
            <div class="movie-rating">
              ⭐ {{ movie.vote_average?.toFixed(1) || 'N/A' }}
            </div>
            <button class="remove-button" @click="removeFavorite(movie.id)">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BottomNavigation from '../components/BottomNavigation.vue'

interface FavoriteMovie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
}

const favorites = ref<FavoriteMovie[]>([
  // Mock data for demonstration
  {
    id: 1,
    title: 'Inception',
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    vote_average: 8.3
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    vote_average: 8.5
  },
  {
    id: 3,
    title: 'Interstellar',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    vote_average: 8.6
  }
])

const removeFavorite = (movieId: number) => {
  favorites.value = favorites.value.filter(movie => movie.id !== movieId)
}

onMounted(() => {
  // In a real app, load favorites from localStorage or backend
  const savedFavorites = localStorage.getItem('tmdb_favorites')
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites)
  }
})
</script>

<style scoped>
.mine-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px; /* Space for bottom navigation */
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
}

.header h1 {
  margin: 0;
  font-size: 2rem;
}

.subtitle {
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-size: 1rem;
}

.content {
  flex: 1;
  padding: 1rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  color: #666;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #333;
}

.empty-state p {
  margin: 0 0 2rem 0;
  max-width: 300px;
  line-height: 1.5;
}

.browse-button {
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.browse-button:hover {
  background: #5a67d8;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.favorite-card {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.favorite-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.favorite-poster {
  width: 100px;
  height: 150px;
  flex-shrink: 0;
  overflow: hidden;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.poster-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  color: #999;
  font-size: 0.8rem;
}

.favorite-info {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movie-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
}

.movie-rating {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
}

.remove-button {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background: #ff5252;
}
</style>