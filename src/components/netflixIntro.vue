<template>
  <div class="logo">
    WatchFlix
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

onMounted(() => {
  setTimeout(() => {
    playAudio();
  }, 500);
});

const audioPlayer = ref<HTMLAudioElement | null>(null);

function playAudio() {
  if (audioPlayer.value) {
    (audioPlayer.value as HTMLAudioElement).play();
  }
}
</script>


<style  lang="scss">
@function makelongshadow($length, $angle) {
  $shadows: ();

  @for $i from 1 through $length {
    $currentShadow: $i * 1px $i * $angle * 1px #aaa;
    $shadows: append($shadows, $currentShadow, comma);
  }

  @return $shadows;
}

@import url('https://fonts.googleapis.com/css?family=Roboto:700,900');

.logo {
  margin-top: 20%;
  text-align: center;
  font-family: 'Roboto',serif;
  font-size: 12vmin;
  font-weight: 700;
  animation: netflix_style 4s ;
  outline: none;
  white-space: nowrap;
}

@keyframes netflix_style {
  0% {
    text-shadow: makelongshadow(100,1);
    color:#e90418;
    transform: scale(1.5, 1.5);
  }
  10% {
    text-shadow: makelongshadow(100,1.5);
    color:#e90418;
    transform: scale(1.5, 1.5);
  }

  20% {
    color:#e90418;
    text-shadow: none;
    transform: scale(1.1, 1.1);
  }
  100% {
    opacity: 0;
  }
}
</style>