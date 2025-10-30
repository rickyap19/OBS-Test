import React from 'react';
import { Users } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">User Management</h1>
            <p className="text-blue-100 text-sm">Manage your users efficiently</p>
          </div>
        </div>
      </div>
    </header>
  );
};