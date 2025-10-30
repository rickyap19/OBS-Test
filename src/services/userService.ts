import { User } from '../types/user.types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getRandomImage = (userId: number): string => {
  return `https://picsum.photos/seed/${userId}/200/200`;
};

export const getRandomImageLarge = (userId: number): string => {
  return `https://picsum.photos/seed/${userId}/400/400`;
};