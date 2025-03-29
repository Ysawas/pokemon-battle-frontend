import { useState } from 'react';

const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setError(err);
    console.error('An error occurred:', err);
  };

  const clearError = () => {
    setError(null);
  };

  return { error, handleError, clearError };
};

export default useErrorHandler;