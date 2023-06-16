<script setup lang="ts">

</script>

<template>
<div class="logo">
 Docunite
</div>
</template>

<style scoped lang="scss">
@function makelongshadow($length,$angle) {
  $val: 0px 0px transparent;
  @for $i from 1 through $length {
    $val: #{$val}, #{$i}px #{$i*$angle}px #aaa;
  }
  @return $val;
}

@import url('https://fonts.googleapis.com/css?family=Roboto:700,900');

.logo {
  text-align: center;
  font-family: 'Roboto';
  font-size: 12vmin;
  font-weight: 700;
  animation: netflix_style 3.5s ;
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
  15% {
    color:#e90418;
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