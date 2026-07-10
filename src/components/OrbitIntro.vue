<script setup lang="ts">
// Reiner Präsentations-Screen: keine Logik, kein Audio (A3 – ersatzlos gestrichen).
// Sichtbarkeit/Timing steuert die App (v-if + Timeout).
</script>

<template>
  <div class="intro" role="presentation">
    <div class="starfield" aria-hidden="true"></div>

    <div class="stage">
      <!-- Orbit-Ring, angelehnt an die Porthole-Ringe des Portfolios -->
      <div class="orbit" aria-hidden="true">
        <span class="orbit__body"></span>
      </div>
      <h1 class="wordmark">ORBIT</h1>
      <p class="tagline">STREAMING&nbsp;·&nbsp;DEEP&nbsp;SPACE</p>
    </div>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background:
    radial-gradient(120% 90% at 50% 30%, rgba(124, 140, 255, 0.1), transparent 60%),
    var(--void);
  overflow: hidden;
  animation: introOut 0.6s ease 3.4s forwards;
}

/* Dezentes Sternenfeld – vereinfachte Variante des Portfolio-Starfields */
.starfield {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, rgba(234, 236, 246, 0.9), transparent),
    radial-gradient(1px 1px at 75% 20%, rgba(234, 236, 246, 0.7), transparent),
    radial-gradient(1px 1px at 40% 70%, rgba(168, 174, 199, 0.8), transparent),
    radial-gradient(1.5px 1.5px at 85% 65%, rgba(234, 236, 246, 0.8), transparent),
    radial-gradient(1px 1px at 60% 45%, rgba(124, 140, 255, 0.9), transparent),
    radial-gradient(1px 1px at 10% 80%, rgba(234, 236, 246, 0.6), transparent),
    radial-gradient(1.5px 1.5px at 30% 15%, rgba(79, 214, 196, 0.7), transparent);
  opacity: 0;
  animation: fadeIn 0.8s ease 0.1s forwards, twinkle 3s ease-in-out 1s infinite;
}

.stage {
  position: relative;
  display: grid;
  place-items: center;
  text-align: center;
}

.orbit {
  position: absolute;
  width: clamp(160px, 34vmin, 320px);
  aspect-ratio: 1;
  border: 1px solid var(--hairline);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.7);
  animation: ringIn 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards;
}
.orbit::before {
  /* zweiter, leicht geneigter Ring */
  content: "";
  position: absolute;
  inset: 14%;
  border: 1px solid rgba(124, 140, 255, 0.18);
  border-radius: 50%;
}
.orbit__body {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(160px, 34vmin, 320px);
  height: clamp(160px, 34vmin, 320px);
  transform: translate(-50%, -50%);
  animation: spin 6s linear 0.6s infinite;
}
.orbit__body::after {
  /* der umlaufende Signal-Punkt */
  content: "";
  position: absolute;
  top: -4px;
  left: 50%;
  width: 8px;
  height: 8px;
  margin-left: -4px;
  border-radius: 50%;
  background: var(--signal);
  box-shadow: 0 0 12px 2px rgba(124, 140, 255, 0.7);
}

.wordmark {
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 12vmin, 7rem);
  letter-spacing: 0.16em;
  color: var(--ink);
  margin: 0;
  padding-left: 0.16em; /* optischen Ausgleich fürs letter-spacing */
  opacity: 0;
  transform: scale(1.15);
  filter: blur(6px);
  animation: wordmarkIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.8s forwards;
}

.tagline {
  font-family: "Space Mono", ui-monospace, monospace;
  font-size: clamp(0.6rem, 1.6vmin, 0.8rem);
  letter-spacing: 0.4em;
  color: var(--ink-dim);
  margin: 0.9rem 0 0;
  opacity: 0;
  animation: fadeIn 0.9s ease 1.6s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}
@keyframes ringIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes wordmarkIn {
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}
@keyframes introOut {
  to {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro,
  .starfield,
  .orbit,
  .orbit__body,
  .wordmark,
  .tagline {
    animation: none;
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
