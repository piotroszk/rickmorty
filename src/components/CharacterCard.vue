<template>
  <div @click="goToDetail" class="flex flex-col items-center p-4 bg-indigo-900 shadow-lg rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-200">
    <img :src="character.image" :alt="character.name" class="w-32 h-32 rounded-full border-4 border-green-300" />
    <h2 class="mt-4 text-xl font-bold text-green-200">{{ character.name }}</h2>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { Character } from '@/types/characters'

const props = defineProps<{ character: Character }>();
const router = useRouter();

const goToDetail = () => {
  router.push(`/character/${props.character.id}`);
};
</script>
