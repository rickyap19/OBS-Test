import React, { useState } from 'react';
import { User, Mail, Phone, Globe, Building } from 'lucide-react';
import { User as UserType } from '../../types/user.types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Check } from 'lucide-react';

interface UserFormProps {
  initialUser?: UserType;
  onSubmit: (user: Omit<UserType, 'id'> | UserType) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialUser,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const [formData, setFormData] = useState({
    name: initialUser?.name || '',
    email: initialUser?.email || '',
    phone: initialUser?.phone || '',
    website: initialUser?.website || '',
    street: initialUser?.address.street || '',
    suite: initialUser?.address.suite || '',
    city: initialUser?.address.city || '',
    zipcode: initialUser?.address.zipcode || '',
    companyName: initialUser?.company.name || '',
    catchPhrase: initialUser?.company.catchPhrase || '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.website) {
      alert('Please fill in all required fields');
      return;
    }

    const userData = {
      ...(isEditing && initialUser ? { id: initialUser.id } : {}),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode,
      },
      company: {
        name: formData.companyName,
        catchPhrase: formData.catchPhrase,
      },
    };
    onSubmit(userData as any);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(val) => setFormData({ ...formData, name: val })}
          icon={<User size={18} />}
          required
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(val) => setFormData({ ...formData, email: val })}
          icon={<Mail size={18} />}
          required
        />
        <Input
          label="Phone"
          value={formData.phone}
          onChange={(val) => setFormData({ ...formData, phone: val })}
          icon={<Phone size={18} />}
          required
        />
        <Input
          label="Website"
          value={formData.website}
          onChange={(val) => setFormData({ ...formData, website: val })}
          icon={<Globe size={18} />}
          required
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Street"
            value={formData.street}
            onChange={(val) => setFormData({ ...formData, street: val })}
            required
          />
          <Input
            label="Suite"
            value={formData.suite}
            onChange={(val) => setFormData({ ...formData, suite: val })}
            required
          />
          <Input
            label="City"
            value={formData.city}
            onChange={(val) => setFormData({ ...formData, city: val })}
            required
          />
          <Input
            label="Zipcode"
            value={formData.zipcode}
            onChange={(val) => setFormData({ ...formData, zipcode: val })}
            required
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Company</h3>
        <div className="space-y-4">
          <Input
            label="Company Name"
            value={formData.companyName}
            onChange={(val) => setFormData({ ...formData, companyName: val })}
            icon={<Building size={18} />}
            required
          />
          <Input
            label="Catch Phrase"
            value={formData.catchPhrase}
            onChange={(val) => setFormData({ ...formData, catchPhrase: val })}
            required
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          variant="success"
          onClick={handleSubmit}
          icon={<Check size={18} />}
          fullWidth
        >
          {isEditing ? 'Update User' : 'Add User'}
        </Button>
        <Button variant="secondary" onClick={onCancel} fullWidth>
          Cancel
        </Button>
      </div>
    </div>
  );
};