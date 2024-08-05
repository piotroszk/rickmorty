import axios from 'axios';
import { Character, CharactersResponse } from '@/types/characters';

export const fetchCharacter = async (id: number) => {
  try {
    const response = await axios.get<Character>(`https://rickandmortyapi.com/api/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch character:', error);
    throw error;
  }
};

export const fetchCharacters = async (name: string, status: string, page: number) => {
  try {
    const response = await axios.get<CharactersResponse>(`https://rickandmortyapi.com/api/character`, {
      params: {
        name,
        status,
        page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch characters:', error);
    throw error;
  }
};
