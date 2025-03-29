import React, { useState, useEffect } from 'react';

const ScoreDisplay = ({ score }) => {
  const [displayedScore, setDisplayedScore] = useState(0);

  useEffect(() => {
    let currentScore = 0;
    const interval = setInterval(() => {
      if (currentScore < score) {
        currentScore += Math.ceil((score - currentScore) / 10);
        setDisplayedScore(currentScore);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [score]);

  return <span className="text-2xl font-bold">{displayedScore}</span>;
};

export default ScoreDisplay;