<template>

  <teleport to="body">
    <!--      Dialog    -->
    <div
        ref="modalBackdrop"
        class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
    >
      <div
          class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
        <div
            class="bg-black rounded-lg text-left overflow-hidden shadow-xl p-8 w-[35%]"
            role="dialog"
            ref="modal"
            aria-modal="true"
            aria-labelledby="modal-headline"
        >
          <div class="flex justify-end">
            <button
                type="button"
                @click="closeModal"
                class=" top-4  text-gray-500 hover:text-gray-700"
            >

              <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <!--      Image and play Button    -->
          <div class="text-2xl pt-6 mt-5 w-[100%] grid justify-center">
            <img
                alt=""
                v-if="movie"
                :src="`/images/${movie.name}.png`"
                class="relative z-0 h-[500px] right-0 top-0 opacity-90"
            />
            <button
                style="bottom: 100px;"
                class=" z-[500] relative w-[25%] ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              <svg fill="#000000" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17.804 17.804" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g><path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"></path></g><g id="Capa_1_78_"></g></g>
        </svg>
              <span class="ml-3">Abspielen</span>

            </button>
          </div>
          <!--      Image and play Button    -->
<!--      Movie Details    -->
          <div  class="z-40 text-white text-3xl w-[100%] ">
            <h4>{{ movie.name }}</h4>
            <div class="flex items-center text-lg pt-4">
              <span>{{ movie.year }}</span>
              <div v-for="genre in movie.genre" :key="genre" class="relative">
                <span class="text-white absolute left-[2px] -top-[12px] text-[40px]">.</span>
                <span class="pl-4">{{ genre }}</span>
              </div>
            </div>
            <div class="text-base pt-6 flex-wrap">
              <span>{{ movie.description }}</span>
            </div>
          </div>
          <!--      Movie Details    -->
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {defineProps, ref, getCurrentInstance} from "vue";


defineProps({
  movie: {
    name: "",
    year: "",
    description: "",
    genre: "",
    required: true,
  },
});
const emits = defineEmits(["closeDialog"])
const closeModal = () => {
  emits("closeDialog");
};

</script>

<style scoped>
/* Add your custom styles here */
</style>
