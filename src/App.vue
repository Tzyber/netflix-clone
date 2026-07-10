<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import Magnify from "vue-material-design-icons/Magnify.vue";
import HomeOutline from "vue-material-design-icons/HomeOutline.vue";
import TrendingUp from "vue-material-design-icons/TrendingUp.vue";
import Television from "vue-material-design-icons/Television.vue";
import MovieOutline from "vue-material-design-icons/MovieOutline.vue";
import Plus from "vue-material-design-icons/Plus.vue";

import moviesData from "./movies.json";
import { useMovieStore } from "./stores/movie";
import { posterUrl } from "./lib/movie";
import type { Movie } from "./lib/movie";

import OrbitIntro from "./components/OrbitIntro.vue";
import VideoCarousel from "./components/VideoCarousel.vue";
import MovieDetails from "./components/MovieDetails.vue";
import ModalDialog from "./components/ModalDialog.vue";

const movies = moviesData as unknown as Movie[][];

const store = useMovieStore();
const { movie, showFullVideo, modalMovie } = storeToRefs(store);
const showLogo = ref(true);

const closeModal = () => (store.modalMovie = null);

const nav = [
  { icon: Magnify, label: "Suche" },
  { icon: HomeOutline, label: "Start", active: true },
  { icon: TrendingUp, label: "Trends" },
  { icon: Television, label: "Serien" },
  { icon: MovieOutline, label: "Filme" },
  { icon: Plus, label: "Meine Liste" },
];

onMounted(() => {
  // Hero initial mit dem ersten Titel füllen (statt Render-Side-Effect wie zuvor)
  store.movie = movies[0][0];
  window.setTimeout(() => (showLogo.value = false), 4000);
});
</script>

<template>
  <OrbitIntro v-if="showLogo" />

  <div v-else class="shell">
    <!-- Navigation: Desktop = Icon-Sidebar, Mobile = Bottom-Bar -->
    <nav v-if="!showFullVideo" class="nav" aria-label="Hauptnavigation">
      <a href="#" class="nav__brand" aria-label="ORBIT Start">O</a>
      <ul class="nav__list">
        <li v-for="item in nav" :key="item.label">
          <button
            type="button"
            class="nav__item"
            :class="{ 'nav__item--active': item.active }"
            :aria-label="item.label"
            :aria-current="item.active ? 'page' : undefined"
          >
            <component :is="item.icon" fillColor="currentColor" :size="26" />
          </button>
        </li>
      </ul>
    </nav>

    <main class="main">
      <!-- Hero-Billboard -->
      <section v-if="movie" class="hero">
        <div class="hero__bg" :style="{ backgroundImage: `url(${posterUrl(movie.name)})` }"></div>
        <div class="hero__scrim"></div>
        <div class="hero__content">
          <MovieDetails :movie="movie" />
        </div>
      </section>

      <!-- Kategorie-Rows -->
      <div class="rows">
        <VideoCarousel :index="1" category="Derzeit beliebt" :movies="movies[0]" />
        <VideoCarousel :index="2" category="Horror Movies" :movies="movies[1]" />
        <VideoCarousel :index="3" category="Featured Movies" :movies="movies[2]" />
      </div>
    </main>

    <!-- Detail-Modal: zentral, öffnet aus jeder Scroll-Position -->
    <ModalDialog v-if="modalMovie" :movie="modalMovie" @closeDialog="closeModal" />
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  background: var(--void);
}

/* ---- Navigation ---- */
.nav {
  position: fixed;
  z-index: 40;
  left: 0;
  top: 0;
  height: 100vh;
  width: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 22px 0;
  background: var(--panel);
  border-right: 1px solid var(--hairline);
}
.nav__brand {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  color: var(--signal);
  text-decoration: none;
  line-height: 1;
}
.nav__list {
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav__item {
  display: grid;
  place-items: center;
  color: var(--ink-dim);
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: color 0.2s ease, background 0.2s ease;
}
.nav__item:hover {
  color: var(--ink);
  background: rgba(124, 140, 255, 0.08);
}
.nav__item--active {
  color: var(--signal);
}
.nav__item:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 2px;
}

/* ---- Main ---- */
.main {
  margin-left: 76px;
}

/* ---- Hero ---- */
.hero {
  position: relative;
  width: 100%;
  height: clamp(440px, 66vh, 760px);
  overflow: hidden;
}
.hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center right;
}
.hero__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, var(--void) 0%, rgba(5, 7, 15, 0.82) 38%, rgba(5, 7, 15, 0.1) 78%, transparent 100%),
    linear-gradient(0deg, var(--void) 2%, transparent 42%);
}
.hero__content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 0 clamp(20px, 5vw, 72px) clamp(24px, 5vh, 56px);
}

/* ---- Rows ---- */
.rows {
  position: relative;
  z-index: 3;
  margin-top: clamp(20px, 3vh, 36px);
  padding: 0 clamp(16px, 3vw, 48px) 64px;
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 4vh, 48px);
}

/* ---- Breakpoint 860: Sidebar -> Bottom-Bar ---- */
@media (max-width: 860px) {
  .nav {
    top: auto;
    bottom: 0;
    height: auto;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    gap: 0;
    padding: 10px 6px calc(10px + env(safe-area-inset-bottom));
    border-right: none;
    border-top: 1px solid var(--hairline);
    background: rgba(10, 14, 28, 0.92);
    backdrop-filter: blur(8px);
  }
  .nav__brand {
    display: none;
  }
  .nav__list {
    flex-direction: row;
    gap: 4px;
    width: 100%;
    justify-content: space-around;
  }
  .main {
    margin-left: 0;
    padding-bottom: 72px;
  }
}
</style>
