import React, { createContext, useState } from 'react';

export const RosterContext = createContext();

export const RosterProvider = ({ children }) => {
  const [roster, setRoster] = useState([]);

  const addToRoster = (pokemon) => {
    setRoster([...roster, pokemon]);
  };

  const removeFromRoster = (pokemonId) => {
    setRoster(roster.filter((pokemon) => pokemon.id !== pokemonId));
  };

  return (
    <RosterContext.Provider value={{ roster, addToRoster, removeFromRoster }}>
      {children}
    </RosterContext.Provider>
  );
};