<template>
  <div class="bg-space-black text-green-200 min-h-screen p-4 sm:p-8">
    <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
      <input 
        type="text" 
        v-model="name" 
        placeholder="Search by name" 
        class="input-field"
      />
      <select 
        v-model="status" 
        @change="loadCharacters" 
        class="input-field"
      >
        <option value="" class="bg-indigo-700">All Statuses</option>
        <option value="alive" class="bg-indigo-700">Alive</option>
        <option value="dead" class="bg-indigo-700">Dead</option>
        <option value="unknown" class="bg-indigo-700">Unknown</option>
      </select>
      <button 
        @click="resetFilters" 
        class="btn"
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
        class="btn"
      >
        Previous
      </button>
      <span class="text-green-200 text-sm sm:text-base">{{ page }}</span>
      <button 
        @click="nextPage" 
        :disabled="page === maxPage" 
        class="btn"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import CharacterCard from './CharacterCard.vue';
import { Character } from '@/types/characters';
import { fetchCharacters } from '@/api/api';

const characters = ref<Character[]>([]);
const name = ref<string>('');
const status = ref<string>('');
const page = ref<number>(1);
const maxPage = ref<number>(1);
const error = ref<string | null>(null);

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const loadCharacters = async () => {
  error.value = null;
  try {
    const response = await fetchCharacters(name.value, status.value, page.value);
    characters.value = response.results;
    maxPage.value = response.info.pages;
  } catch (err) {
    console.error('Failed to fetch characters:', err);
    error.value = 'Failed to load characters. Please try again later.';
  }
};

const debouncedFetchCharacters = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    loadCharacters();
  }, 1000);
};

const resetFilters = () => {
  name.value = '';
  status.value = '';
  page.value = 1;
  loadCharacters();
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    loadCharacters();
  }
};

const nextPage = () => {
  if (page.value < maxPage.value) {
    page.value++;
    loadCharacters();
  }
};

watch([name, status], debouncedFetchCharacters);

onMounted(loadCharacters);
</script>

<style>
@import '@/styles/main.scss';
</style>
