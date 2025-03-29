import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAuth = (isAuthenticated, redirectTo = '/login') => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return isAuthenticated;
};

export default useAuth;