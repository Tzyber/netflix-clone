import { defineStore } from 'pinia'
import type { Movie } from '../lib/movie'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    // Hero-„Featured"-Titel (Billboard oben)
    movie: null as Movie | null,
    // Film, dessen Detail-Modal offen ist (null = zu). Wird von Karten-Klick
    // und vom Hero-„Weitere Infos" gesetzt – zentral, damit das Modal aus
    // jeder Scroll-Position heraus aufgeht.
    modalMovie: null as Movie | null,
    showFullVideo: false,
  }),
})
