import React from 'react';
import AppRoutes from './routes';
import { RosterProvider } from './context/RosterContext';
import Navbar from './components/common/Navbar';
import './index.css';

function App() {
  return (
    <RosterProvider>
      <Navbar />
      <AppRoutes />
    </RosterProvider>
  );
}

export default App;