<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import type { PropType } from "vue";
import type { Movie } from "../lib/movie";
import { posterUrl } from "../lib/movie";

defineProps({
  movie: {
    type: Object as PropType<Movie>,
    required: true,
  },
});

const emit = defineEmits(["closeDialog"]);
const close = () => emit("closeDialog");

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}
onMounted(() => {
  document.addEventListener("keydown", onKey);
  document.body.style.overflow = "hidden";
});
onUnmounted(() => {
  document.removeEventListener("keydown", onKey);
  document.body.style.overflow = "";
});
</script>

<template>
  <teleport to="body">
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-void/70 backdrop-blur-sm"
      @click.self="close"
    >
      <div class="flex min-h-screen items-start justify-center p-4 sm:pt-16">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          class="w-full max-w-[680px] overflow-hidden rounded-xl border border-hairline bg-panel shadow-2xl"
          @click.stop
        >
          <!-- Poster-Kopf mit Gradient + Titel -->
          <div class="relative">
            <img :src="posterUrl(movie.name)" :alt="movie.name" class="h-64 w-full object-cover sm:h-80" />
            <div class="absolute inset-0 bg-gradient-to-t from-panel via-panel/30 to-transparent"></div>

            <button
              type="button"
              @click="close"
              aria-label="Schließen"
              class="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-hairline bg-void/60 text-ink-dim transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="absolute bottom-4 left-5 right-5">
              <h2 id="modal-title" class="font-display text-3xl font-bold text-ink sm:text-4xl">
                {{ movie.name }}
              </h2>
              <div class="mt-3 flex flex-wrap gap-3">
                <button class="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-2 font-medium text-void transition hover:bg-signal/85">
                  <svg width="14" height="14" viewBox="0 0 17.8 17.8" fill="currentColor" aria-hidden="true">
                    <path d="M2.067.043C2.21-.028 2.372-.008 2.493.085l13.312 8.503c.094.078.154.191.154.313 0 .12-.061.237-.154.314L2.492 17.717c-.07.057-.162.087-.25.087l-.176-.04c-.136-.065-.222-.207-.222-.361V.402C1.844.25 1.93.107 2.067.043z" />
                  </svg>
                  Abspielen
                </button>
                <button
                  aria-label="Zur Liste hinzufügen"
                  class="grid h-10 w-10 place-items-center rounded-md border border-hairline bg-void/40 text-ink transition hover:border-signal/60"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Meta + Beschreibung -->
          <div class="px-5 py-5">
            <div class="flex flex-wrap items-center gap-3 font-mono text-xs tracking-wider text-ink-dim">
              <span class="font-bold text-aurora-teal">95% ÜBEREINSTIMMUNG</span>
              <span>{{ movie.year }}</span>
              <span>4 STAFFELN</span>
              <span class="rounded border border-hairline px-1.5 py-0.5">HD</span>
            </div>

            <p class="mt-4 max-w-prose text-sm leading-relaxed text-ink">
              {{ movie.description }}
            </p>

            <div class="mt-5 flex items-center justify-between">
              <span class="font-display text-lg font-semibold text-ink">Folgen</span>
              <label class="sr-only" for="season">Staffel auswählen</label>
              <select
                id="season"
                class="rounded-md border border-hairline bg-void px-3 py-1.5 text-sm text-ink focus:border-signal focus:outline-none"
              >
                <option>Staffel 1</option>
                <option>Staffel 2</option>
                <option>Staffel 3</option>
                <option>Staffel 4</option>
              </select>
            </div>

            <!-- Episoden -->
            <ul class="mt-4 divide-y divide-hairline border-t border-hairline">
              <li class="flex gap-4 py-4">
                <img :src="posterUrl(movie.name)" :alt="movie.name" class="h-16 w-28 flex-none rounded object-cover" />
                <div>
                  <p class="font-medium text-ink">1. Doppeltes Spiel: Teil 1</p>
                  <p class="mt-1 text-xs leading-relaxed text-ink-dim">
                    Nach seiner Beförderung zum Senior Partner einer renommierten Kanzlei soll
                    die Hauptfigur einen Absolventen einstellen – und trifft eine unerwartete Wahl.
                  </p>
                </div>
              </li>
              <li class="flex gap-4 py-4">
                <img :src="posterUrl(movie.name)" :alt="movie.name" class="h-16 w-28 flex-none rounded object-cover" />
                <div>
                  <p class="font-medium text-ink">2. Doppeltes Spiel: Teil 2</p>
                  <p class="mt-1 text-xs leading-relaxed text-ink-dim">
                    Statt eines Absolventen fällt die Wahl auf einen Quereinsteiger mit
                    fotografischem Gedächtnis – ein juristisches Naturtalent.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
