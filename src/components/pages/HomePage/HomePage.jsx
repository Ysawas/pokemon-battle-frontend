
import React, { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from '../../../controllers/pokemonController';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 30;

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchPokemonList(pokemonPerPage, (currentPage - 1) * pokemonPerPage);
      if (data) {
        setPokemonList(data.results);
        setTotalPokemonCount(data.count);
      }
    };

    loadPokemon();
  }, [currentPage]);

  // Fetch types for each Pokémon
  useEffect(() => {
    const fetchTypes = async () => {
      const updatedPokemonList = [];
      for (const pokemon of pokemonList) {
        const details = await fetchPokemonDetails(pokemon.name);
        if (details) {
          updatedPokemonList.push({ ...pokemon, types: details.types });
        }
      }
      setPokemonList(updatedPokemonList);
    };

    if (pokemonList.length > 0) {
      fetchTypes();
    }
  }, [pokemonList]);

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const displayedPokemon = pokemonList;

  return (
    <div className="home-container">
      <div className="header-section">
        <h1 className="main-title">Original 150 Pokémon</h1>
        <div className="info-box">
          <span className="total-pokemon">Total Pokémon: {totalPokemonCount}</span>
          <span className="showing-pokemon">Showing: {displayedPokemon.length}</span>
        </div>
      </div>

      <div className="pokemon-grid">
        {displayedPokemon.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.name}`}
            key={pokemon.name}
            className="pokemon-card"
          >
            <div className="pokemon-image-container">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                alt={pokemon.name}
                className="pokemon-image"
              />
            </div>
            <h2 className="pokemon-name capitalize">{pokemon.name}</h2>
            <div className="pokemon-types">
              {pokemon.types &&
                pokemon.types.map((type) => (
                  <span key={type.type.name} className={`pokemon-type ${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
            </div>
            <div className="pokemon-actions">
              <button className="add-to-team-btn">+</button>
              <button className="view-details-btn">View Details &gt;</button>
            </div>
          </Link>
        ))}
      </div>

      {displayedPokemon.length < totalPokemonCount && (
        <button onClick={goToNextPage} className="next-page-btn">
          More Pokémon
        </button>
      )}
    </div>
  );
};

export default HomePage;

/*
import React, { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from '../../../controllers/pokemonController';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const pokemonPerPage = 30;

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchPokemonList(pokemonPerPage, (currentPage - 1) * pokemonPerPage);
      if (data) {
        setPokemonList(data.results);
        setTotalPokemonCount(data.count);
      }
    };

    loadPokemon();
  }, [currentPage]);

  useEffect(() => {
    const fetchTypes = async () => {
      const updatedPokemonList = [];
      for (const pokemon of pokemonList) {
        const details = await fetchPokemonDetails(pokemon.name);
        if (details) {
          updatedPokemonList.push({ ...pokemon, types: details.types });
        }
      }
      setPokemonList(updatedPokemonList);
    };

    if (pokemonList.length > 0) {
      fetchTypes();
    }
  }, [pokemonList]);

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="home-container">
      <div className="header-section">
        <h1 className="main-title">Original 150 Pokémon</h1>
        <div className="info-box">
          <span className="total-pokemon">Total Pokémon: {totalPokemonCount || 'Loading...'}</span>
          <span className="showing-pokemon">Showing: {filteredPokemon.length}</span>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Pokémon..."
        className="search-bar"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {loading && <div className="loading-indicator">Loading Pokémon...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="pokemon-grid">
          {filteredPokemon.map((pokemon, index) => (
            <Link
              to={`/pokemon/${pokemon.name}`}
              key={pokemon.name}
              className={`pokemon-card ${index % 2 === 0 ? 'even-card' : 'odd-card'}`} // Alternating styles
            >
              <div className="pokemon-image-container">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                  alt={pokemon.name}
                  className="pokemon-image"
                />
              </div>
              <h2 className="pokemon-name capitalize">{pokemon.name}</h2>
              <div className="pokemon-types">
                {pokemon.types &&
                  pokemon.types.map((type) => (
                    <span key={type.type.name} className={`pokemon-type ${type.type.name}`}>
                      {type.type.name}
                    </span>
                  ))}
              </div>
              <div className="pokemon-actions">
                <button className="add-to-team-btn">+</button>
                <button className="view-details-btn">View Details &gt;</button>
              </div>
            </Link>
          ))}
        </div>
      )}

      {displayedPokemon.length < totalPokemonCount && (
        <button onClick={goToNextPage} className="next-page-btn" disabled={loading}>
          More Pokémon
        </button>
      )}
    </div>
  );
};

export default HomePage;
*/