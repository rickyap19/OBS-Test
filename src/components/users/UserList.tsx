import React, { useState } from 'react';
import { Plus, User as UserIcon } from 'lucide-react';
import { User } from '../../types/user.types';
import { useUsers } from '../../hooks/useUsers';
import { filterUsers } from '../../utils/helpers';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Card } from '../common/Card';
import { SearchBar } from './SearchBar';
import { UserCard } from './UserCard';
import { UserForm } from './UserForm';
import { UserDetailModal } from './UserDetailModal';

export const UserList: React.FC = () => {
  const { users, loading, addUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredUsers = filterUsers(users, searchTerm);

  const handleAddUser = (user: Omit<User, 'id'>) => {
    addUser(user);
    setShowAddModal(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Button
          variant="success"
          onClick={() => setShowAddModal(true)}
          icon={<Plus size={20} />}
        >
          Add User
        </Button>
      </div>

      {filteredUsers.length === 0 ? (
        <Card className="p-12 text-center">
          <UserIcon size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No users found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => setSelectedUser(user)}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="User Details"
      >
        {selectedUser && (
          <UserDetailModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </Modal>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
      >
        <UserForm
          onSubmit={handleAddUser}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </>
  );
};