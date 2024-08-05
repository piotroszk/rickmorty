<template>
  <div class="flex items-center justify-center min-h-screen bg-indigo-900 p-4">
    <div class="flex flex-col items-center p-6 bg-indigo-800 shadow-lg rounded-lg text-green-200 w-full max-w-md">
      <img :src="character?.image" :alt="character?.name" class="character-image mb-4" />
      <h2 class="text-2xl font-bold mb-2">{{ character?.name }}</h2>
      <p class="text-lg mb-1">Type: {{ character?.type || 'Unknown' }}</p>
      <p class="text-lg mb-4">Gender: {{ character?.gender }}</p>
      <button @click="goBack" class="btn">Back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Character } from '@/types/characters';
import { fetchCharacter } from '@/api/api';

const character = ref<Character | null>(null);
const route = useRoute();
const router = useRouter();

const loadCharacter = async () => {
  try {
    const id = route.params.id;
    if (typeof id === 'string') {
      character.value = await fetchCharacter(Number(id));
    } else if (Array.isArray(id) && typeof id[0] === 'string') {
      character.value = await fetchCharacter(Number(id[0]));
    }
  } catch (error) {
    console.error('Failed to fetch character:', error);
  }
};

const goBack = () => {
  router.back();
};

onMounted(loadCharacter);
</script>

<style lang="scss" scoped>
.character-image {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 0.25rem solid #38b2ac;
}
</style>
