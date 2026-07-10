# REDESIGN ORBIT — Umsetzungsprotokoll

Branch-Ziel: `redesign/orbit` · Basis: `main @ 593d668` · Stack unverändert (Vue 3 + TS + Vite 4 + Tailwind 3 + Pinia + vue3-carousel).

Alle Akzeptanzkriterien wurden **ausgeführt verifiziert** (nicht nur behauptet), siehe unten.

## AP1 — Build repariert ✅
- `tsconfig.app.json`: `references` entfernt, `composite: false`, `noEmit: true` — kein Project-Reference-Modus mehr.
- `tsconfig.json`: auf reine Type-Check-Basis reduziert (kein `outDir`/`rootDir`-Emit-Setup), `resolveJsonModule` + `lib` (DOM) ergänzt.
- **Verifiziert:** `npm run build` läuft grün (vorher: TS6305 ×2 + TS6306 — real reproduziert und danach behoben).
- Nebenbefund: hinter dem Build-Abbruch steckten latente Typfehler (untypisierter Store, fehlender Icon-Modul-Shim, implizite `any`). Alle behoben; `vue-tsc` meldet 0 Fehler.

## AP2 — Bugfixes ✅
- F3 tote Klassen (`üt-14`, `w-95%]`, `min-w[50%]`, `min-w-[1200px]`) — durch AP4-Neubau vollständig entfernt (grep sauber).
- F4: Titel ohne `replace` (`{{ movie.name }}`). `replace` lebt jetzt **ausschließlich** in `posterUrl()` (`src/lib/movie.ts`) — fasst das vormalige 4-fach-Inline-Duplikat zusammen.
- F5: Button-Kontrast gefixt (Play = solid Signal auf dunkel, Info = Panel + Hairline).

## AP3 — Rebranding ✅
- Name ORBIT (`index.html` title + Intro + Sidebar-Brand). `netflixIntro.vue` → `OrbitIntro.vue` (Wortmarke + Orbit-Ringe + Sternenfeld, `prefers-reduced-motion` respektiert).
- Intro-Audio ersatzlos gestrichen (A3), inkl. `public/audio/` und `public/images/netflix-logo.png`.
- Farb-Mapping: alle `red-*` → `--signal`; Grautöne → Token-Palette. Einziger verbleibender String „netflix-clone" ist der GitHub-Pages-**base-Pfad** (F7/AP5, bleibt), kein sichtbares Branding.

## AP4 — Layout-Neubau ✅
- App-Shell im normalen Dokumentfluss (kein `fixed`-Stapel mehr). Icon-Sidebar (Desktop) ↔ Bottom-Bar (≤ 860 px).
- Hero-Billboard: Poster-BG + Void-Gradient, `clamp()`-Höhe statt `h-[800px]`.
- Rows: ein vereinheitlichter Carousel (der `movieLength===3`-Zweig entfällt), responsive via `breakpoints`. `itemsToShow` wird bewusst NICHT auf die Filmanzahl geklemmt (sonst Riesenkarten bei kurzen Rows); ohne `wrap-around` stehen wenige Filme links-bündig in normaler Größe, Navigation nur bei echtem Overflow (> 3 Filme). Karten `aspect-ratio 2/3`, Hover-Scale + Corner-Brackets in Signal, Auswahl = Hairline-Ring + Glow.
- Hero/Rows ohne negativen Overlap-Margin (positiver Abstand), damit das erste Row-Label frei von Buttons und Karten steht.
- **Verifiziert (Playwright, Chromium):** 375 / 768 / 1440 / 2560 px → horizontaler Overflow = 0, keine überlappenden Layer (der „Overlap" hero/rows ist der gewollte negative margin), Nav schaltet korrekt sidebar↔bottom-bar.

## AP5 — Deploy ✅
- `base: '/netflix-clone/'` unverändert (F7). Poster-Pfade laufen über `import.meta.env.BASE_URL` → im Build korrekt als `/netflix-clone/...`.
- **Verifiziert:** gebautes `dist/index.html` referenziert `/netflix-clone/assets/...`.

## Nicht getestet / offene Punkte
- **Echter `npm run deploy`** (gh-pages push) — konnte nicht ausgeführt werden (kein Zugriff auf dein Remote). `gh-pages -d dist` unverändert; bitte lokal einmal durchlaufen lassen.
- **Intro-Animation** nur als Standbild (t≈1,9 s) geprüft, nicht der volle 4-s-Ablauf.
- **A2 (Poster farblich zum Schema):** die vorhandenen PNGs sind bunt/hell; der Void-Gradient fängt das im Hero ab, in den Cards stehen sie satt — sah in den Screenshots stimmig aus, aber das ist Geschmack, kein harter Test.
- `src/router.ts` ist weiterhin ein leerer Dummy (bewusst nicht angefasst — kein Feature-Scope).
- ModalDialog: Episoden-Texte bleiben Platzhalter (nur entschärft/umformuliert), da Content nicht im Scope.
- Bonus: vorbestehender Lint-Fehler in `postcss.config.js` (`no-undef`) mitgefixt (`eslint-env node`).

## Nachtrag — Interaktionsmodell (Review-Feedback)
- **Klick auf eine Karte öffnet direkt das Detail-Modal** (statt nur den Hero oben zu wechseln). Behebt die Regression „man muss zum Hero hochscrollen".
- Modal wird zentral in `App.vue` gerendert und über `store.modalMovie` gesteuert (Karten-Klick **und** Hero-„Weitere Infos" setzen es) → öffnet aus jeder Scroll-Position im Viewport.
- Hero bleibt das feste „Featured"-Billboard (erster Titel). Body-Scroll wird gelockt, solange das Modal offen ist. Schließen per X / Backdrop / Esc.
