import React from 'react';
import { UserProvider } from './context/UserContext';
import { Header } from './components/layout/Header';
import { Container } from './components/layout/Container';
import { UserList } from './components/users/UserList';
import './App.css';

const App: React.FC = () => {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <Container>
          <UserList />
        </Container>
      </div>
    </UserProvider>
  );
};

export default App;