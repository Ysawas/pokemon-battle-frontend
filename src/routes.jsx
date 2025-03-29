import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeRouter from './routers/HomeRouter';
import PokemonDetailsRouter from './routers/PokemonDetailsRouter';
import MyRosterRouter from './routers/MyRosterRouter';
import BattleRouter from './routers/BattleRouter';
import LeaderboardRouter from './routers/LeaderboardRouter';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRouter />} />
        <Route path="/pokemon/:id" element={<PokemonDetailsRouter />} />
        <Route path="/roster" element={<MyRosterRouter />} />
        <Route path="/battle" element={<BattleRouter />} />
        <Route path="/leaderboard" element={<LeaderboardRouter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;