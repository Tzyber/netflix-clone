<script setup lang="ts">
import type { PropType } from "vue";
import { useMovieStore } from "../stores/movie";
import type { Movie } from "../lib/movie";
import { genreList } from "../lib/movie";

const props = defineProps({
  movie: {
    type: Object as PropType<Movie>,
    required: true,
  },
});

const store = useMovieStore();
// Modal wird zentral in App.vue gerendert; hier nur auslösen.
const openModal = () => (store.modalMovie = props.movie);
</script>

<template>
  <div class="max-w-xl">
    <!-- F4: Titel ohne replace -->
    <h1
      class="font-display font-bold text-ink leading-[0.95] tracking-tight"
      style="font-size: clamp(2rem, 5.5vw, 4.25rem)"
    >
      {{ movie.name }}
    </h1>

    <p class="mt-4 font-mono text-xs sm:text-sm tracking-[0.2em] text-ink-dim uppercase">
      {{ movie.year }}
      <template v-for="g in genreList(movie)" :key="g">
        <span class="mx-2 text-signal">/</span>{{ g }}
      </template>
    </p>

    <p class="mt-5 text-sm sm:text-base text-ink-dim leading-relaxed line-clamp-3 sm:line-clamp-none">
      {{ movie.description }}
    </p>

    <div class="mt-7 flex flex-wrap gap-3">
      <!-- F5: Play = solid Signal auf dunkel (lesbar) -->
      <button
        class="inline-flex items-center gap-2 rounded-md bg-signal px-6 py-2.5 font-medium text-void transition hover:bg-signal/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
      >
        <svg width="16" height="16" viewBox="0 0 17.8 17.8" fill="currentColor" aria-hidden="true">
          <path d="M2.067.043C2.21-.028 2.372-.008 2.493.085l13.312 8.503c.094.078.154.191.154.313 0 .12-.061.237-.154.314L2.492 17.717c-.07.057-.162.087-.25.087l-.176-.04c-.136-.065-.222-.207-.222-.361V.402C1.844.25 1.93.107 2.067.043z" />
        </svg>
        Abspielen
      </button>

      <!-- Info = transparentes Panel mit Hairline -->
      <button
        @click="openModal"
        class="inline-flex items-center gap-2 rounded-md border border-hairline bg-panel/60 px-6 py-2.5 font-medium text-ink backdrop-blur-sm transition hover:border-signal/60 hover:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path stroke-linecap="round" d="M12 11v6" />
          <circle cx="12" cy="7.5" r="0.5" fill="currentColor" />
        </svg>
        Weitere Infos
      </button>
    </div>
  </div>
</template>
