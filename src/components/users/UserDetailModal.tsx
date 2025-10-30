import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
  Edit2,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { User } from '../../types/user.types';
import { useUsers } from '../../hooks/useUsers';
import { Button } from '../common/Button';
import { UserForm } from './UserForm';
import { getRandomImageLarge } from '../../services/userService';

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user,
  onClose,
}) => {
  const { updateUser, deleteUser } = useUsers();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const imageUrl = getRandomImageLarge(user.id);

  const handleUpdate = (updatedUser: User) => {
    updateUser(user.id, updatedUser);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteUser(user.id);
    onClose();
  };

  if (showDeleteConfirm) {
    return (
      <div className="text-center py-8">
        <AlertCircle size={64} className="mx-auto text-red-500 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete User?</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{user.name}</strong>? This
          action cannot be undone.
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            variant="danger"
            onClick={handleDelete}
            icon={<Trash2 size={18} />}
          >
            Yes, Delete
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <UserForm
        initialUser={user}
        onSubmit={handleUpdate as any}
        onCancel={() => setIsEditing(false)}
        isEditing
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center mb-6">
        <img
          src={imageUrl}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-100 mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-gray-600">{user.company.name}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="text-blue-600" size={20} />
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Phone className="text-blue-600" size={20} />
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="font-medium text-gray-900">{user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Globe className="text-blue-600" size={20} />
          <div>
            <p className="text-xs text-gray-500">Website</p>
            <p className="font-medium text-gray-900">{user.website}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <MapPin className="text-blue-600 mt-1" size={20} />
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="font-medium text-gray-900">
              {user.address.suite}, {user.address.street}
            </p>
            <p className="text-gray-700">
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <Building className="text-blue-600 mt-1" size={20} />
          <div>
            <p className="text-xs text-gray-500">Company</p>
            <p className="font-medium text-gray-900">{user.company.name}</p>
            <p className="text-gray-600 text-sm italic">
              "{user.company.catchPhrase}"
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
        <Button
          variant="primary"
          onClick={() => setIsEditing(true)}
          icon={<Edit2 size={18} />}
          fullWidth
        >
          Edit User
        </Button>
        <Button
          variant="danger"
          onClick={() => setShowDeleteConfirm(true)}
          icon={<Trash2 size={18} />}
          fullWidth
        >
          Delete
        </Button>
      </div>
    </div>
  );
};