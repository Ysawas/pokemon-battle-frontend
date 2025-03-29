import React, { useState, useEffect } from 'react';

const ResultDisplay = ({ result }) => {
  const [displayedResult, setDisplayedResult] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < result.length) {
        setDisplayedResult(result.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [result]);

  return <span className="text-xl">{displayedResult}</span>;
};

export default ResultDisplay;