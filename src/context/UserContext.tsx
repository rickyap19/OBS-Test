import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserContextType } from '../types/user.types';
import { fetchUsers } from '../services/userService';
import { generateId } from '../utils/helpers';

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    loadUsers();
  }, []);

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: generateId(users.map((u) => u.id)),
    };
    setUsers([newUser, ...users]);
  };

  const updateUser = (id: number, updatedUser: Partial<User>) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const value: UserContextType = {
    users,
    loading,
    addUser,
    updateUser,
    deleteUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};