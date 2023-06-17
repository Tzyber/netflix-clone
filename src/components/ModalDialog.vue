<template>

  <teleport to="body">
    <!--      Dialog    -->
    <div
        ref="modalBackdrop"
        class="overflow-y-auto fixed z-10 inset-0  bg-black bg-opacity-50"
    >
      <div
          class="overflow-y-auto flex items-start justify-center min-h-screen pt-24 text-center"
      >
        <div
            class="m-2 bg-black rounded-lg text-left overflow-hidden shadow-xl p-2 w-[35%]"
            role="dialog"
            ref="modal"
            aria-modal="true"
            aria-labelledby="modal-headline"
            style="    height: 1000px;
            overflow-y: auto;"
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
          <div class="text-2xl w-[100%]  grid justify-center -mb-10">
            <img
                alt=""
                v-if="movie"
                :src="`/images/${movie.name}.png`"
                class="relative z-0 h-[500px] right-0 top-0   "
            />
            <div class="flex flex-row ">
              <button
                  style="bottom: 100px;"
                  class=" z-[500] relative w-[25%] ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg fill="#000000" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17.804 17.804" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"><g><path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"></path></g>
                    <g id="Capa_1_78_"></g></g>
        </svg>
                <span class="ml-3">Abspielen</span>

              </button>
              <i style="bottom: 100px;" class="material-icons add_circle_outline z-[500] relative w-[25%] ml-4   text-gray-300 font-bold rounded inline-flex items-center cursor-pointer"></i>
            </div>

          </div>
          <!--      Image and play Button    -->
          <!--      Movie Details    -->
          <div class="z-40 text-white text-lg w-[100%] ">
            <div class="flex items-center text-lg pt-1">
              <span class="text-green-600 mr-3 font-bold">95% Übereinstimmung </span>
              <span class="mr-3 text-gray-300">{{ movie.year }}</span>
              <span class="text-gray-300">4 Staffeln</span>
              <span style="padding: 0.1em;
    font-size: smaller;" class="ml-2 border-2">HD</span>
            </div>
            <div class="text-base pt-6 flex-wrap w-[60%]">
              <span>{{ movie.description }}</span>
            </div>
            <!--            Staffel auswahl-->
            <div class="flex justify-end">
              <select id="countries"
                      class="w-[20%] text-lg mt-5 bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Staffel auswählen</option>
                <option value="staffel 1">Staffel 1</option>
                <option value="staffel 2">Staffel 2</option>
                <option value="staffel 3">Staffel 3</option>
                <option value="staffel 4">Staffel 4</option>
              </select>
            </div>
            <!--            Staffel auswahl-->
          </div>
          <div class="z-40 text-2xl text-white mt-5">
            <span>Folgen</span>
          </div>
          <div class="z-40 text-white mt-2">
            <span >Staffel 1: <span style="padding: 0.3em;
    font-size: smaller;" class="ml-2 border-2">18</span></span>
          </div>
          <hr
              class=" mt-3 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"/>
          <div class=" flex mt-5 flex-row">
            <img class="h-auto max-w-xs" :src="`/images/${movie.name}.png`" alt="image description">
            <span class="grid text-white text-lg ml-2 pt-10 mb-6">Doppeltes Spiel: Teil 1
               <span class="text-white text-xs ml-0.5 -mt-12">Nach seiner Beförderung zum Senior Partner einer renommierten New Yorker Kanzlei soll Harvey Specter einen Harvard-Absolventen für die Kanzlei einstellen.</span>
            </span>

          </div>
          <hr
              class=" mt-3 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"/>
          <div class=" flex mt-5 flex-row mb-3">
            <img class="h-auto max-w-xs" :src="`/images/${movie.name}.png`" alt="image description">
            <span class="grid text-white text-lg pt-10 ml-2 mb-6">Doppeltes Spiel: Teil 2
               <span class="text-white text-xs  -mt-12 ml-0.5">Statt eines Harvard-Absolventen stellt Harvey den Uni-Abbrecher Mike Ross ein. Der Fahrradbote hat ein fotografisches Gedächtnis und ist ein juristisches Naturtalent.</span>
            </span>

          </div>
          <!--      Movie Details    -->
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {defineProps, ref, getCurrentInstance} from "vue";
import Plus from "vue-material-design-icons/Plus.vue";


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
