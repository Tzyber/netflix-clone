<script setup lang="ts">
defineProps({movie: Object})
</script>

<template>
<div v-if="movie" class="z-40 text-white w-[53%] pt-20">
  <span>{{movie.name}}</span>
  <div class="flex items-center text-lg pt-4">
    <span>{{movie.year}}</span>
    <div class="relative">
    <span class="absolute left-[2px] -top-[12px] text-[40px]">.</span>
      <span class="pl-4">{{ movie.genre.one}}</span>
    </div>
    <div class="relative">
      <span class="absolute left-[2px] -top-[12px] text-[40px]">.</span>
      <span class="pl-4">{{ movie.genre.two}}</span>
    </div>
    <div class="relative">
      <span class="absolute left-[2px] -top-[12px] text-[40px]">.</span>
      <span class="pl-4">{{ movie.genre.three}}</span>
    </div>
  </div>
  <div class="text-2xl pt-6">
    <span>{{ movie.description }}</span>
  </div>
</div>

</template>

<style scoped>

</style>