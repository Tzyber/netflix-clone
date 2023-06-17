<script setup lang="ts">
import { onMounted, ref } from "vue";
import Magnify from 'vue-material-design-icons/Magnify.vue';
import HomeOutline from 'vue-material-design-icons/HomeOutline.vue';
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue';
import Television from 'vue-material-design-icons/Television.vue';
import MovieOutline from 'vue-material-design-icons/MovieOutline.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import movies from './movies.json'

import { useMovieStore } from './stores/movie'
import { storeToRefs } from 'pinia';
import NetflixIntro from "./components/netflixIntro.vue";
import VideoCarousel from "./components/VideoCarousel.vue";
import MovieDetails from "./components/MovieDetails.vue";
import ModalDialog from "./components/ModalDialog.vue";


const useMovie = useMovieStore()
const   { movie, showFullVideo } = storeToRefs(useMovie)
const showLogo = ref(true)
const showModal = ref(false)
const  moviesList = ref()
onMounted(() => {
  setTimeout(() => (showLogo.value = false), 4000);
  setTimeout(() => (moviesList.value = movies[0][0]), 100);
});
</script>

<template>

  <button type="button" @click="showModal = !showModal"></button>
  <netflix-intro v-if="showLogo" class="onLoading"></netflix-intro>
  <div v-if="!showLogo" class="fixed w-full h-screen bg-black">
    <div v-if="!showFullVideo" id="SideNav" class="flex z-40 items-center w-[120px] h-screen bg-black relative">
      <img alt="logo" class="absolute top-0 w-[60px] mt-10 ml-8" src="/docunitelogo.png">
      <div>
        <div class="py-2 mx-10 my-6">
          <Magnify fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
        <div class="py-2 mx-10 my-6 border-b-4 border-b-red-500">
          <HomeOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
        <div class="py-2 mx-10 my-6">
          <TrendingUp fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
        <div class="py-2 mx-10 my-6">
          <Television fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
        <div class="py-2 mx-10 my-6">
          <MovieOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
        <div class="py-2 mx-10 my-6">
          <Plus fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
      </div>
    </div>
    <div v-if="!showFullVideo">
      <div >
        <div class="fixed flex z-20 top-0 right-0 w-full h-[50%] bg-black pl-[120px] bg-clip-border">
          <div class="absolute z-30 h-[900px] left-[120px] w-95%] right-0 top-0 bg-gradient-to-r from-black via-black" />
          <MovieDetails v-if="movie" :movie="movie"/>
          <img
              alt=""
              v-if="movie"
              :src="`/images/${movie.name}.png`"
              class="absolute z-0 h-[800px] right-0 top-0 opacity-90"
          />
        </div>
      </div>
      <div class="fixed z-30 bottom-0 right-0 w-full h-[55%] pl-[120px] overflow-y-auto">
        <VideoCarousel class="pb-14 mb-10 üt-14" category="Derzeit beliebt" :movies="movies[0]"/>
        <VideoCarousel class="pb-14 üt-14" category="Horror Movies" :movies="movies[1]"/>
        <VideoCarousel class="pb-14 üt-14" category="Featured Movies" :movies="movies[2]"/>
      </div>
    </div>
    <div class="absolute z-20 h-[60%] left-[120px] w-[100%] right-0 bottom-0 bg-gradient-to-t from-black via-black" />
  </div>
</template>


<style lang="scss">
body{
  background: black !important;
}

.onLoading{
  margin-top: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
