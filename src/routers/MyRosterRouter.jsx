import React from 'react';
import MyRosterPage from '../components/pages/MyRosterPage/MyRosterPage';
import { useContext } from 'react';
import { RosterContext } from '../context/RosterContext';

const MyRosterRouter = () => {
  const { roster, removeFromRoster } = useContext(RosterContext);

  return <MyRosterPage roster={roster} removeFromRoster={removeFromRoster} />;
};

export default MyRosterRouter;