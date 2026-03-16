<template>
  <div class="home">
    <div class="content">
      <h1>Welcome to TMDB PWA</h1>
      <p>Browse movies and manage your favorites</p>
      <div class="nav-buttons">
        <router-link to="/movie" class="nav-button">
          <span>🎬</span>
          <span>Movies</span>
        </router-link>
        <router-link to="/mine" class="nav-button">
          <span>⭐</span>
          <span>My Favorites</span>
        </router-link>
      </div>
    </div>
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import BottomNavigation from '../components/BottomNavigation.vue'
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
}

.nav-buttons {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.nav-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.nav-button span:first-child {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.nav-button span:last-child {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>