import React, { useState, useEffect } from 'react';
import { fetchPokemonList } from '../../../controllers/pokemonController';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const loadPokemonList = async () => {
      const data = await fetchPokemonList();
      setPokemonList(data);
    };

    loadPokemonList();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokémon List</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name} className="border p-4 rounded-md">
            <Link to={`/pokemon/${pokemon.name}`}>
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;