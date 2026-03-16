# TMDB PWA - Vue 3 Movie Application

A Progressive Web Application (PWA) for browsing movies using the TMDB API.

## Features

- 🎬 **Movie Browsing**: Browse movies by category (Now Playing, Popular, Top Rated, Upcoming)
- 🔍 **Search Functionality**: Search for movies by title
- ⭐ **Favorites Management**: Save and manage your favorite movies
- 📱 **PWA Support**: Installable as a native app on mobile devices
- 🎨 **Responsive Design**: Works on desktop, tablet, and mobile
- 🚀 **Fast Performance**: Built with Vue 3 and Vite

## Project Structure

```
tmdb-pwa/
├── src/
│   ├── components/     # Reusable Vue components
│   │   └── BottomNavigation.vue
│   ├── views/         # Page components
│   │   ├── HomeView.vue
│   │   ├── MovieView.vue
│   │   └── MineView.vue
│   ├── services/      # API services
│   │   └── tmdbService.ts
│   ├── router/        # Vue Router configuration
│   │   └── index.ts
│   ├── assets/        # Static assets and styles
│   │   └── main.css
│   ├── App.vue        # Root component
│   └── main.ts        # Application entry point
├── public/            # Public assets
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Build the application for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

## API Configuration

The application uses the TMDB API with the following endpoints:

- `/movie/now_playing` - Currently playing movies
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/movie/upcoming` - Upcoming movies
- `/search/movie` - Search movies

API Key: `7d91016867f3580c66797e9cf405bf03`

## PWA Features

- **Installable**: Can be installed as a standalone app
- **Offline Support**: Service worker for caching
- **App-like Experience**: Full-screen mode and native feel
- **Push Notifications**: Ready for push notification integration

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management for Vue
- **Axios** - HTTP client for API requests
- **Vite PWA** - PWA plugin for Vite

## License

MIT