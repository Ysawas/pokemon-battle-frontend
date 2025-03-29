import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const POKE_API_URL = import.meta.env.VITE_POKE_API_URL;

/**
 * Handles API errors and logs them for debugging.
 * @param {Error} error - The error object from the API call.
 * @returns {Object} - A standardized error response.
 */
const handleApiError = (error) => {
  console.error('API Error:', error.message);
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    console.error('Response Data:', error.response.data);
    console.error('Response Status:', error.response.status);
    return { error: error.response.data || 'An error occurred on the server.' };
  } else if (error.request) {
    // Request was made but no response received
    console.error('No Response:', error.request);
    return { error: 'No response from the server. Please try again later.' };
  } else {
    // Something else happened
    return { error: 'An unexpected error occurred. Please try again.' };
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leaderboard`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createScore = async (username, score) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, { username, score });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateScore = async (id, score) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, { score });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteScore = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchPokemonList = async (limit = 20) => {
  try {
    const response = await axios.get(`${POKE_API_URL}/pokemon?limit=${limit}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    return [];
  }
};

export const fetchPokemonDetails = async (id) => {
  try {
    const response = await axios.get(`${POKE_API_URL}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return null;
  }
};