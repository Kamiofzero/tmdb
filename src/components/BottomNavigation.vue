<template>
  <nav class="bottom-navigation">
    <router-link 
      to="/movie" 
      class="nav-item"
      :class="{ active: $route.path === '/movie' }"
    >
      <div class="nav-icon">🎬</div>
      <div class="nav-label">Movie</div>
    </router-link>
    <router-link 
      to="/mine" 
      class="nav-item"
      :class="{ active: $route.path === '/mine' }"
    >
      <div class="nav-icon">⭐</div>
      <div class="nav-label">Mine</div>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: white;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0;
  text-decoration: none;
  color: #666;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: #f5f5f5;
}

.nav-item.active {
  color: #667eea;
}

.nav-item.active .nav-icon {
  transform: scale(1.1);
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  transition: transform 0.3s ease;
}

.nav-label {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>