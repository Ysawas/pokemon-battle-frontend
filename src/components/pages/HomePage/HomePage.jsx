import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { fetchPokemonList, fetchPokemonDetails } from '../../../controllers/pokemonController';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { RosterContext } from '../../../context/RosterContext'; // Import RosterContext

const HomePage = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [totalPokemonCount, setTotalPokemonCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 30;
    const { addToRoster } = useContext(RosterContext); // Get addToRoster from context

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

    const handleAddToRoster = (pokemon) => {
        // Dispatch action to add pokemon to roster
        addToRoster(pokemon);
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
                {displayedPokemon.map((pokemon) => {
                  const pokemonId = pokemon.url.split('/')[6]; // Extract Pokemon ID from URL
                  return (
                    <div key={pokemon.name} className="pokemon-card">
                      <Link to={`/pokemon/${pokemon.name}`}>
                        <div className="pokemon-image-container">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
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
                      </Link>
                      <div className="pokemon-actions">
                        <button className="add-to-team-btn" onClick={() => handleAddToRoster({ 
                          id: pokemonId, 
                          name: pokemon.name, 
                          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png` 
                        })}>
                          +
                        </button>
                        <Link to={`/pokemon/${pokemon.name}`} className="view-details-btn">
                          View Details &gt;
                        </Link>
                      </div>
                    </div>
                  );
                })}
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