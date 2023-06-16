<script setup lang="ts">
import Plus from "vue-material-design-icons/Plus.vue";

defineProps({movie: Object})
</script>

<template>
<div v-if="movie" class="z-40 text-white text-6xl w-[40%]  pt-20">
  <h4>{{movie.name}}</h4>
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
  <div class="text-2xl pt-6 flex-wrap">
    <span>{{ movie.description }}</span>
  </div>
  <div class="text-2xl pt-6 mt-5">
    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
      <svg fill="#000000" height="20px" width="20px"   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17.804 17.804" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c98_play"> <path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313 c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04 c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"></path> </g> <g id="Capa_1_78_"> </g> </g> </g></svg>
      <span class="ml-3">Abspielen</span>
    </button>
    <button class=" bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-3">
      <svg viewBox="0 0 24 24" height="20px" width="20px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 18.5C12.5523 18.5 13 18.0523 13 17.5L13 10.5C13 9.94772 12.5523 9.5 12 9.5C11.4477 9.5 11 9.94772 11 10.5L11 17.5C11 18.0523 11.4477 18.5 12 18.5Z" fill="#fff"></path> <path d="M12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="#fff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="#fff"></path> </g></svg>
       <span  class="ml-3 ">Weitere Infos</span>
    </button>
  </div>
</div>

</template>

<style scoped>

</style>