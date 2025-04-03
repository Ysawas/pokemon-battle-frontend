import React, { useState, useEffect } from 'react';
import { loadLeaderboard } from '../../../controllers/leaderboardController';
import ScoreDisplay from '../../../components/common/ScoreDisplay';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      console.log("LeaderboardPage: Fetching leaderboard data");
      const data = await loadLeaderboard();
      console.log("LeaderboardPage: Leaderboard data:", data);
      setLeaderboard(data);
    };

    fetchLeaderboard();
  }, []); // Fetch only on initial load

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <ul>
        {leaderboard && leaderboard.map((entry) => ( // Check if leaderboard exists
          <li key={entry._id} className="border p-4 rounded-md flex justify-between items-center">
            <span>{entry.username}</span>
            <ScoreDisplay score={entry.score} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardPage;