import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonDetails } from '../../../controllers/pokemonController';

const PokemonDetailsPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadPokemonDetails = async () => {
      const data = await fetchPokemonDetails(id);
      setPokemon(data);
    };

    loadPokemonDetails();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{pokemon.name}</h1>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default PokemonDetailsPage;