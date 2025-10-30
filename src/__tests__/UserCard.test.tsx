import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserCard } from '../components/users/UserCard';
import { User } from '../types/user.types';

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  website: 'john.com',
  address: {
    street: 'Main St',
    suite: 'Apt 1',
    city: 'New York',
    zipcode: '10001',
  },
  company: {
    name: 'Acme Corp',
    catchPhrase: 'Innovation at its best',
  },
};

describe('UserCard Component', () => {
  test('renders user information correctly', () => {
    const mockOnClick = jest.fn();
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  test('calls onClick when card is clicked', async () => {
    const mockOnClick = jest.fn();
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    const card = screen.getByText('John Doe').closest('div');
    if (card) {
      await userEvent.click(card);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    }
  });

  test('displays user profile image', () => {
    const mockOnClick = jest.fn();
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    const image = screen.getByAltText('John Doe');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('picsum.photos'));
  });
});