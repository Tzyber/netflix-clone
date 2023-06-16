<script setup lang="ts">
import {ref, toRefs} from 'vue'
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide, Navigation} from 'vue3-carousel'

import {useMovieStore} from '../stores/movie'
import {storeToRefs} from 'pinia';

const useMovie = useMovieStore()
const {movie, showFullVideo} = storeToRefs(useMovie)
let currentSlide = ref(0)
const props = defineProps({category: String, movies: Array})
const {movies, category} = toRefs(props)
const movieLength = movies?.value?.length;

const currentSlideObject = (slide, index) => {
  if (index === currentSlide.value)
    movie.value = slide
}

const fullScreenVideo = (index) => {
  currentSlide.value = index

}
</script>

<template>
  <div class="min-w-[1200px] relative">
    <div class="flex justify-between mr-6">
      <div class="flex items-center font-semibold text-white text-2xl cursor-pointer">
        {{ category }}
      </div>
    </div>

    <Carousel
        v-if="movieLength === 3"
        ref="carousel"
        v-model="currentSlide"
        :items-to-show="3"
        :items-to-scroll="1"
        :wrap-around="true"
        snapAlign="start"
        class="bg-transparent  w-[50%] -mb-16 -ml-3"
    >
      <Slide v-for="(slide, index) in movies" :key="slide" class="flex items-center object-cover text-white bg-transparent" >
        <div
            @click="fullScreenVideo(index)"
            class="  object-fit h-[100%] hover:brightness-125 cursor-pointer ml-3"
            :class="
                        currentSlide !== index ? 'border-4 border-transparent' : 'border-4 border-white',
                        currentSlideObject(slide, index)
                    "
        >
          <img alt="" style="user-select: none; min-height: 500px !important;" class=" object-cover pointer-events-none h-[100%] z-[-1]" :src="'/images/'+slide.name+'.png'">
        </div>
      </Slide>
    </Carousel>

    <Carousel
        v-else
        ref="carousel"
        v-model="currentSlide"
        :items-to-show="8"
        :items-to-scroll="1"
        :wrap-around="true"
        :transition="500"
        snapAlign="start"
        class="bg-transparent"
    >
      <Slide v-for="(slide, index) in movies" :key="slide" class="flex items-center object-cover text-white bg-transparent" >

        <div
            @click="fullScreenVideo(index)"
            class="object-fit h-[100%] hover:brightness-125 cursor-pointer"
            :class="
                        currentSlide !== index ? 'border-4 border-transparent' : 'border-4 border-white',
                        currentSlideObject(slide, index)
                    "
        >
          <img alt="" style="user-select: none" class=" object-cover pointer-events-none h-[100%] z-[-1]" :src="'/images/'+slide.name+'.png'">
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.carousel__prev,
.carousel__next,
.carousel__prev:hover,
.carousel__next:hover {
  color: white;
}
</style>