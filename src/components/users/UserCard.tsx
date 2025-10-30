import React from 'react';
import { Mail, Building } from 'lucide-react';
import { User } from '../../types/user.types';
import { Card } from '../common/Card';
import { getRandomImage } from '../../services/userService';

interface UserCardProps {
  user: User;
  onClick: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const imageUrl = getRandomImage(user.id);

  return (
    <Card className="overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200">
      <div className="p-6" onClick={onClick}>
        <div className="flex items-start gap-4">
          <img
            src={imageUrl}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600 truncate flex items-center gap-1 mt-1">
              <Mail size={14} />
              {user.email}
            </p>
            <p className="text-sm text-gray-600 truncate flex items-center gap-1 mt-1">
              <Building size={14} />
              {user.company.name}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};