import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { UserProvider } from '../context/UserContext';
import { useUsers } from '../hooks/useUsers';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

describe('UserContext', () => {
  test('should fetch users on mount', async () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users.length).toBeGreaterThan(0);
  });

  test('should add a new user', async () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialCount = result.current.users.length;

    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      website: 'test.com',
      address: {
        street: 'Test St',
        suite: 'Apt 1',
        city: 'Test City',
        zipcode: '12345',
      },
      company: {
        name: 'Test Company',
        catchPhrase: 'Testing is fun',
      },
    };

    act(() => {
      result.current.addUser(newUser);
    });

    expect(result.current.users.length).toBe(initialCount + 1);
    expect(result.current.users[0].name).toBe('Test User');
  });

  test('should update a user', async () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const userId = result.current.users[0].id;

    act(() => {
      result.current.updateUser(userId, { name: 'Updated Name' });
    });

    const updatedUser = result.current.users.find((u) => u.id === userId);
    expect(updatedUser?.name).toBe('Updated Name');
  });

  test('should delete a user', async () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialCount = result.current.users.length;
    const userId = result.current.users[0].id;

    act(() => {
      result.current.deleteUser(userId);
    });

    expect(result.current.users.length).toBe(initialCount - 1);
    expect(result.current.users.find((u) => u.id === userId)).toBeUndefined();
  });
});