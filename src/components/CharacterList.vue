<template>
  <div class="bg-space-black text-green-200 min-h-screen p-4 sm:p-8">
    <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
      <input 
        type="text" 
        v-model="name" 
        placeholder="Search by name" 
        class="border border-green-400 bg-indigo-800 text-green-200 placeholder-green-200 p-2 rounded text-sm sm:text-base w-full sm:w-auto"
      />
      <select 
        v-model="status" 
        @change="fetchCharacters" 
        class="border border-green-400 bg-indigo-800 text-green-200 p-2 rounded text-sm sm:text-base w-full sm:w-auto"
      >
        <option value="" class="bg-indigo-700">All Statuses</option>
        <option value="alive" class="bg-indigo-700">Alive</option>
        <option value="dead" class="bg-indigo-700">Dead</option>
        <option value="unknown" class="bg-indigo-700">Unknown</option>
      </select>
      <button 
        @click="resetFilters" 
        class="text-black p-2 rounded bg-green-400 hover:bg-green-100 text-sm sm:text-base w-full sm:w-auto"
      >
        Reset
      </button>
    </div>
    <div v-if="error" class="text-red-500 mb-4 text-sm sm:text-base">
      <p>Error: {{ error }}</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>
    <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
      <button 
        @click="prevPage" 
        :disabled="page === 1" 
        class="text-black p-2 rounded bg-green-400 disabled:bg-gray-500 disabled:text-gray-700 hover:bg-green-100 text-sm sm:text-base w-full sm:w-auto"
      >
        Previous
      </button>
      <span class="text-green-200 text-sm sm:text-base">{{ page }}</span>
      <button 
        @click="nextPage" 
        :disabled="page === maxPage" 
        class="text-black p-2 rounded bg-green-400 disabled:bg-gray-500 disabled:text-gray-700 hover:bg-green-100 text-sm sm:text-base w-full sm:w-auto"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import CharacterCard from './CharacterCard.vue';

const characters = ref<any[]>([]);
const name = ref('');
const status = ref('');
const page = ref(1);
const maxPage = ref(1);
const error = ref<string | null>(null);

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const fetchCharacters = async () => {
  error.value = null;
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character`, {
      params: {
        name: name.value,
        status: status.value,
        page: page.value
      }
    });
    characters.value = response.data.results;
    maxPage.value = response.data.info.pages;
  } catch (err) {
    console.error('Failed to fetch characters:', err);
    error.value = 'Failed to load characters. Please try again later.';
  }
};

const debouncedFetchCharacters = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchCharacters();
  }, 1000);
};

const resetFilters = () => {
  name.value = '';
  status.value = '';
  page.value = 1;
  fetchCharacters();
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchCharacters();
  }
};

const nextPage = () => {
  if (page.value < maxPage.value) {
    page.value++;
    fetchCharacters();
  }
};

watch([name, status], debouncedFetchCharacters);

onMounted(fetchCharacters);
</script>