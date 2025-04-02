import React, { useContext, useEffect } from 'react';
import { RosterContext } from '../../../context/RosterContext';
import './MyRosterPage.css';

const MyRosterPage = () => {
  const { roster, removeFromRoster } = useContext(RosterContext);

  useEffect(() => {
    console.log("MyRosterPage: Current Roster:", roster); // LOG THE ROSTER!
  }, [roster]);

  return (
    <div className="my-roster-container">
      <h1 className="main-title">Your Pokémon Roster</h1>

      {roster.length === 0 ? (
        <p>Your roster is empty. Add some Pokémon!</p>
      ) : (
        <div className="pokemon-grid">
          {roster.map((pokemon) => {
            console.log("MyRosterPage: Rendering Pokemon:", pokemon); // Log each pokemon
            return (
              <div key={pokemon.id} className="pokemon-card">
                {pokemon.image && (
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="pokemon-image"
                    onError={() => console.error("Image load error:", pokemon.image)}
                  />
                )}
                <h2 className="pokemon-name capitalize mb-2">{pokemon.name}</h2>
                <div className="pokemon-stats">
                  {/* Placeholder stats - replace with actual data */}
                  <div className="pokemon-stat">HP: 100</div>
                  <div className="pokemon-stat">Attack: 70</div>
                  <div className="pokemon-stat">Defense: 60</div>
                  <div className="pokemon-stat">Speed: 90</div>
                  <div className="pokemon-stat">Weight: 15kg</div>
                  <div className="pokemon-stat">Height: 1.2m</div>
                </div>
                <button
                  onClick={() => removeFromRoster(pokemon.id)}
                  className="remove-from-roster-btn"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRosterPage;