import React, { useContext } from 'react';
import { RosterContext } from '../../../context/RosterContext';

const MyRosterPage = ({ roster, removeFromRoster }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Roster</h1>
      <ul>
        {roster.map((pokemon) => (
          <li key={pokemon.id} className="border p-4 rounded-md flex justify-between items-center">
            {pokemon.name}
            <button onClick={() => removeFromRoster(pokemon.id)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRosterPage;