import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProvider } from '../context/UserContext';
import { UserList } from '../components/users/UserList';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<UserProvider>{component}</UserProvider>);
};

describe('UserList Component', () => {
  test('renders loading spinner initially', () => {
    renderWithProvider(<UserList />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  test('renders user list after loading', async () => {
    renderWithProvider(<UserList />);

    await waitFor(() => {
      expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText(/search users/i)).toBeInTheDocument();
    expect(screen.getByText(/add user/i)).toBeInTheDocument();
  });

  test('filters users by search term', async () => {
    renderWithProvider(<UserList />);

    await waitFor(() => {
      expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search users/i);
    await userEvent.type(searchInput, 'Leanne');

    await waitFor(() => {
      const userCards = screen.queryAllByText(/Leanne/i);
      expect(userCards.length).toBeGreaterThan(0);
    });
  });

  test('shows "No users found" when search has no results', async () => {
    renderWithProvider(<UserList />);

    await waitFor(() => {
      expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search users/i);
    await userEvent.type(searchInput, 'NonExistentUser12345');

    await waitFor(() => {
      expect(screen.getByText(/no users found/i)).toBeInTheDocument();
    });
  });

  test('opens add user modal when clicking Add User button', async () => {
    renderWithProvider(<UserList />);

    await waitFor(() => {
      expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument();
    });

    const addButton = screen.getByText(/add user/i);
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/add new user/i)).toBeInTheDocument();
    });
  });
});