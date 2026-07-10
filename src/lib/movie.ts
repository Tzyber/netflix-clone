export interface Movie {
  name: string
  description: string
  year: string
  genre: Record<string, string>
}

/**
 * Baut den öffentlichen Poster-Pfad aus einem Filmnamen.
 * Ersetzt Leerzeichen durch Bindestriche (Dateinamen-Konvention der Bilder).
 * Nutzt Vites BASE_URL, damit der GitHub-Pages-Unterpfad (/netflix-clone/)
 * automatisch stimmt – kein hartkodierter Pfad mehr an vier Stellen.
 */
export function posterUrl(name: string): string {
  return `${import.meta.env.BASE_URL}images/${name.replace(/ /g, '-')}.png`
}

/** Nicht-leere Genres als Array (die JSON hat teils leere "three"-Felder). */
export function genreList(movie: Movie): string[] {
  return Object.values(movie.genre).filter((g) => g.trim().length > 0)
}
