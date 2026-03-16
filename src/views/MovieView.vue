<template>
  <div class="movie-view">
    <div class="header">
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search movies..."
          class="search-input"
          @input="handleSearch"
        />
        <button class="search-button" @click="handleSearch">
          🔍
        </button>
      </div>
      
      <div class="tag-bar">
        <button
          v-for="tag in tags"
          :key="tag.id"
          class="tag"
          :class="{ active: activeTag === tag.id }"
          @click="selectTag(tag.id)"
        >
          {{ tag.label }}
        </button>
      </div>
    </div>

    <div class="content">
      <div v-if="loading" class="loading">
        Loading movies...
      </div>
      
      <div v-else-if="movies.length === 0" class="no-results">
        No movies found
      </div>
      
      <div v-else class="movie-grid">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="movie-card"
        >
          <div class="movie-poster">
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="poster-image"
            />
            <div v-else class="poster-placeholder">
              No Image
            </div>
          </div>
          <div class="movie-info">
            <h3 class="movie-title">{{ movie.title }}</h3>
            <div class="movie-genres">
              <span class="genre" v-for="genre in movie.genre_names" :key="genre">
                {{ genre }}
              </span>
            </div>
            <div class="movie-release">
              📅 {{ formatDate(movie.release_date) }}
            </div>
            <div class="movie-rating">
              ⭐ {{ movie.vote_average?.toFixed(1) || 'N/A' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import BottomNavigation from '../components/BottomNavigation.vue'
import { fetchMovies, searchMovies } from '../services/tmdbService'

interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
  genre_names: string[]
}

const route = useRoute()
const searchQuery = ref('')
const activeTag = ref('now_playing')
const movies = ref<Movie[]>([])
const loading = ref(false)

const tags = [
  { id: 'now_playing', label: 'Now Playing' },
  { id: 'popular', label: 'Popular' },
  { id: 'top_rated', label: 'Top Rated' },
  { id: 'upcoming', label: 'Upcoming' }
]

const selectTag = (tagId: string) => {
  activeTag.value = tagId
  loadMovies()
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    searchMoviesByQuery()
  } else {
    loadMovies()
  }
}

const loadMovies = async () => {
  loading.value = true
  try {
    const data = await fetchMovies(activeTag.value)
    movies.value = data.map((movie: any) => ({
      ...movie,
      genre_names: [] // Will be populated from genre mapping
    }))
  } catch (error) {
    console.error('Error loading movies:', error)
  } finally {
    loading.value = false
  }
}

const searchMoviesByQuery = async () => {
  if (!searchQuery.value.trim()) return
  
  loading.value = true
  try {
    const data = await searchMovies(searchQuery.value)
    movies.value = data.map((movie: any) => ({
      ...movie,
      genre_names: [] // Will be populated from genre mapping
    }))
  } catch (error) {
    console.error('Error searching movies:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  loadMovies()
})

watch(() => route.path, () => {
  if (route.path === '/movie') {
    loadMovies()
  }
})
</script>

<style scoped>
.movie-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px; /* Space for bottom navigation */
}

.header {
  background: white;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #667eea;
}

.search-button {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background: #5a67d8;
}

.tag-bar {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.tag {
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border: none;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.tag:hover {
  background: #e0e0e0;
}

.tag.active {
  background: #667eea;
  color: white;
}

.content {
  flex: 1;
  padding: 1rem;
}

.loading, .no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
  font-size: 1.2rem;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.movie-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.movie-poster {
  height: 300px;
  overflow: hidden;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.movie-card:hover .poster-image {
  transform: scale(1.05);
}

.poster-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  color: #999;
  font-size: 0.9rem;
}

.movie-info {
  padding: 1rem;
}

.movie-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
}

.movie-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.genre {
  padding: 0.125rem 0.5rem;
  background: #f0f0f0;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #666;
}

.movie-release, .movie-rating {
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
}
</style>