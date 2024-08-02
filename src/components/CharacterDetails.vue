<template>
  <div class="flex items-center justify-center min-h-screen bg-indigo-900 p-4">
    <div class="flex flex-col items-center p-6 bg-indigo-800 shadow-lg rounded-lg text-green-200 w-full max-w-md">
      <img :src="character?.image" :alt="character?.name" class="w-32 h-32 rounded-full border-4 border-green-300 mb-4" />
      <h2 class="text-2xl font-bold mb-2">{{ character?.name }}</h2>
      <p class="text-lg mb-1">Type: {{ character?.type || 'Unknown' }}</p>
      <p class="text-lg mb-4">Gender: {{ character?.gender }}</p>
      <button @click="goBack" class="text-black p-2 rounded bg-green-400 disabled:bg-gray-500 disabled:text-gray-700 hover:bg-green-100">Back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const character = ref<any>(null);
const route = useRoute();
const router = useRouter();

const fetchCharacter = async () => {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${route.params.id}`);
    character.value = response.data;
  } catch (error) {
    console.error('Failed to fetch character:', error);
  }
};

const goBack = () => {
  router.back();
};

onMounted(fetchCharacter);
</script>
