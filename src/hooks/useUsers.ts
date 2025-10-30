import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { UserContextType } from '../types/user.types';

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  
  return context;
};