import React, { useState, useEffect, useContext, useRef } from 'react';
import { fetchPokemonDetails, fetchPokemonList } from '../../../controllers/pokemonController';
import { RosterContext } from '../../../context/RosterContext';
import ResultDisplay from '../../common/ResultDisplay';
import './BattlePage.css';
import { createScore } from '../../../controllers/leaderboardController';

const BattlePage = () => {
  const { roster } = useContext(RosterContext);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [battleResult, setBattleResult] = useState(null);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [battleReady, setBattleReady] = useState(false);
  const [showPlayerSelect, setShowPlayerSelect] = useState(true);
  const [showRegisterButton, setShowRegisterButton] = useState(false);
  const opponentContainerRef = useRef(null);
  const startButtonRef = useRef(null); // Ref for the button

  useEffect(() => {
    if (roster.length > 0 && showPlayerSelect) {
      // Player selects from roster
    } else if (roster.length > 0 && !showPlayerSelect) {
      selectOpponent(); // Automatically select opponent after player choice
    }
  }, [roster, showPlayerSelect]);

  const selectOpponent = async () => {
    // Fetch a random opponent
    const allPokemon = await fetchPokemonList();
    if (allPokemon && allPokemon.results) {
      const randomIndex = Math.floor(Math.random() * allPokemon.results.length);
      const randomOpponentName = allPokemon.results[randomIndex].name;
      const opponent = await fetchPokemonDetails(randomOpponentName);
      setOpponentPokemon(opponent);

      // Trigger the opponent animation
      if (opponentContainerRef.current) {
        opponentContainerRef.current.classList.add('entering');
      }

      // Play alert sound (you'll need to implement this)
      // playAlertSound();

      // Show "Start Battle" button after opponent animation
      setTimeout(() => {
        if (startButtonRef.current) {
          startButtonRef.current.classList.add('show');
        }
        setBattleReady(true);
      }, 1000); // Adjust the delay to match animation
    } else {
      setBattleLog(['Error: Could not retrieve opponent Pokémon data.']);
    }
  };

  const handleStartBattle = () => {
    if (playerChoice && opponentPokemon) {
      startBattle(playerPokemon, opponentPokemon);
      setBattleReady(false);
    }
  };

  const startBattle = (player, opponent) => {
    setBattleLog([`Battle Start: ${player.name} vs. ${opponent.name}`]);
    // Enhanced Battle Logic (Simplified)
    let playerHP = player.stats.find(stat => stat.stat.name === 'hp').base_stat;
    let opponentHP = opponent.stats.find(stat => stat.stat.name === 'hp').base_stat;

    const playerAttack = player.stats.find(stat => stat.stat.name === 'attack').base_stat;
    const opponentAttack = opponent.stats.find(stat => stat.stat.name === 'attack').base_stat;

    const playerDefense = player.stats.find(stat => stat.stat.name === 'defense').base_stat;
    const opponentDefense = opponent.stats.find(stat => stat.stat.name === 'defense').base_stat;

    let round = 1;
    while (playerHP > 0 && opponentHP > 0) {
      setBattleLog(prevLog => [...prevLog, `--- Round ${round} ---`]);

      const playerDamage = Math.max(0, playerAttack - opponentDefense);
      const opponentDamage = Math.max(0, opponentAttack - playerDefense);

      opponentHP -= playerDamage;
      playerHP -= opponentDamage;

      setBattleLog(prevLog => [...prevLog, `${player.name} deals ${playerDamage} damage! ${opponent.name} has ${Math.max(0, opponentHP)} HP left.`]);
      setBattleLog(prevLog => [...prevLog, `${opponent.name} deals ${opponentDamage} damage! ${player.name} has ${Math.max(0, playerHP)} HP left.`]);

      round++;
    }

    if (playerHP > 0) {
      setBattleLog(prevLog => [...prevLog, `${player.name} wins the battle!`]);
      setBattleResult('Player Wins!');
    } else if (opponentHP > 0) {
      setBattleLog(prevLog => [...prevLog, `${opponent.name} wins the battle!`]);
      setBattleResult('Opponent Wins!');
    } else {
      setBattleLog(prevLog => [...prevLog, `It's a tie!`]);
      setBattleResult('Tie!');
    }

    setShowRegisterButton(true);
  };

  const handlePlayerSelect = async (selectedPokemon) => {
    setPlayerChoice(selectedPokemon);
    const player = await fetchPokemonDetails(selectedPokemon.name);
    setPlayerPokemon(player);
    setShowPlayerSelect(false);
  };

  const handleRegisterResult = async () => {
    if (playerName && battleResult) {
      try {
        const score = battleResult === 'Player Wins!' ? 1 : 0;
        const registeredScore = await createScore(playerName, score);
        if (registeredScore) {
          setBattleLog(prevLog => [...prevLog, `Result registered successfully!`]);
          // Optionally: Redirect to leaderboard or display a success message
        } else {
          setBattleLog(prevLog => [...prevLog, `Error registering result. Please try again.`]);
        }
      } catch (error) {
        console.error('Error registering score:', error);
        setBattleLog(prevLog => [...prevLog, `Error registering result. Please try again.`]);
      }
    } else {
      setBattleLog(prevLog => [...prevLog, `Please enter your name before registering. `]);
    }
  };

  if (!playerPokemon || !opponentPokemon) {
    return (
      <div className="container mx-auto p-4">
        {showPlayerSelect ? (
          <div>
            <h2>Choose Your Pokémon:</h2>
            <div className="player-select-grid">
              {roster.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="player-select-card"
                  onClick={() => handlePlayerSelect(pokemon)}
                >
                  <img src={pokemon.image} alt={pokemon.name} />
                  <p>{pokemon.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokémon Battle Arena</h1>

      {/* Player Name Input */}
      <div className="mb-4">
        <label htmlFor="playerName" className="block text-gray-700 text-sm font-bold mb-2">
          Enter Your Name:
        </label>
        <input
          type="text"
          id="playerName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>

      <div className="flex justify-around mb-8">
        <div>
          <h2 className="text-xl font-semibold">{playerPokemon.name} (Player)</h2>
          <img src={playerPokemon.sprites.front_default} alt={playerPokemon.name} />
          {/* Placeholder: Display player Pokémon stats */}
        </div>

        {opponentPokemon && (
          <div className="opponent-container" ref={opponentContainerRef}>
            <h2 className="text-xl font-semibold opponent-name">{opponentPokemon.name} (Opponent)</h2>
            <img src={opponentPokemon.sprites.front_default} alt={opponentPokemon.name} className="opponent-image" />
            {/* Placeholder: Display opponent Pokémon stats */}
          </div>
        )}
      </div>

      {battleReady && (
        <button className="start-battle-btn" onClick={handleStartBattle} ref={startButtonRef}>
          Start Battle!
        </button>
      )}

      <div className="battle-log">
        <h3 className="text-2xl font-bold mb-2">Battle Log</h3>
        {battleLog.map((log, index) => (
          <p key={index}>
            <ResultDisplay result={log} />
          </p>
        ))}
        {battleResult && <p className="text-2xl font-bold mt-4">{battleResult}</p>}
      </div>

      {showRegisterButton && (
        <button className="register-result-btn" onClick={handleRegisterResult}>
          Register Result
        </button>
      )}

      {/* Placeholder: Implement battle actions (attack buttons, etc.) */}
      {/* Placeholder: Display round results, damage, etc. */}
    </div>
  );
};

export default BattlePage;