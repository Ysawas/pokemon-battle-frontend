import axios from 'axios';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemonList = async (limit = 20) => {
  try {
    const response = await axios.get(`${POKEAPI_URL}?limit=${limit}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    return [];
  }
};

export const fetchPokemonDetails = async (id) => {
  try {
    const response = await axios.get(`${POKEAPI_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return null;
  }
};