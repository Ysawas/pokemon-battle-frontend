import React, { useState, useEffect } from 'react';
import { loadLeaderboard, addScore } from '../../../controllers/leaderboardController'; // Assuming addScore is available
import './LeaderboardPage.css'; // Import the new CSS

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [scoreToSubmit, setScoreToSubmit] = useState(0); // You'll need to set this after the battle

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await loadLeaderboard();
      setLeaderboard(data);
    };

    fetchLeaderboard();
  }, []);

  const handleSaveScore = async () => {
    if (playerName && scoreToSubmit > 0) {
      const result = await addScore(playerName, scoreToSubmit); // Assuming addScore works
      if (result) {
        // Optionally: Show success message or refresh leaderboard
        fetchLeaderboard(); // Refresh the leaderboard
      } else {
        // Optionally: Show error message
      }
    } else {
      // Optionally: Show validation message
    }
  };

  return (
    <div className="leaderboard-page-container">
      <h1 className="leaderboard-main-title">Pokémon Battle Leaderboard!</h1>

      <div className="score-submission-box">
        <h2>Save Your Score</h2>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <p>Your battle result was: {scoreToSubmit} points</p> {/* Display the score */}
        <button onClick={handleSaveScore}>Save</button>
      </div>

      <div className="leaderboard-table-container">
        <h2>Top Trainers</h2>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Trainer</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id}>
                <td>{index + 1}</td>
                <td>{entry.username}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;