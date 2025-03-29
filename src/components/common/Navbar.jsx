import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">Pokémon Battle</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/roster" className="hover:text-gray-300">My Roster</Link>
          <Link to="/battle" className="hover:text-gray-300">Battle</Link>
          <Link to="/leaderboard" className="hover:text-gray-300">Leaderboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;