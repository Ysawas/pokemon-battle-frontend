import axios from 'axios';

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 30, offset = 0) => {
  try {
    const response = await axios.get(`${POKEAPI_URL}/pokemon?limit=${limit}&offset=${offset}`);
    return response.data; // Return the whole data object, including results and count
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    return null;
  }
};

export const fetchPokemonDetails = async (id) => {
  try {
    const response = await axios.get(`${POKEAPI_URL}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return null;
  }
};