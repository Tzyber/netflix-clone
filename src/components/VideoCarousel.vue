<script setup lang="ts">
import { computed, ref } from "vue";
import type { PropType } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

import { useMovieStore } from "../stores/movie";
import { posterUrl } from "../lib/movie";
import type { Movie } from "../lib/movie";

const props = defineProps({
  category: { type: String, required: true },
  index: { type: Number, required: true },
  movies: { type: Array as PropType<Movie[]>, required: true },
});

const store = useMovieStore();
const selectedIndex = ref<number | null>(null);

const count = computed(() => props.movies.length);

// A1 verifiziert: vue3-carousel 0.3.1 kann itemsToShow pro Breakpoint.
// itemsToShow wird NICHT auf die Filmanzahl geklemmt – sonst würden wenige
// Filme über die ganze Breite gezogen (Riesenkarten). Ohne wrap-around zeigt
// die kurze Row ihre Karten einfach links-bündig in normaler Größe.
// Fractional = "next card peeks" als Affordanz.
const base: Record<number, number> = { 0: 2.2, 480: 3.2, 860: 4.2, 1200: 6.2, 1600: 8 };
const breakpoints = computed(() => {
  const out: Record<number, { itemsToShow: number; snapAlign: "start" }> = {};
  for (const bp of Object.keys(base)) {
    out[Number(bp)] = { itemsToShow: base[Number(bp)], snapAlign: "start" };
  }
  return out;
});
// Nur loopen/Navigation zeigen, wenn wirklich mehr Filme da sind als sichtbar.
const wrapAround = computed(() => count.value > 8);
const showNav = computed(() => count.value > 3);
const label = computed(() => String(props.index).padStart(2, "0"));

function selectCard(movie: Movie, i: number) {
  selectedIndex.value = i;
  store.modalMovie = movie; // Klick auf Karte -> Detail-Modal direkt auf
}
</script>

<template>
  <section class="row">
    <h2 class="mb-3 font-mono text-xs tracking-[0.25em] text-ink-dim uppercase">
      <span class="text-signal">{{ label }}</span>
      <span class="mx-2 text-hairline">—</span>{{ category }}
    </h2>

    <Carousel
      :items-to-show="2.2"
      :items-to-scroll="1"
      :breakpoints="breakpoints"
      :wrap-around="wrapAround"
      :transition="450"
      snap-align="start"
    >
      <Slide v-for="(slide, i) in movies" :key="slide.name">
        <button
          type="button"
          class="card group"
          :class="{ 'card--selected': selectedIndex === i }"
          @click="selectCard(slide, i)"
        >
          <img
            :src="posterUrl(slide.name)"
            :alt="slide.name"
            loading="lazy"
            draggable="false"
            class="card__img"
          />
          <span class="bracket bracket--tl" aria-hidden="true"></span>
          <span class="bracket bracket--tr" aria-hidden="true"></span>
          <span class="bracket bracket--bl" aria-hidden="true"></span>
          <span class="bracket bracket--br" aria-hidden="true"></span>
        </button>
      </Slide>

      <template #addons>
        <Navigation v-if="showNav" />
      </template>
    </Carousel>
  </section>
</template>

<style scoped>
.row :deep(.carousel__slide) {
  padding: 0 6px;
  align-items: stretch;
}

.card {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: 8px;
  background: var(--panel);
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.card__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
}
.card:hover {
  transform: scale(1.04);
  z-index: 2;
}
.card:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 2px;
}
.card--selected {
  border-color: var(--hairline);
  box-shadow: 0 0 0 1px var(--hairline), 0 0 22px 2px rgba(124, 140, 255, 0.45);
}

/* Corner-Brackets in Signal statt border-4 white */
.bracket {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 2px solid var(--signal);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.bracket--tl {
  top: 6px;
  left: 6px;
  border-right: 0;
  border-bottom: 0;
}
.bracket--tr {
  top: 6px;
  right: 6px;
  border-left: 0;
  border-bottom: 0;
}
.bracket--bl {
  bottom: 6px;
  left: 6px;
  border-right: 0;
  border-top: 0;
}
.bracket--br {
  bottom: 6px;
  right: 6px;
  border-left: 0;
  border-top: 0;
}
.card:hover .bracket,
.card--selected .bracket {
  opacity: 1;
}
</style>
